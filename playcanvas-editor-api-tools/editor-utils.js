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
                const menuData = {};

                let parent = items[0].parent;
                let menuIndex = 1;
                while (parent) {
                    const entityTarget = parent;
                    const entityName = entityTarget.get('name');
                    const entryTitle = menuIndex.toString() + ': ' + entityName;
                    menuData[entryTitle] = {
                        title: entryTitle,
                        className: 'menu-item-new-entity',
                        select: function() {
                            editor.selection.set([entityTarget]);
                        }
                    };

                    parent = parent.parent;
                    menuIndex += 1;
                }

                menu = ui.Menu.fromData(menuData);
                root.append(menu);

                // Have to do it next frame to open
                setTimeout(function() {
                    menu.open = true;
                    menu.position(e.event.clientX + 1, e.event.clientY);
                });

                e.event.preventDefault();
                e.event.stopPropagation();
            }
        }
    });
})();