var pcDevtools = {};

pcDevtools.init = function () {
    pcDevtools.app = pc.Application.getApplication();

    var app = pcDevtools.app;

    // Create a frame buffer picker with a resolution of 1024x1024
    pcDevtools.picker = new pc.Picker(pcDevtools.app.graphicsDevice, 1024, 1024);
    app.mouse.on(pc.EVENT_MOUSEDOWN, pcDevtools.onPickerSelectMouse, pcDevtools);
    if (app.touch) {
        app.touch.on(pc.EVENT_TOUCHSTART, pcDevtools.onPickerSelectTouch, pcDevtools);
    }
};


pcDevtools.getPathToEntity = function (node) {
    var path = node.name;
    while (node.parent) {
        path = node.parent.name + '/' + path;
        node = node.parent;
    }

    return path;
};


pcDevtools.printGraphWithFilter = function (node, path, filterString) {
    var i;
    var indentStr = "";

    for (i = 0; i < node.graphDepth; ++i) {
        indentStr += "  ";
    }

    var shouldPrint = true;
    if (filterString && filterString.length > 0) {
        shouldPrint = eval(filterString);
    }

    if (path.length > 0) {
        path += '/';
    }
    path += node.name;

    if (shouldPrint) {
        console.log(indentStr + node.name + ' [' + path + ']');
    }

    var children = node.children;
    for (i = 0; i < children.length; ++i) {
        pcDevtools.printGraphWithFilter(children[i], path, filterString);
    }
};


pcDevtools.enablePicker = false;

pcDevtools.findFirstActiveCamera = function () {
    var app = pcDevtools.app;
    var cameras = app.systems.camera.cameras;
    for (var i = 0; i < cameras.length; ++i) {
        if (cameras[i].entity.enabled) {
            return cameras[i];
        }
    }

    return null;
};

pcDevtools.onPickerSelect = function (x, y) {
    if (pcDevtools.enablePicker) {
        var app = pcDevtools.app;
        var camera = pcDevtools.findFirstActiveCamera();

        console.log('Camera used is: ' + pcDevtools.getPathToEntity(camera.entity));

        var canvas = app.graphicsDevice.canvas;
        var canvasWidth = parseInt(canvas.clientWidth, 10);
        var canvasHeight = parseInt(canvas.clientHeight, 10);

        var scene = app.scene;
        var picker = pcDevtools.picker;

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
                console.log(entity);
                var path = pcDevtools.getPathToEntity(entity);
                console.log(path);
            }
        }

        console.log('Finished picking');
    }
};

pcDevtools.onPickerSelectMouse = function (evt) {
    if (evt.button == pc.MOUSEBUTTON_MIDDLE) {
        pcDevtools.onPickerSelect(evt.x, evt.y);
    }
};

pcDevtools.onPickerSelectTouch = function (evt) {
    pcDevtools.onPickerSelect(evt.touches[0].x, evt.touches[0].y);
    evt.event.preventDefault();
};


pcDevtools.debugEntityName = '__devtools__';
pcDevtools.addScriptTypeToDebugEntity = function (scriptName, data) {
    var app = pcDevtools.app;
    var debugEntity = app.root.findByName(pcDevtools.debugEntityName);
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
