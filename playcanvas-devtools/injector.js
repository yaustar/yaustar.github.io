if (!__addedDebugTools__) {
    var __addedDebugTools__ = false;
    (function () {
        if (!__addedDebugTools__) {
            var baseUrl;
            var useGitHubUrl = false;
            if (useGitHubUrl) {
                baseUrl = 'https://yaustar.github.io/playcanvas-devtools/';
            } else {
                baseUrl = 'http://localhost:8080/';
            }
            
            var scriptFilenames = [
                'dat.gui.min.js',
                'playcanvas-extras.js',
                'debug-physics.js'
            ];

            var app = pc.Application.getApplication();
            var debugEntityName = '__devtools__';

            var addScriptTypeToDebugEntity = function (scriptName, data) {
                var debugEntity = app.root.findByName(debugEntityName);
                if (!debugEntity) {
                    debugEntity = new pc.Entity();
                    debugEntity.addComponent('script');
                    app.root.addChild(debugEntity);
                }

                var scriptInstance = debugEntity.script[scriptName];
                if (!scriptInstance) {
                    scriptInstance = debugEntity.script.create(scriptName, {
                        attributes: data
                    });
                }

                return scriptInstance;
            }

            var callback = function () {
                console.log('All PlayCanvas Debug Tool scripts loaded');

                // Load the ministats
                var ministats = new pc.MiniStats(app);

                // Load dat gui
                var datgui = new dat.GUI();
                var ministatsFolder = datgui.addFolder('Mini Stats');
                ministatsFolder.add(ministats, 'enabled');

                // Add the physics debugger
                var debugPhysics = addScriptTypeToDebugEntity('debugPhysics', {
                    drawShapes: false,
                    opacity: 0.5,
                    castShadows: false              
                });

                var debugPhysicsFolder = datgui.addFolder('Physics');
                debugPhysicsFolder.add(debugPhysics, 'drawShapes');
                debugPhysicsFolder.add(debugPhysics, 'opacity', 0, 1);
                debugPhysicsFolder.add(debugPhysics, 'castShadows');
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