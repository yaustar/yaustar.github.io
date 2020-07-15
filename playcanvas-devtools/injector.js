if (!__addedDebugTools__) {
    var __addedDebugTools__ = false;
    (function () {
        if (!__addedDebugTools__) {
            var baseUrl;
            if (window.__overrideurl__) {
                baseUrl = window.__overrideurl__;
                console.log('Using url override ' + baseUrl);
            } else {
                baseUrl = 'https://yaustar.github.io/playcanvas-devtools/';
                console.log('Using @yaustar GitHub');
            }

            var scriptFilenames = [
                'dat.gui.min.js',
                'playcanvas-extras.js',
                'debug-physics.js',
                'pc-devtools.js'
            ];

            var app = pc.Application.getApplication();
            var debugPhysicsFolder, entityPickerFolder;
            var datgui;

            var dummyObj = {};
            dummyObj.addPhysicsDebugger = function () {
                if (debugPhysicsFolder) {
                    datgui.removeFolder(debugPhysicsFolder);
                }

                // Add the physics debugger
                var debugPhysics = pcDevtools.addScriptTypeToDebugEntity('__debugPhysics__', {
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

            // Add scene graph printer
            dummyObj.printGraph = {};
            dummyObj.printGraph.filterString = '';
            dummyObj.printGraph.printWithFilter = function () {
                console.log('\n=== Print Graph with filter ' + dummyObj.printGraph.filterString + ' ===');
                pcDevtools.graphPrinter.withFilter(app.root, '', dummyObj.printGraph.filterString);
            };

            dummyObj.printGraph.printEntitiesOnly = function () {
                console.log('\n=== Print Graph entities only ===');
                pcDevtools.graphPrinter.withFilter(app.root, '', 'node instanceof pc.Entity');
            };

            Object.defineProperty(dummyObj.printGraph, 'enabledNodesOnly', {
                get: function() { return pcDevtools.graphPrinter.enabledNodesOnly; },
                set: function(value) { pcDevtools.graphPrinter.enabledNodesOnly = value; }
            });

            Object.defineProperty(dummyObj.printGraph, 'printPaths', {
                get: function() { return pcDevtools.graphPrinter.showPaths; },
                set: function(value) { pcDevtools.graphPrinter.showPaths = value; }
            });


            dummyObj.picker = {};

            Object.defineProperty(dummyObj.picker, 'enabled', {
                get: function() { return pcDevtools.picker.enabled; },
                set: function(value) { pcDevtools.picker.enabled = value; }
            });

            Object.defineProperty(dummyObj.picker, 'camera', {
                get: function() { return pcDevtools.picker.cameraPath; },
                set: function(value) { pcDevtools.picker.cameraPath = value; }
            });

            dummyObj.picker.cameraDropdownController = null;
            dummyObj.picker.refreshActiveCameras = function() {
                if (dummyObj.picker.cameraDropdownController) {
                    entityPickerFolder.remove(dummyObj.picker.cameraDropdownController);
                }

                var cameras = app.systems.camera.cameras;
                var cameraPaths = [];
                var i;
                for (i = 0; i < cameras.length; ++i) {
                    var camera = cameras[i];
                    if (camera.entity.enabled) {
                        cameraPaths.push(pcDevtools.getPathToEntity(camera.entity));
                    }
                }

                if (cameraPaths.length > 0) {
                    dummyObj.picker.camera = cameraPaths[0];
                }

                dummyObj.picker.cameraDropdownController = entityPickerFolder.add(dummyObj.picker, 'camera', cameraPaths);
            };


            var callback = function () {
                console.log('All PlayCanvas Debug Tool scripts loaded');

                pcDevtools.init();

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
                printGraphFolder.add(dummyObj.printGraph, 'printWithFilter');
                printGraphFolder.add(dummyObj.printGraph, 'printEntitiesOnly');
                printGraphFolder.add(dummyObj.printGraph, 'enabledNodesOnly');
                printGraphFolder.add(dummyObj.printGraph, 'printPaths');

                entityPickerFolder = datgui.addFolder('Entity Picker');
                entityPickerFolder.add(dummyObj.picker, 'enabled');
                entityPickerFolder.add(dummyObj.picker, 'refreshActiveCameras');

                dummyObj.picker.refreshActiveCameras();
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