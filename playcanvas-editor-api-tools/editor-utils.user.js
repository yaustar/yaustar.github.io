// ==UserScript==
// @name         PlayCanvas Editor Uber Tools
// @namespace    http://stevenyau.co.uk/
// @version      0.2
// @description  yaustar's PlayCanvas Editor Uber Tools
// @author       @yaustar
// @match        https://playcanvas.com/editor/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const logCssStyle = 'color: white; background-color: #8e44ad';
    let assetsLoaded = false;

    const onEngineLoaded = function () {
        console.log("%c yaustar's tools loaded v0.2 :) ", logCssStyle);

        const app = pc.Application.getApplication();
        let menu = null;
        const root = editor.call('layout.root');

        // check for wasm module support
        const wasmSupported = () => {
            try {
                if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
                    const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
                    if (module instanceof WebAssembly.Module)
                        return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
                }
            } catch (e) { }
            return false;
        };

        // load a script
        const loadScriptAsync = (url, doneCallback) => {
            var tag = document.createElement('script');
            tag.onload = function () {
                doneCallback();
            };
            tag.onerror = function () {
                throw new Error('failed to load ' + url);
            };
            tag.async = true;
            tag.src = url;
            tag.crossOrigin = 'anonymous';
            document.head.appendChild(tag);
        };

        // load and initialize a wasm module
        const loadWasmModuleAsync = (moduleName, jsUrl, binaryUrl, doneCallback) => {
            loadScriptAsync(jsUrl, function () {
                var lib = window[moduleName];
                window[moduleName + 'Lib'] = lib;
                lib({
                    locateFile: function () {
                        return binaryUrl;
                    }
                }).then(function (instance) {
                    window[moduleName] = instance;
                    doneCallback();
                });
            });
        };

        const getToolSettings = () => {
            const toolSettings = JSON.parse(localStorage.getItem('yauEditorTools')) || {
                approvedProjects : {}
            };

            return toolSettings;
        };

        const setToolSetttings = (settings) => {
            localStorage.setItem('yauEditorTools', JSON.stringify(settings));
        };

        let mousedownX = 0;
        let mousedownY = 0;
        let mousedownTimeStamp = 0;

        app.mouse.on('mousedown', (e) => {
            const oldX = mousedownX;
            const oldY = mousedownY;
            const oldTimeStamp = mousedownTimeStamp;

            mousedownX = e.x;
            mousedownY = e.y;
            mousedownTimeStamp = Date.now();

            // Check for double click option on right mouse so we can
            // walk up the parents as quick shortcut
            if (e.button === pc.MOUSEBUTTON_RIGHT) {
                if (Math.abs(oldX - e.x) < 5 || Math.abs(oldY - e.y) < 5) {
                    if (Date.now() - oldTimeStamp < 250) {
                        const items = editor.selection.items;
                        if (items.length === 1 && items[0] instanceof api.Entity) {
                            const parent = items[0].parent;
                            if (parent) {
                                editor.selection.set([parent]);

                                // Don't have the context menu show up
                                mousedownX = Number.MAX_VALUE;
                                mousedownY = Number.MAX_VALUE;
                            }
                        }
                    }
                }
            }
        });

        app.mouse.on('mouseup', (e) => {
            // Did we move the mouse while holding mouse button
            if (Math.abs(mousedownX - e.x) > 5 || Math.abs(mousedownY - e.y) > 5) {
                return;
            }

            if (e.button === pc.MOUSEBUTTON_RIGHT) {
                const items = editor.selection.items;
                const menuItems = [];

                if (menu) {
                    root.remove(menu);
                    menu = null;
                }

                if (items.length === 1 && items[0] instanceof api.Entity) {
                    const selectedEntity = items[0];
                    const scripts = selectedEntity.get('components.script.scripts');

                    let parent = items[0].parent;
                    let menuIndex = 1;
                    const parentEntityItems = [];
                    while (parent) {
                        const entityTarget = parent;
                        const entityName = entityTarget.get('name');
                        const entryTitle = menuIndex.toString() + ': ' + entityName;
                        parentEntityItems.push({
                            text: entryTitle,
                            onSelect: () => {
                                editor.selection.set([entityTarget]);
                            }
                        });

                        parent = parent.parent;
                        menuIndex += 1;
                    }

                    if (parentEntityItems.length > 0) {
                        menuItems.push({
                            text: '👨‍👩‍👧 Select Parent',
                            items: parentEntityItems
                        });
                    }
                }

                app.fire('editor:ubertools:beforeaddmenuitems', menuItems);

                if (menuItems.length > 0) {
                    const menuArgs = {
                        items: menuItems,
                    };

                    menu = new pcui.Menu(menuArgs);
                    root.append(menu);

                    // Do this on the next frame to work
                    setTimeout(function () {
                        menu.hidden = false;
                        menu.position(e.event.clientX + 1, e.event.clientY);
                    });
                }

                e.event.preventDefault();
                e.event.stopPropagation();
            }

        });

        // Load any scripts in the Assets tagged as 'editor' and apply them to the scene when
        // all the assets are loaded
        const onAssetsLoaded = () => {
            const editorScriptAssets = editor.assets.listByTag('editor');
            if (editorScriptAssets.length > 0) {
                const loadEditorScripts = function () {
                    for (const asset of editorScriptAssets) {
                        if (asset.get('type') === 'script') {
                            const url = asset.get('file').url;
                            const name = asset.get('name');
                            loadScriptAsync(url, () => {
                                console.log('Loaded: ' + name);
                            });
                        };
                    }
                }

                // Check local storage if we already have permissions for this project
                const projectId = config.project.id;
                const toolSettings = getToolSettings();
                let askForPermission = true;
                const approvedProjects = toolSettings.approvedProjects;
                // If we have set a value for this project then we shouldn't need to ask for
                // permission
                if (approvedProjects[projectId] === true) {
                    askForPermission = false;
                    loadEditorScripts();
                } else if (approvedProjects[projectId] === false) {
                    askForPermission = false;
                }

                if (askForPermission) {
                    // Create a dialog box to ask for permissions to load the Editor scripts
                    const text = 'Do you want to load the Editor Plugin scripts in this project?';

                    const dialogBox = new pcui.Container({
                        flexDirection: 'column',
                        width: 300
                    });
                    dialogBox.style.position = 'absolute';
                    dialogBox.style.bottom = '10px';
                    dialogBox.style.right = '10px';
                    dialogBox.style.backgroundColor = '#364346';

                    // label
                    const label = new pcui.Label({
                        text: text,
                        width: 280
                    });

                    label.style.whiteSpace = 'normal';
                    label.style.textAlign = 'left';

                    const buttonContainer = new pcui.Container();
                    buttonContainer.style.textAlign = 'right';

                    const yesButton = new pcui.Button({
                        text: 'Yes',
                        width: 80
                    });

                    const noButton = new pcui.Button({
                        text: 'NO',
                        width: 80
                    });

                    noButton.style.backgroundColor = '#db5800';

                    buttonContainer.append(yesButton);
                    buttonContainer.append(noButton);

                    const tickBoxContainer = new pcui.Container();
                    tickBoxContainer.style.textAlign = 'right';
                    const tickBox = new pcui.BooleanInput({
                        value: false
                    });

                    const tickBoxLabel = new pcui.Label({
                        text: 'Don\'t ask me again'
                    });
                    tickBoxLabel.style.verticalAlign = 'top';

                    tickBoxContainer.append(tickBox);
                    tickBoxContainer.append(tickBoxLabel);

                    dialogBox.append(label);
                    dialogBox.append(buttonContainer);
                    dialogBox.append(tickBoxContainer);

                    editor.call('layout.viewport').append(dialogBox);

                    const onButtonClick = (loadScripts) => {
                        if (loadScripts) {
                            loadEditorScripts();
                        }

                        editor.call('layout.viewport').remove(dialogBox);

                        if (tickBox.value) {
                            const projectId = config.project.id;
                            const toolSettings = getToolSettings();
                            toolSettings.approvedProjects[projectId] = loadScripts;
                            setToolSetttings(toolSettings);
                        }
                    }

                    yesButton.on('click', () => { onButtonClick(true); });
                    noButton.on('click', () => { onButtonClick(false); });
                }
            }
        };

        if (assetsLoaded) {
            onAssetsLoaded();
        } else {
            editor.once('assets:load', () => { onAssetsLoaded(); });
        }

        window.yauEditorTools = {
            loadScriptAsync: loadScriptAsync,
            wasmSupported: wasmSupported,
            loadWasmModuleAsync: loadWasmModuleAsync
        }
    };

    // Wait for the PlayCanvas application to be loaded
    const intervalId = setInterval(function () {
        if (pc.Application.getApplication()) {
            onEngineLoaded();
            clearInterval(intervalId);
        }
    }, 500);

    editor.once('assets:load', () => { assetsLoaded = true; });
})();
