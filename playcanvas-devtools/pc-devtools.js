(function () {
    var pcDevtools = pcDevtools || {};

    pcDevtools.init = function () {
        var app = pc.Application.getApplication();

        this.app = app;

        app.mouse.on(pc.EVENT_MOUSEDOWN, this.picker.onSelectMouse, this.picker);
        if (app.touch) {
            app.touch.on(pc.EVENT_TOUCHSTART, this.picker.onSelectTouch, this.picker);
        }
    };

    pcDevtools.getPathToEntity = function (node) {
        var path = node.name;
        while (node.parent && node.parent !== pcDevtools.app.root) {
            path = node.parent.name + '/' + path;
            node = node.parent;
        }

        return path;
    };

    pcDevtools.picker = {};
    pcDevtools.picker.enabled = false
    pcDevtools.picker.cameraPath = "";

    pcDevtools.picker.onSelect = function (x, y) {
        if (this.enabled) {
            if (!this.picker) {
                this.picker = new pc.Picker(pcDevtools.app, 1024, 1024);
            }

            var app = pcDevtools.app;
            var camera = app.root.findByPath(this.cameraPath).camera;

            console.log('Camera used is: ' + this.cameraPath);

            var canvas = app.graphicsDevice.canvas;
            var canvasWidth = parseInt(canvas.clientWidth, 10);
            var canvasHeight = parseInt(canvas.clientHeight, 10);

            var scene = app.scene;
            var picker = this.picker;

            picker.prepare(camera, scene);

            // Map the mouse coordinates into picker coordinates and
            // query the selection
            var selected = picker.getSelection(
                Math.floor(x * (picker.width / canvasWidth)),
                Math.floor(y * (picker.height / canvasHeight))
            );

            if (selected.length > 0) {
                // Get the graph node used by the selected mesh instance
                var entity = selected[0] ? selected[0].node : null;

                // Bubble up the hierarchy until we find an actual Entity
                while (!(entity instanceof pc.Entity) && entity !== null) {
                    entity = entity.parent;
                }

                // Print it out to console and get the path to it
                if (entity) {
                    var node = entity;
                    var path = node.name;
                    while (node.parent && node.parent !== app.root) {
                        path = node.parent.name + '/' + path;
                        node = node.parent;
                    }

                    console.log('\nwindow._selectedNode = ' + path);

                    window._selectedNode = entity;
                    console.log(entity);
                }
            }

            console.log('Finished picking');
        }
    };

    pcDevtools.picker.onSelectMouse = function (evt) {
        this.onSelect(evt.x, evt.y);
    };

    pcDevtools.picker.onSelectTouch = function (evt) {
        this.onSelect(evt.touches[0].x, evt.touches[0].y);
        evt.event.preventDefault();
    };


    pcDevtools.debugEntityName = '__devtools__';
    pcDevtools.addScriptTypeToDebugEntity = function (entityName, scriptName, data) {
        var app = pcDevtools.app;
        var debugEntity = app.root.findByName(entityName);
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
    };

    pcDevtools.assetTools = {};
    pcDevtools.assetTools.printAssetList = function (assets) {
        var regexString = '\\b(?:';
        var validAssetCount = 0;
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].type !== 'folder' && assets[i].type !== 'script') {
                console.log("\"" + assets[i].name + "\" [" + assets[i].type + "]");
                if (validAssetCount > 0) {
                    regexString += '|';
                }
                regexString += assets[i].name;
                validAssetCount += 1;
            }
        }

        regexString += ')\\b';

        console.log('\n=== Regex string ===\n');
        console.log(regexString);
    };

    pcDevtools.assetTools.listAllPreloadedAssets = function() {
        var app = pcDevtools.app;
        var assets = app.assets.list({preload: true});
        this.printAssetList(assets);
    };

    pcDevtools.assetTools.listNonPreloadedAssets = function() {
        var app = pcDevtools.app;
        var assets = app.assets.list({preload: false});
        this.printAssetList(assets);
    };

    // Add a object watch shim
    if (!Object.prototype.watch) {
        Object.defineProperty(Object.prototype, "watch", {
              enumerable: false
            , configurable: true
            , writable: false
            , value: function (prop, handler) {
                var
                  oldval = this[prop]
                , newval = oldval
                , getter = function () {
                    return newval;
                }
                , setter = function (val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                }
                ;

                if (delete this[prop]) { // can't watch constants
                    Object.defineProperty(this, prop, {
                          get: getter
                        , set: setter
                        , enumerable: true
                        , configurable: true
                    });
                }
            }
        });
    }

    // object.unwatch
    if (!Object.prototype.unwatch) {
        Object.defineProperty(Object.prototype, "unwatch", {
              enumerable: false
            , configurable: true
            , writable: false
            , value: function (prop) {
                var val = this[prop];
                delete this[prop]; // remove accessors
                this[prop] = val;
            }
        });
    }

    window.pcDevtools = pcDevtools;
})();
