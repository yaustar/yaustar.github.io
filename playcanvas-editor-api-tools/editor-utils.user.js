// ==UserScript==
// @name         PlayCanvas Editor tools
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  yaustar's PlayCanvas Editor Tools
// @author       @yaustar
// @match        https://playcanvas.com/editor/scene/*
// @icon         https://www.google.com/s2/favicons?domain=playcanvas.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';
    const logCssStyle = 'color: white; background-color: #8e44ad';
    const onEngineLoaded = function() {
        console.log("%c yaustar's tools loaded :) ", logCssStyle);

        const app = pc.Application.getApplication();
        let menu = null;
        const root = editor.call('layout.root');

        app.mouse.on('mousedown', function(e) {
            if (e.button === pc.MOUSEBUTTON_RIGHT) {
                if (menu) {
                    root.remove(menu);
                    menu = null;
                }

                const items = editor.selection.items;
                if (items.length === 1 && items[0] instanceof api.Entity) {
                    const selectedEntity = items[0];
                    // Build the context menu
                    const menuItems = [];

                    let parent = items[0].parent;
                    let menuIndex = 1;
                    while (parent) {
                        const entityTarget = parent;
                        const entityName = entityTarget.get('name');
                        const entryTitle = menuIndex.toString() + ': ' + entityName;
                        menuItems.push({
                            text: entryTitle,
                            onSelect: function() {
                                editor.selection.set([entityTarget]);
                            }
                        });

                        parent = parent.parent;
                        menuIndex += 1;
                    }

                    const menuArgs = {
                        items: menuItems,
                    };

                    menu = new pcui.Menu(menuArgs);
                    root.append(menu);

                    menu.hidden = false;
                    menu.position(e.event.clientX + 1, e.event.clientY);

                    e.event.preventDefault();
                    e.event.stopPropagation();
                }
            }
        });
    };

    // Wait for the PlayCanvas application to be loaded

    const intervalId = setInterval(function() {
        if (pc.Application.getApplication()) {
            onEngineLoaded();
            clearInterval(intervalId);
        }
    }, 500);
})();