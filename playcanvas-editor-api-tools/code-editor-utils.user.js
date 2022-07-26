// ==UserScript==
// @name        PlayCanvas Code Editor Patch
// @namespace   yaustar
// @match       https://playcanvas.com/editor/code/*
// @grant       none
// @version     0.1
// @author      @yaustar
// @description yaustar's PlayCanvas Code Editor Patch
// ==/UserScript==


(function () {
    const minimapEnabled = false;
    const addCustomKeymap = function(m) {
        // From https://rikki.dev/monaco-command-palette/
        m.addAction({
            id: 'toggle-minimap',
            label: 'Toggle Minimap',
            run: () => {
                minimapEnabled = !minimapEnabled;
                m.updateOptions({
                    minimap: {
                        enabled: minimapEnabled
                    }
                });
            }
        });
    };


    // Check if Monaco exists
    const codeEditorPoll = setInterval(function () {
        const m = editor.call('editor:monaco');
        if (m) {
            loadTheme(m);
            addCustomKeymap(m);
            clearInterval(codeEditorPoll);
        }
    }, 500);
})();