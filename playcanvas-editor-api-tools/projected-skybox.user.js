// ==UserScript==
// @name         PlayCanvas Projected Skybox Editor Tool
// @namespace    http://stevenyau.co.uk/
// @version      0.1
// @description  yaustar's Projected Skybox Editor Tool
// @author       @yaustar
// @match        https://playcanvas.com/editor/scene/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==


(function () {
    'use strict';
    const logCssStyle = 'color: white; background-color: #2ecc71';
    const onEngineLoaded = function () {
        console.log("%c projected skybox loaded ", logCssStyle);

        const app = pc.Application.getApplication();

        const scriptLoadedOnEntity = {};

        app.on('editor:ubertools:beforeaddmenuitems', (menuItems) => {
            const items = editor.selection.items;
            if (items.length === 1 && items[0] instanceof api.Entity) {
                const selectedEntity = items[0];
                const scripts = selectedEntity.get('components.script.scripts');
                const guid = selectedEntity.get('resource_id');

                const applyChunks = () => {
                    const viewEntity = app.root.findByGuid(guid);
                    if (!viewEntity.script) {
                        viewEntity.addComponent('script');
                    }

                    const callback = () => {
                        console.log('Applying projected skybox chunks on ' + selectedEntity.get('name'));
                        viewEntity.script.create('projectSkyboxChunks', {
                            attributes: scripts.projectSkyboxChunks.attributes
                        });

                        viewEntity.script.projectSkyboxChunks.applyChunks();
                        app.renderNextFrame = true;
                        scriptLoadedOnEntity[guid] = true;
                    }

                    // Don't like referencing by name but there doesn't seem to be a way
                    // to get the script asset id from the entity
                    const scriptAsset = app.assets.find('projected-skybox-chunks.js');
                    scriptAsset.ready(callback);
                    app.assets.load(scriptAsset);
                }

                if (scripts && scripts.projectSkyboxChunks && !scriptLoadedOnEntity[guid]) {
                    menuItems.push({
                        text: '🌆 Apply Projected Skybox Chunks',
                        onSelect: () => {
                            applyChunks();
                        }
                    });
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
