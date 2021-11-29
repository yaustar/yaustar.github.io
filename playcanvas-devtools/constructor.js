var __pcDevtoolsConstruct__ = function (baseUrl, app, window) {
    if (!__addedDebugTools__) {
        var __addedDebugTools__ = false;
        (function () {
            if (!__addedDebugTools__) {
                var scriptFilenames = [];

                if (!window.pcui) {
                    scriptFilenames.push('libs/pcui.js');
                }

                if (!pc.MiniStats) {
                    scriptFilenames.push('libs/playcanvas-extras.js');
                }

                scriptFilenames = scriptFilenames.concat([
                    'libs/dat.gui.min.js',
                    'pc-devtools.js',
                    'debug-physics.js',
                    'debug-gamepad-flycamera.js',
                    'graph-inspector.js'
                ]);

                // Add gamepad support if we don't have it
                if (!app.gamepads) {
                    app.gamepads = new pc.GamePads();
                }

                // Generic function to stop events going through doms
                function stopPropagatingInputEvents(element) {
                    element.onkeydown = function (event) {
                        event.stopPropagation();
                    };
                    element.onmousedown = function (event) {
                        event.stopPropagation();
                    };
                    element.onmousemove = function (event) {
                        //event.stopPropagation();
                    };
                    element.onmousewheel = function (event) {
                        event.stopPropagation();
                    };
                }

                var debugPhysicsFolder;
                var datgui;

                var dummyObj = {};
                dummyObj.addPhysicsDebugger = function () {
                    if (debugPhysicsFolder) {
                        datgui.removeFolder(debugPhysicsFolder);
                    }

                    // Add the physics debugger
                    var debugPhysics = pcDevtools.addScriptTypeToDebugEntity('__debugPhysics__', '__debugPhysics__', {
                        drawShapes: true,
                        opacity: 0.5,
                        castShadows: false
                    });

                    debugPhysicsFolder = datgui.addFolder('Physics');
                    debugPhysicsFolder.add(dummyObj, 'addPhysicsDebugger');
                    debugPhysicsFolder.add(debugPhysics, 'drawShapes');
                    debugPhysicsFolder.add(debugPhysics, 'opacity', 0, 1);
                    debugPhysicsFolder.add(debugPhysics, 'castShadows');
                };

                var refreshActiveCameras = function (obj) {
                    if (obj.cameraDropdownController) {
                        obj.cameraFolder.remove(obj.cameraDropdownController);
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
                        obj.camera = cameraPaths[0];
                    }

                    obj.cameraDropdownController = obj.cameraFolder.add(obj, 'camera', cameraPaths);
                }

                dummyObj.picker = {};

                Object.defineProperty(dummyObj.picker, 'enabled', {
                    get: function () {
                        return pcDevtools.picker.enabled;
                    },
                    set: function (value) {
                        pcDevtools.picker.enabled = value;
                    }
                });

                Object.defineProperty(dummyObj.picker, 'camera', {
                    get: function () {
                        return pcDevtools.picker.cameraPath;
                    },
                    set: function (value) {
                        pcDevtools.picker.cameraPath = value;
                    }
                });

                dummyObj.picker.cameraDropdownController = null;
                dummyObj.picker.refreshActiveCameras = function () {
                    refreshActiveCameras(dummyObj.picker);
                };

                dummyObj.assetTools = {};
                dummyObj.assetTools.listAllPreloadedAssets = function () {
                    console.log('\n=== Preloaded Assets ===');
                    pcDevtools.assetTools.listAllPreloadedAssets();
                };

                dummyObj.assetTools.listNonPreloadedAssets = function () {
                    console.log('\n=== Non Preloaded Assets ===');
                    pcDevtools.assetTools.listNonPreloadedAssets();
                };


                // Debug Fly camera setup
                dummyObj.debugFlyCamera = {};
                dummyObj.debugFlyCamera.cameraPath = '';
                dummyObj.debugFlyCamera.currentScriptInstance = null;
                dummyObj.debugFlyCamera.datGuiEntries = [];
                dummyObj.debugFlyCamera.refreshActiveCameras = function () {
                    refreshActiveCameras(dummyObj.debugFlyCamera);
                };

                Object.defineProperty(dummyObj.debugFlyCamera, 'enabled', {
                    get: function () {
                        return dummyObj.debugFlyCamera.currentScriptInstance !== null;
                    },
                    set: function (value) {
                        if (this.currentScriptInstance) {
                            var entity = this.currentScriptInstance.entity;
                            entity.script.destroy('__debugGamepadFlyCamera__');
                            this.currentScriptInstance = null;

                            for (var i = 0; i < this.datGuiEntries.length; i++) {
                                this.cameraFolder.remove(this.datGuiEntries[i]);
                            }

                            this.datGuiEntries = [];
                        } else {
                            var entity = app.root.findByPath(this.cameraPath);
                            if (entity) {
                                if (!entity.script) {
                                    entity.addComponent('script');
                                }
                                this.currentScriptInstance = entity.script.create('__debugGamepadFlyCamera__');
                                this.datGuiEntries.push(this.cameraFolder.add(this.currentScriptInstance, 'gamepadIndex'));
                                this.datGuiEntries.push(this.cameraFolder.add(this.currentScriptInstance, 'moveSensitivity'));
                                this.datGuiEntries.push(this.cameraFolder.add(this.currentScriptInstance, 'lookSensitivity').listen());
                                this.datGuiEntries.push(this.cameraFolder.add(this.currentScriptInstance, 'invert'));
                            }
                        }
                    }
                });

                Object.defineProperty(dummyObj.debugFlyCamera, 'camera', {
                    get: function () {
                        return this.cameraPath;
                    },
                    set: function (value) {
                        this.cameraPath = value;
                    }
                });


                dummyObj.graphInspector = {};
                dummyObj.graphInspector._show = true;

                Object.defineProperty(dummyObj.graphInspector, 'show', {
                    get: function () {
                        return this._show;
                    },
                    set: function (value) {
                        this._show = value;
                        pcGraphInspector.show(value);
                    }
                });

                var callback = function () {
                    console.log('All PlayCanvas Debug Tool scripts loaded');

                    pcDevtools.init();
                    pcGraphInspector.init();

                    stopPropagatingInputEvents(pcGraphInspector.graphContainer.dom);

                    // Load the ministats
                    var ministats = new pc.MiniStats(app);

                    // Load dat gui
                    datgui = new dat.GUI();
                    datgui.domElement.style.zIndex = 1000000;
                    stopPropagatingInputEvents(datgui.domElement);

                    // Force update values
                    var updateDisplay = function (gui) {
                        for (var i in gui.__controllers) {
                            if (gui.__controllers[i].updateDisplay) {
                                gui.__controllers[i].updateDisplay();
                            }
                        }
                        for (var f in gui.__folders) {
                            updateDisplay(gui.__folders[f]);
                        }
                    };

                    app.on('update', function () {
                        updateDisplay(datgui);
                    });

                    var ministatsFolder = datgui.addFolder('Mini Stats');
                    ministatsFolder.add(ministats, 'enabled');

                    debugPhysicsFolder = datgui.addFolder('Physics');
                    debugPhysicsFolder.add(dummyObj, 'addPhysicsDebugger');

                    var graphInspectorFolder = datgui.addFolder('Graph Inspector');
                    graphInspectorFolder.add(dummyObj.graphInspector, 'show');

                    dummyObj.picker.cameraFolder = datgui.addFolder('Entity Picker');
                    dummyObj.picker.cameraFolder.add(dummyObj.picker, 'enabled');
                    dummyObj.picker.cameraFolder.add(dummyObj.picker, 'refreshActiveCameras');
                    dummyObj.picker.refreshActiveCameras();

                    dummyObj.debugFlyCamera.cameraFolder = datgui.addFolder('Debug Fly Camera');
                    dummyObj.debugFlyCamera.cameraFolder.add(dummyObj.debugFlyCamera, 'enabled');
                    dummyObj.debugFlyCamera.cameraFolder.add(dummyObj.debugFlyCamera, 'refreshActiveCameras');
                    dummyObj.debugFlyCamera.refreshActiveCameras();

                    var assetToolsFolder = datgui.addFolder('Asset Tools');
                    assetToolsFolder.add(dummyObj.assetTools, 'listAllPreloadedAssets');
                    assetToolsFolder.add(dummyObj.assetTools, 'listNonPreloadedAssets');
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
};
