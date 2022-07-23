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

        const glbEntityName = '8556102755';

        const loadGlbContainerFromAsset = function (glbBinAsset, options, assetName, callback) {
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

        const loadGlbContainerFromUrl = function (url, options, assetName, callback) {
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

        const createGlbEntity = function (editorEntity) {
            const scripts = editorEntity.get('components.script.scripts');
            if (scripts && (scripts.loadGlbAsset || scripts.loadGlbUrl)) {
                const guid = editorEntity.get('resource_id');
                const viewEntity = app.root.findByGuid(guid);

                // Check if a GLB entity has already been created 
                let alreadyLoaded = false;
                const viewEntityChildren = viewEntity.children;
                for (let i = 0; i < viewEntityChildren.length; ++i) {
                    if (viewEntityChildren[i].name === glbEntityName) {
                        alreadyLoaded = true;
                    }
                }

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
                                renderRootViewEntity.name = glbEntityName;
                                renderRootViewEntity.reparent(viewEntity);

                                console.log('Loaded GLB: ' + asset.name);
                            });
                        }
                    }

                    if (scripts.loadGlbUrl) {
                        const url = scripts.loadGlbUrl.attributes.glbUrl;
                        if (url) {
                            const filename = url.substring(url.lastIndexOf('/')+1);
                            loadGlbContainerFromUrl(url, null, filename, function (err, asset) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }

                                const renderRootViewEntity = asset.resource.instantiateRenderEntity();
                                renderRootViewEntity.name = glbEntityName;
                                renderRootViewEntity.reparent(viewEntity);

                                console.log('Loaded GLB: ' + asset.name);
                            });
                        }
                    }
                }
            }
        }

        let mousedownX = 0;
        let mousedownY = 0;

        app.mouse.on('mousedown', (e) => {
            mousedownX = e.x;
            mousedownY = e.y;
        });

        app.mouse.on('mouseup', (e) => {
            // Did we move the mouse while holding mouse button
            let mouseMoved = false;
            if (Math.abs(mousedownX - e.x) > 5 || Math.abs(mousedownY - e.y) > 5) {
                mouseMoved = true;
            }

            if (e.button === pc.MOUSEBUTTON_RIGHT) {
                if (menu) {
                    root.remove(menu);
                    menu = null;
                }

                if (mouseMoved) {
                    return;
                }

                const items = editor.selection.items;
                if (items.length === 1 && items[0] instanceof api.Entity) {
                    const selectedEntity = items[0];
                    // Build the context menu
                    const menuItems = [];

                    let parent = items[0].parent;
                    let menuIndex = 1;
                    const parentEntityItems = [];
                    while (parent) {
                        const entityTarget = parent;
                        const entityName = entityTarget.get('name');
                        const entryTitle = menuIndex.toString() + ': ' + entityName;
                        parentEntityItems.push({
                            text: entryTitle,
                            onSelect: function () {
                                editor.selection.set([entityTarget]);
                            }
                        });

                        parent = parent.parent;
                        menuIndex += 1;
                    }

                    menuItems.push({
                        text: 'Select Parent',
                        items: parentEntityItems
                    });

                    menuItems.push({
                        text: 'Load GLB',
                        onSelect: function() {
                            createGlbEntity(selectedEntity)
                        }
                    });

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

                    e.event.preventDefault();
                    e.event.stopPropagation();
                }
            }
        });
    };

    // Wait for the PlayCanvas application to be loaded
    const intervalId = setInterval(function () {
        if (pc.Application.getApplication()) {
            onEngineLoaded();
            clearInterval(intervalId);
        }
    }, 500);
})();