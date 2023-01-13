// ==UserScript==
// @name         PlayCanvas GLB Utils Editor Tool
// @namespace    http://stevenyau.co.uk/
// @version      0.1
// @description  yaustar's GLB Utils Editor Tool
// @author       @yaustar
// @match        https://playcanvas.com/editor/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==


(function () {
    'use strict';
    const logCssStyle = 'color: white; background-color: #2ecc71';
    const onEngineLoaded = function () {
        console.log("%c glb utils loaded ", logCssStyle);

        const app = pc.Application.getApplication();
        const loadedGlbs = {};

        const checkForAndloadDracoWasm = (callback) => {
            const wasmAsset = getDracoWasmAsset();

            if (wasmAsset) {
                const baseUrl = 'https://playcanvas.com';
                const wasmUrl = baseUrl + wasmAsset.get('file').url;
                const glueUrl = baseUrl + editor.assets.get(wasmAsset.get('data').glueScriptId).get('file').url;
                const fallbackUrl = baseUrl + editor.assets.get(wasmAsset.get('data').fallbackScriptId).get('file').url;

                if (yauEditorTools.wasmSupported()) {
                    yauEditorTools.loadWasmModuleAsync(
                        wasmAsset.get('data').moduleName,
                        glueUrl,
                        wasmUrl,
                        callback
                    );
                } else {
                    yauEditorTools.loadWasmModuleAsync(wasmAsset.get('data').moduleName, fallbackUrl, "", callback);
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

        app.on('editor:ubertools:beforeaddmenuitems', (menuItems) => {
            const items = editor.selection.items;
            if (items.length === 1 && items[0] instanceof api.Entity) {
                const selectedEntity = items[0];
                const scripts = selectedEntity.get('components.script.scripts');

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
