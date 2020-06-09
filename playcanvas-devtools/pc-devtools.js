var pcDevtools = { };

pcDevtools.printGraphWithFilter = function (node, filterString) {
    var i;
    var indentStr = "";

    for (i = 0; i < node.graphDepth; ++i) {
        indentStr += "  ";
    }

    var shouldPrint = true;
    if (filterString && filterString.length > 0) {
        shouldPrint = eval(filterString);
    }

    if (shouldPrint) {
        console.log(indentStr + node.name);
    }

    var children = node.children;
    for (i = 0; i < children.length; ++i) {
        pcDevtools.printGraphWithFilter(children[i], filterString);
    }
};


pcDevtools.debugEntityName = '__devtools__';

pcDevtools.addScriptTypeToDebugEntity = function (app, scriptName, data) {
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
