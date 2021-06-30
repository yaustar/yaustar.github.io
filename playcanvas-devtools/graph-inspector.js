(function () {
    var app = pc.Application.getApplication();
    var pcGraphInspector = {};

    // Setup a container
    pcGraphInspector.init = function() {
        var container = new pcui.Container({
            grid: true
        });

        container.style.position = 'absolute';
        container.style.left = '0px';
        container.style.top = '0px';
        container.style.height = '100%';
        container.style.zIndex = 1000000;

        this.container = container;

        document.body.appendChild(container.dom);

        var ui = container.dom;

        var panel = new pcui.Panel({
            flex: true,
            collapsible: true,
            collapsed: false,
            collapseHorizontally: true,
            removable: false,
            headerText: 'Inspector',
            resizable: 'right',
            scrollable: true,
            resizeMax: 1000
        });

        var content = panel.content;
        panel.style.width = '300px';

        panel.on('collapse', function () {});

        panel.on('expand', function () {});

        container.append(panel);

        // Add buttons to refresh the hierarchy
        var refreshHierarchyButton = new pcui.Button({
            text: 'Refresh'
        });

        refreshHierarchyButton.on('click', function () {
            _refreshHierarchy();
            filterTextInput.value = '';
        });

        panel.append(refreshHierarchyButton);

        // Add a tick box to allow displaying graphnodes
        var showGraphNodesLabelGroup = new pcui.LabelGroup({
            text: 'Show Graph Nodes'
        });

        showGraphNodesLabelGroup.label.width = 170;

        var showGraphNodesTickbox = new pcui.BooleanInput({
            value: false,
            width: 20,
            height: 20
        });

        showGraphNodesTickbox.on('click', function (e) {
            showGraphNodes = showGraphNodesTickbox.value;
        });

        showGraphNodesLabelGroup.append(showGraphNodesTickbox);
        panel.append(showGraphNodesLabelGroup);

        // Filter text input
        var filterTextLabelGroup = new pcui.LabelGroup({
            text: 'Filter'
        });

        filterTextLabelGroup.label.width = 100;

        var filterTextInput = new pcui.TextInput({});

        filterTextLabelGroup.append(filterTextInput);
        panel.append(filterTextLabelGroup);

        filterTextInput.on('change', function (value) {
            _filterTree(value);
        });

        panel.append(new pcui.Divider());

        // Hierarchy tree
        var hierarchyTreeView = new pcui.TreeView({
            readOnly: true,
            allowDrag: false,
            allowRenaming: false,
            allowReordering: false
        });

        hierarchyTreeView.on('select', function (item) {
            _printTreeItem(item);
        });

        panel.append(hierarchyTreeView);

        // Filter results tree view
        var filterTreeView = new pcui.TreeView({
            readOnly: true,
            allowDrag: false,
            allowRenaming: false,
            allowReordering: false
        });

        filterTreeView.on('select', function (item) {
            _printTreeItem(item);
        });

        panel.append(filterTreeView);


        showGraphNodes = false;
        _refreshHierarchy();


        function _printTreeItem(item) {
            var node = item.__node;
            var path = node.name;
            while (node.parent && node.parent !== app.root) {
                path = node.parent.name + '/' + path;
                node = node.parent;
            }

            console.log('\nwindow._selectedNode = ' + path);

            window._selectedNode = item.__node;
            console.log(item.__node);
        }


        function _refreshHierarchy() {
            filterTreeView.hidden = true;
            hierarchyTreeView.hidden = false;

            hierarchyTreeView.clearTreeItems();

            _addEntitiesToTree(app.root, hierarchyTreeView);
        }


        function _addEntitiesToTree(node, treeItem) {
            if (showGraphNodes || node instanceof pc.Entity) {
                // Append itself to the tree
                var newItem = new pcui.TreeViewItem({
                    text: node.name,
                    enabled: node.enabled
                });

                newItem.__node = node;

                treeItem.append(newItem);

                // Recursively add children
                for (var i = 0; i < node.children.length; ++i) {
                    _addEntitiesToTree(node.children[i], newItem);
                }
            }
        }


        function _filterTree(filterCode) {
            if (filterCode.length === 0) {
                _refreshHierarchy();
                return;
            }

            var filterFunction = function (node) {
                return Function("'use strict';return (function(node){return " + filterCode + ";})")()(node);
            };

            try {
                filterTreeView.clearTreeItems();

                hierarchyTreeView._traverseDepthFirst(function (item) {
                    if (filterFunction(item.__node)) {
                        var node = item.__node;
                        var newItem = new pcui.TreeViewItem({
                            text: node.name,
                            enabled: node.enabled
                        });

                        newItem.__node = node;

                        filterTreeView.append(newItem);
                    }
                });


                hierarchyTreeView.hidden = true;
                filterTreeView.hidden = false;

            } catch (e) {
                console.warn(e);
                _refreshHierarchy();
            }
        }
    }

    // Expose API to hide/show the panel DOM
    pcGraphInspector.show = function (show) {
        this.container.hidden = !show;
    };

    window.pcGraphInspector = pcGraphInspector;
})();