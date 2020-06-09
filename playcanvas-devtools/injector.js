if (!__addedDebugTools__) {
    var __addedDebugTools__ = false;
    (function () {
        if (!__addedDebugTools__) {
            var baseUrl;
            var useGitHubUrl = true;
            if (useGitHubUrl) {
                baseUrl = 'https://yaustar.github.io/playcanvas-devtools/';
            } else {
                baseUrl = 'http://localhost:8080/';
            }
            

            var scriptFilenames = [
                'dat.gui.min.js',
                'playcanvas-extras.js',
                'debug-physics.js',
                'pc-devtools.js'
            ];

            var app = pc.Application.getApplication();
            var debugPhysicsFolder;
            var datgui;

            var dummyObj = {};
            dummyObj.addPhysicsDebugger = function () {
                if (debugPhysicsFolder) {
                    datgui.removeFolder(debugPhysicsFolder);
                }

                // Add the physics debugger
                var debugPhysics = pcDevtools.addScriptTypeToDebugEntity(app,'debugPhysics', {
                    drawShapes: false,
                    opacity: 0.5,
                    castShadows: false
                });

                debugPhysicsFolder = datgui.addFolder('Physics');
                debugPhysicsFolder.add(dummyObj, 'addPhysicsDebugger');
                debugPhysicsFolder.add(debugPhysics, 'drawShapes');
                debugPhysicsFolder.add(debugPhysics, 'opacity', 0, 1);
                debugPhysicsFolder.add(debugPhysics, 'castShadows');
            };

            dummyObj.printGraph = {};
            dummyObj.printGraph.filterString = '';
            dummyObj.printGraph.withFilter = function () {
                console.log('\n=== Print Graph with filter ' + dummyObj.printGraph.filterString + ' ===');
                pcDevtools.printGraphWithFilter(app.root, dummyObj.printGraph.filterString);
            };

            dummyObj.printGraph.entitiesOnly = function () {
                console.log('\n=== Print Graph entities only ===');
                pcDevtools.printGraphWithFilter(app.root, 'node instanceof pc.Entity');
            };

            var callback = function () {
                console.log('All PlayCanvas Debug Tool scripts loaded');

                // Load the ministats
                var ministats = new pc.MiniStats(app);

                // Load dat gui
                datgui = new dat.GUI();
                var ministatsFolder = datgui.addFolder('Mini Stats');
                ministatsFolder.add(ministats, 'enabled');

                debugPhysicsFolder = datgui.addFolder('Physics');
                debugPhysicsFolder.add(dummyObj, 'addPhysicsDebugger');

                var printGraphFolder = datgui.addFolder('Print Graph');
                printGraphFolder.add(dummyObj.printGraph, 'filterString');
                printGraphFolder.add(dummyObj.printGraph, 'withFilter');
                printGraphFolder.add(dummyObj.printGraph, 'entitiesOnly');
            };

            var scriptsLoaded = 0;
            for (var i = 0; i < scriptFilenames.length; ++i) {
                var imported = document.createElement('script');
                imported.src = baseUrl + scriptFilenames[i];
                imported.onload = function () {
                    scriptsLoaded += 1;
                    if (scriptsLoaded == scriptFilenames.length) {
                        callback();
                    }
                };
                document.head.appendChild(imported);
            }

            __addedDebugTools__ = true;
        }
    })();
}