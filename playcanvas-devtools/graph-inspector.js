(function () {
    var app = pc.Application.getApplication();
    var pcGraphInspector = {};

    // Setup a container
    pcGraphInspector.init = function () {
        this.graphContainer = new pcui.Container({
            grid: true,
            resizable: 'right',
            resizeMax: 1000,
        });

        this.graphContainer.style.position = 'absolute';
        this.graphContainer.style.left = '0px';
        this.graphContainer.style.top = '0px';
        this.graphContainer.style.height = '100%';
        this.graphContainer.style.width = '300px';

        this.graphContainer.style.zIndex = 1000000;

        document.body.appendChild(this.graphContainer.dom);

        this.graphPanel = new pcui.Panel({
            flex: true,
            collapsible: true,
            collapsed: false,
            collapseHorizontally: true,
            removable: false,
            headerText: 'Inspector',
            scrollable: true,
            resizeMax: 1000
        });

        this.graphExpandedItems = new Set();

        this.graphPanel.style.width = '100%';

        this.addGraphContainerEvents();

        this.graphContainer.append(this.graphPanel);

        this.addGraphView(this.graphPanel);

        // Delayed so that the canvas is resized correctly
        // Doing on the first post render
        setTimeout(function() {
            this.onGraphContainerResize();
        }.bind(this), 500);
    };

    // Expose API to hide/show the panel DOM
    pcGraphInspector.show = function (show) {
        this.container.hidden = !show;
    };


    pcGraphInspector.addGraphView = function (parentPanel) {
        var self = this;

        // Add buttons to refresh the hierarchy
        var refreshHierarchyButton = new pcui.Button({
            text: 'Refresh',
            flexShrink: 0
        });

        refreshHierarchyButton.on('click', function () {
            _refreshHierarchy();
            filterTextInput.value = '';
        });

        parentPanel.append(refreshHierarchyButton);

        // Add a tick box to allow displaying graphnodes
        var showGraphNodesLabelGroup = new pcui.LabelGroup({
            text: 'Show Graph Nodes',
            flexShrink: 0
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
        parentPanel.append(showGraphNodesLabelGroup);

        // Filter text input
        var filterTextLabelGroup = new pcui.LabelGroup({
            text: 'Filter',
            flexShrink: 0
        });

        filterTextLabelGroup.label.width = 100;

        var filterTextInput = new pcui.TextInput({});

        filterTextLabelGroup.append(filterTextInput);
        parentPanel.append(filterTextLabelGroup);

        filterTextInput.on('change', function (value) {
            _filterTree(value);
        });

        parentPanel.append(new pcui.Divider());

        var defaultTreeViewOptions = {
            readOnly: true,
            allowDrag: false,
            allowRenaming: false,
            allowReordering: false
        };

        // Hierarchy tree
        var hierarchyTreeView = new pcui.TreeView(defaultTreeViewOptions);

        hierarchyTreeView.on('select', function (item) {
            _printTreeItem(item);
        });

        parentPanel.append(hierarchyTreeView);

        // Filter results tree view
        var filterTreeView = new pcui.TreeView(defaultTreeViewOptions);

        filterTreeView.on('select', function (item) {
            _printTreeItem(item);
        });

        parentPanel.append(filterTreeView);

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

            var previousGraphExpandedItems = self.graphExpandedItems;
            self.graphExpandedItems = new Set();
            _addEntitiesToTree(app.root, hierarchyTreeView, previousGraphExpandedItems);
            
            previousGraphExpandedItems.clear();
        }


        function _onOpenItem() {
            self.graphExpandedItems.add(this.__node);
        }

        function _onCloseItem() {
            self.graphExpandedItems.delete(this.__node);   
        }

        function _addEntitiesToTree(node, treeItem, itemsToExpand) {
            if (showGraphNodes || node instanceof pc.Entity) {
                // Append itself to the tree
                var newItem = new pcui.TreeViewItem({
                    text: node.name,
                    enabled: node.enabled
                });

                newItem.__node = node;

                treeItem.append(newItem);

                newItem.on('open', _onOpenItem);
                newItem.on('close', _onCloseItem);

                // Recursively add children
                for (var i = 0; i < node.children.length; ++i) {
                    _addEntitiesToTree(node.children[i], newItem, itemsToExpand);
                }

                if (itemsToExpand.has(node)) {
                    newItem.open = true;
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
    };


    // Events
    pcGraphInspector.addGraphContainerEvents = function () {
        this.graphPanel.on('collapse', this.onGraphPanelCollapse.bind(this));
        this.graphPanel.on('expand', this.onGraphContainerResize.bind(this));
        this.graphContainer.on('resize', this.onGraphContainerResize.bind(this));

        window.addEventListener('resize', this.onGraphContainerResize.bind(this));
    };


    pcGraphInspector.onGraphPanelCollapse = function () {
        if (app.fillMode === pc.FILLMODE_FILL_WINDOW) {
            var canvas = app.graphicsDevice.canvas;
            canvas.style.left = '32px';
            canvas.style.width = (window.innerWidth - 32).toString() + 'px';
        }
    };

    pcGraphInspector.onGraphContainerResize = function () {
        // Check what fillmode are we in. On do canvas resizing if fill mode is 
        // filling the whole window
        if (app.fillMode === pc.FILLMODE_FILL_WINDOW) {
            var canvas = app.graphicsDevice.canvas;
            var width = this.graphContainer.width;
            canvas.style.left = width.toString() + 'px';

            canvas.style.width = (window.innerWidth - width).toString() + 'px';
        }
    };

    window.pcGraphInspector = pcGraphInspector;
})();