// ==UserScript==
// @name         PlayCanvas Editor Uber Tools
// @namespace    http://stevenyau.co.uk/
// @version      0.1
// @description  yaustar's PlayCanvas Editor Uber Tools
// @author       @yaustar
// @match        https://playcanvas.com/editor/scene/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const logCssStyle = 'color: white; background-color: #8e44ad';
    const onEngineLoaded = function () {
        console.log("%c yaustar's tools loaded :) ", logCssStyle);

        const app = pc.Application.getApplication();
        let menu = null;
        const root = editor.call('layout.root');

        const loadedGlbs = {};

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

        const checkForAndloadDracoWasm = (callback) => {
            const wasmAsset = getDracoWasmAsset();

            if (wasmAsset) {
                const baseUrl = 'https://playcanvas.com';
                const wasmUrl = baseUrl + wasmAsset.get('file').url;
                const glueUrl = baseUrl + editor.assets.get(wasmAsset.get('data').glueScriptId).get('file').url;
                const fallbackUrl = baseUrl + editor.assets.get(wasmAsset.get('data').fallbackScriptId).get('file').url;

                if (wasmSupported()) {
                    loadWasmModuleAsync(
                        wasmAsset.get('data').moduleName,
                        glueUrl,
                        wasmUrl,
                        callback
                    );
                } else {
                    loadWasmModuleAsync(wasmAsset.get('data').moduleName, fallbackUrl, "", callback);
                }
            } else {
                callback();
            }
        };

        let dracoWasmAsset = undefined;

        const getDracoWasmAsset = () => {
            // Cache the result as we don't want to do this more than once
            if (dracoWasmAsset !== undefined) {
                return dracoWasmAsset;
            }

            console.log('Looking for Draco WASM in project');

            const dracoModules = editor.assets.filter((asset) => { return asset.get('type') === 'wasm' && asset.get('data').moduleName === 'DracoDecoderModule' });
            if (dracoModules.length > 0) {
                dracoWasmAsset = dracoModules[0];
            }

            return dracoWasmAsset;
        }

        const loadGlbContainerFromAsset = (glbBinAsset, options, assetName, callback) => {
            var onAssetReady = function (asset) {
                var blob = new Blob([asset.resource]);
                var data = URL.createObjectURL(blob);
                return loadGlbContainerFromUrl(data, options, assetName, function (error, asset) {
                    callback(error, asset);
                    URL.revokeObjectURL(data);
                });
            }.bind(this);

            glbBinAsset.ready(onAssetReady);
            app.assets.load(glbBinAsset);
        };

        const loadGlbContainerFromUrl = (url, options, assetName, callback) => {
            var filename = assetName + '.glb';
            var file = {
                url: url,
                filename: filename
            };

            var asset = new pc.Asset(filename, 'container', file, null, options);
            asset.once('load', function (containerAsset) {
                if (callback) {
                    callback(null, containerAsset);
                }
            });

            app.assets.add(asset);
            app.assets.load(asset);

            return asset;
        };

        const createGlbEntity = (editorEntity) => {
            const scripts = editorEntity.get('components.script.scripts');
            if (scripts && (scripts.loadGlbAsset || scripts.loadGlbUrl)) {
                const guid = editorEntity.get('resource_id');
                const viewEntity = app.root.findByGuid(guid);

                // Check if a GLB entity has already been created
                const alreadyLoaded = loadedGlbs[guid] != null;

                if (alreadyLoaded) {
                    console.log('Already loaded a GLB');
                } else {
                    if (scripts.loadGlbAsset) {
                        const assetId = scripts.loadGlbAsset.attributes.glbAsset;
                        if (assetId) {
                            // Load the asset from the registry
                            const asset = app.assets.get(assetId);
                            loadGlbContainerFromAsset(asset, null, asset.name, function (err, asset) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                const renderRootViewEntity = asset.resource.instantiateRenderEntity();
                                renderRootViewEntity.reparent(viewEntity);

                                loadedGlbs[guid] = renderRootViewEntity.getGuid();

                                console.log('Loaded GLB: ' + asset.name);
                            });
                        }
                    }

                    if (scripts.loadGlbUrl) {
                        const url = scripts.loadGlbUrl.attributes.glbUrl;
                        if (url) {
                            const filename = url.substring(url.lastIndexOf('/') + 1);
                            loadGlbContainerFromUrl(url, null, filename, function (err, asset) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                const renderRootViewEntity = asset.resource.instantiateRenderEntity();
                                renderRootViewEntity.reparent(viewEntity);

                                loadedGlbs[guid] = renderRootViewEntity.getGuid();

                                console.log('Loaded GLB: ' + asset.name);
                            });
                        }
                    }
                }
            }
        }

        const createGlbsAll = () => {
            if (confirm('This can take a long time as we have to check every entity. Are you sure?')) {
                const entities = editor.entities.list();
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    createGlbEntity(entity);
                }
            }
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

                    if (scripts && (scripts.loadGlbAsset || scripts.loadGlbUrl)) {
                        menuItems.push({
                            text: '🏠 Load GLB on Entity',
                            onSelect: () => {
                                checkForAndloadDracoWasm(() => {
                                    createGlbEntity(selectedEntity);
                                });
                            }
                        });
                    }
                }

                menuItems.push({
                    text: '🏘 Load all GBLs ❗️',
                    onSelect: () => {
                        checkForAndloadDracoWasm(() => {
                            createGlbsAll();
                        });
                    }
                });

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
        editor.once('assets:load', () => {
            const editorScriptAssets = editor.assets.listByTag('editor');
            for (const asset of editorScriptAssets) {
                if (asset.get('type') === 'script') {
                    const url = asset.get('file').url;
                    const name = asset.get('name');
                    loadScriptAsync(url, () => {
                        console.log('Loaded: ' + name);
                    });
                };
            }
        });

        window.yauEditorTools = {
            loadScriptAsync: loadScriptAsync
        }
    };

    // Wait for the PlayCanvas application to be loaded
    const intervalId = setInterval(function () {
        if (pc.Application.getApplication()) {
            onEngineLoaded();
            clearInterval(intervalId);
        }
    }, 500);
})();
