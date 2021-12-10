(function () {
    var app = pc.Application.getApplication();
    var pcGraphInspector = {};

    var componentPropertyNames = [
        'anim',
        'animation',
        'audiolistener',
        'button',
        'camera',
        'collision',
        'element',
        'layoutchild',
        'layoutgroup',
        'light',
        'model',
        'particlesystem',
        'render',
        'rigidbody',
        'screen',
        'script',
        'scrollbar',
        'scrollview',
        'sound',
        'sprite'
    ];

    // Setup a container for the graph
    pcGraphInspector.init = function () {
        this.detailPanels = {};

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
            headerText: 'Hierarchy',
            scrollable: true,
            resizeMax: 1000
        });

        this.graphExpandedItems = new Set();
        this.graphPanel.style.width = '100%';
        
        this.graphContainer.append(this.graphPanel);
        this.addGraphView(this.graphPanel);        

        // Delayed so that the canvas is resized correctly
        // Doing on the first post render
        setTimeout(function() {
            this.onContainerResize();
        }.bind(this), 500);


        // Setup the inspector container
        this.inspectorContainer = new pcui.Container({
            grid: true,
            resizable: 'left',
            resizeMax: 1000,
        });

        this.inspectorContainer.style.position = 'absolute';
        this.inspectorContainer.style.right = '0px';
        this.inspectorContainer.style.top = '0px';
        this.inspectorContainer.style.height = '100%';
        this.inspectorContainer.style.width = '300px';

        this.inspectorContainer.style.zIndex = 1000000;

        document.body.appendChild(this.inspectorContainer.dom);

        this.inspectorPanel = new pcui.Panel({
            flex: true,
            collapsible: true,
            collapsed: false,
            collapseHorizontally: true,
            removable: false,
            headerText: 'Inspector',
            scrollable: true,
            resizeMax: 1000
        });

        this.inspectorPanel.style.width = '100%';
        this.inspectorContainer.append(this.inspectorPanel);
        
        this.detailsCollapsedPanels = new Set();

        this.addContainerEvents();

        var onComponentAddRemoval = function(entity, component) {
            if (entity === window._selectedNode) {
                this.removeInspectorDetails(false);
            }
        }.bind(this);

        for (var i = 0; i < componentPropertyNames.length; ++ i) {
            var system = app.systems[componentPropertyNames[i]];
            system.on('add', onComponentAddRemoval);
            system.on('remove', onComponentAddRemoval);
        }

        // Add an update loop
        app.on('postrender', function() {
            var selectedNode = window._selectedNode;
            if (selectedNode) {
                this.updateNodeDetails(selectedNode);
            }
        }, this);

        window._selectedNode = null;
    };

    // Expose API to hide/show the panel DOM
    pcGraphInspector.show = function (show) {
        this.graphContainer.hidden = !show;
        this.inspectorContainer.hidden = !show;
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

        hierarchyTreeView.on('select', _onSelect.bind(this));

        parentPanel.append(hierarchyTreeView);

        // Filter results tree view
        var filterTreeView = new pcui.TreeView(defaultTreeViewOptions);

        filterTreeView.on('select', _onSelect.bind(this));

        parentPanel.append(filterTreeView);

        showGraphNodes = false;
        _refreshHierarchy();

        function _onSelect(item) {
            var prevSelectedNode = window._selectedNode;
            if (prevSelectedNode && prevSelectedNode.script) {
                prevSelectedNode.script.off('destroy', this.onScriptInstanceAddOrRemove, this);
                prevSelectedNode.script.off('create', this.onScriptInstanceAddOrRemove, this);
            }

            var node = item.__node;
            var path = node.name;
            while (node.parent && node.parent !== app.root) {
                path = node.parent.name + '/' + path;
                node = node.parent;
            }

            var guid = '';
            if (node instanceof pc.Entity) {
                guid = node._guid;
            }

            console.log('\nwindow._selectedNode = ' + path + ' [' + guid + ']');

            window._selectedNode = item.__node;
            console.log(item.__node);

            this.removeInspectorDetails(true);
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


    // Resize Events
    pcGraphInspector.addContainerEvents = function () {
        var resizeCallbackHandle = this.onContainerResize.bind(this);
        
        this.graphPanel.on('collapse', this.onContainerCollapse.bind(this));
        this.inspectorPanel.on('collapse', this.onContainerCollapse.bind(this));

        this.graphPanel.on('expand', this.onContainerExpand.bind(this));
        this.graphContainer.on('resize', resizeCallbackHandle);

        this.inspectorPanel.on('expand', this.onContainerExpand.bind(this));
        this.inspectorContainer.on('resize', resizeCallbackHandle);

        window.addEventListener('resize', resizeCallbackHandle);
    };

    pcGraphInspector.onContainerCollapse = function () {
        // Store the previous widths
        if (this.graphPanel.collapsed && !this.graphContainer.previousWidth) {
            this.graphContainer.previousWidth = this.graphContainer.width;
            this.graphContainer.width = 32;
        }

        if (this.inspectorPanel.collapsed && !this.inspectorContainer.previousWidth) {
            this.inspectorContainer.previousWidth = this.inspectorContainer.width;
            this.inspectorContainer.width = 32;
        }

        this.onContainerResize();
    };


    pcGraphInspector.onContainerExpand = function () {
        if (!this.graphPanel.collapsed) {
            this.graphContainer.width = this.graphContainer.previousWidth || 300;
            this.graphContainer.previousWidth = null;
        }

        if (!this.inspectorPanel.collapsed) {
            this.inspectorContainer.width = this.inspectorContainer.previousWidth || 300;
            this.inspectorContainer.previousWidth = null;
        }

        this.onContainerResize();
    };


    pcGraphInspector.onContainerResize = function () {
        // Check what fillmode are we in. On do canvas resizing if fill mode is 
        // filling the whole window
        if (app.fillMode === pc.FILLMODE_FILL_WINDOW) {
            var canvas = app.graphicsDevice.canvas;
            var leftWidth = this.graphPanel.collapsed ? 32 : this.graphContainer.width;
            var rigthWidth = this.inspectorPanel.collapsed ? 32 : this.inspectorContainer.width;
            var width = leftWidth + rigthWidth;

            canvas.style.left = leftWidth.toString() + 'px';

            canvas.style.width = (window.innerWidth - width).toString() + 'px';
        }
    };

    var componentPropertyNames = [
        'anim',
        'animation',
        'audiolistener',
        'button',
        'camera',
        'collision',
        'element',
        'layoutchild',
        'layoutgroup',
        'light',
        'model',
        'particlesystem',
        'render',
        'rigidbody',
        'screen',
        'script',
        'scrollbar',
        'scrollview',
        'sound',
        'sprite'
    ];

    pcGraphInspector.onScriptInstanceAddOrRemove = function () {
        this.removeInspectorDetails();
    };


    // Add component details panels views for the current selected Entity
    pcGraphInspector.removeInspectorDetails = (function () {
        var removePanel = function (type) {
            var panel = this.detailPanels[type]; 
            if (panel) {
                panel.parent.destroy();
                this.inspectorPanel.remove(panel.parent);
            } 
        }.bind(this);

        return function (expandAllPanels) {
            removePanel('graphnode');
            removePanel('entity');

            for (var i = 0; i < componentPropertyNames .length; ++i) {
                removePanel(componentPropertyNames [i]);
            }

            if (expandAllPanels) {    
                this.detailsCollapsedPanels = new Set();
            }

            this.detailPanels = {};
        };
    }).bind(pcGraphInspector)();


    pcGraphInspector.updateNodeDetails = (function () {
        // Helper functions
        var createParent = function (name, collapsed) {
            var panel = new pcui.Panel({
                flex: true,
                collapsible: true,
                collapsed: collapsed,
                collapseHorizontally: false,
                removable: false,
                headerText: name,
                scrollable: false,
                resizable: null
            });

            return panel;
        };

        var createPanelInfo = function (propertyName, title) {
            var panelInfo = {};
            var tempPcuiComponent = createParent(title, this.detailsCollapsedPanels.has(propertyName));
            panelInfo.parent = tempPcuiComponent;

            this.inspectorPanel.append(panelInfo.parent);
            this.detailPanels[propertyName] = panelInfo;

            tempPcuiComponent.on('collapse', function () {
                this.detailsCollapsedPanels.add(propertyName);
            }.bind(this));

            tempPcuiComponent.on('expand', function () {
                this.detailsCollapsedPanels.delete(propertyName);
            }.bind(this));

            return panelInfo;
        }.bind(this);

        // String
        var createString = function (labelName, parent) {
            var labelGroup = new pcui.LabelGroup({
                text: labelName,
                flexShrink: 0
            });

            labelGroup.label.width = 100;

            var textField = new pcui.TextInput({
                readOnly: true
            });

            labelGroup.append(textField);
            parent.append(labelGroup);

            return { group: labelGroup, textField: textField };
        };

        var updateString = function (stringElement, value) {
            stringElement.value = value;
        };

        // Boolean
        var createBoolean = function (labelName, parent) {
            var labelGroup = new pcui.LabelGroup({
                text: labelName
            });

            labelGroup.label.width = 250;

            var boolInput = new pcui.BooleanInput({
                width: 20,
                height: 20,
                readOnly: true
            });

            labelGroup.append(boolInput);
            parent.append(labelGroup);

            return { group: labelGroup, tickbox: boolInput };
        };

        var updateBoolean = function (boolElement, value) {
            boolElement.value = value;
        };

        // Vec3
        var createVec3 = function (labelName, parent) {
            var textElements = [];
            var labelGroup = new pcui.LabelGroup({
                text: labelName,
                flexShrink: 0
            });

            labelGroup.label.width = 100;

            for (var i = 0; i < 3; ++i) {
                var textField = new pcui.TextInput({
                    readOnly: true,
                    width: 50
                });

                labelGroup.append(textField);
                textElements.push(textField);
            }

            parent.append(labelGroup);

            return { group: labelGroup, textFields: textElements };
        };

        var updateVec3 = function (vec3Elements, value) {
            vec3Elements[0].value = value.x.toFixed(3);
            vec3Elements[1].value = value.y.toFixed(3);
            vec3Elements[2].value = value.z.toFixed(3);
        };

        // Tags
        var createTags = function (labelName, parent) {
            var labelGroup = new pcui.LabelGroup({
                text: labelName,
                flexShrink: 0
            });

            labelGroup.label.width = 100;
            var textArea = new pcui.TextAreaInput({
                readOnly: true,
                resizable: 'vertical'
            });

            labelGroup.append(textArea);
            parent.append(labelGroup);

            return { group: labelGroup, textArea: textArea };
        };

        var updateTags = function (element, value) {
            var text = '';
            var tags = value.list();
            for (var i = 0; i < tags.length; ++i) {
                if (i > 0) {
                    text += ', ';
                }
                text += tags[i];
            }

            element.value = text;
        };


        return function (node) {
            var i = 0;

            if (this.inspectorPanel.collapsed) {
                return;
            }

            // Add all the detail panels

            var panelInfo = null;
            var tempPcuiComponent = null;

            panelInfo = this.detailPanels['graphnode'];
            if (!panelInfo) {
                panelInfo = createPanelInfo('graphnode', 'Graph Node');

                tempPcuiComponent = createString('Name', panelInfo.parent);
                panelInfo.nameTextField = tempPcuiComponent.textField;

                tempPcuiComponent = createVec3('Local Position', panelInfo.parent);
                panelInfo.localPosition = tempPcuiComponent.textFields;

                tempPcuiComponent = createVec3('Local Rotation', panelInfo.parent);
                panelInfo.localRotation = tempPcuiComponent.textFields;

                tempPcuiComponent = createVec3('Local Scale', panelInfo.parent);
                panelInfo.localScale = tempPcuiComponent.textFields;

                tempPcuiComponent = createVec3('Global Position', panelInfo.parent);
                panelInfo.globalPosition = tempPcuiComponent.textFields;

                tempPcuiComponent = createVec3('Global Rotation', panelInfo.parent);
                panelInfo.globalRotation = tempPcuiComponent.textFields;
            }

            if (!panelInfo.parent.collapsed) {
                updateString(panelInfo.nameTextField, node.name);
                updateVec3(panelInfo.localPosition, node.getLocalPosition());
                updateVec3(panelInfo.localRotation, node.getLocalEulerAngles());
                updateVec3(panelInfo.localScale, node.getLocalScale());
                updateVec3(panelInfo.globalPosition, node.getPosition());
                updateVec3(panelInfo.globalRotation, node.getEulerAngles());
            }

            if (!(node instanceof pc.Entity)) {
                return;
            }

            panelInfo = this.detailPanels['entity'];
            if (!panelInfo) {
                panelInfo = createPanelInfo('entity', 'Entity');

                tempPcuiComponent = createTags('Tags', panelInfo.parent);
                panelInfo.tagsTextArea = tempPcuiComponent.textArea;
            }

            if (!panelInfo.parent.collapsed) {
                updateTags(panelInfo.tagsTextArea, node.tags);
            }


            // Components
            var createdComponetPanels = new Set();
            for (i = 0; i < componentPropertyNames.length; ++i) {
                var propertyName = componentPropertyNames[i];
                if (node[propertyName]) {
                    panelInfo = this.detailPanels[propertyName];
                    if (!panelInfo) {
                        panelInfo = createPanelInfo(propertyName, propertyName);

                        tempPcuiComponent = createBoolean('Enabled', panelInfo.parent);
                        panelInfo.enabledTickbox = tempPcuiComponent.tickbox;

                        createdComponetPanels.add(propertyName);
                    }

                    if (!panelInfo.parent.collapsed) {
                        updateBoolean(panelInfo.enabledTickbox, node[propertyName].enabled);
                    }
                }
            }

            if (node.script) {
                panelInfo = this.detailPanels['script'];
                var scriptInstances = node.script._scripts;
                var scriptInstance = null;
                var scriptName = null;

                if (createdComponetPanels.has('script')) {
                    // List all the scripts attached to the script components
                    for (i = 0; i < scriptInstances.length; ++i) {
                        scriptInstance = scriptInstances[i];
                        scriptName = scriptInstance.__scriptType.__name;
                        tempPcuiComponent = createBoolean(scriptName, panelInfo.parent);
                        panelInfo[scriptName] = tempPcuiComponent.tickbox;
                    }

                    // Listen for addition/removals to the script component
                    node.script.once('destroy', this.onScriptInstanceAddOrRemove, this);
                    node.script.once('create', this.onScriptInstanceAddOrRemove, this);
                }

                if (!panelInfo.parent.collapsed) {
                    for (i = 0; i < scriptInstances.length; ++i) {
                        scriptInstance = scriptInstances[i];
                        scriptName = scriptInstance.__scriptType.__name;
                        if (panelInfo[scriptName]) {
                            updateBoolean(panelInfo[scriptName], scriptInstance.enabled);
                        }
                    }
                }
            }


            // Refresh when scripts are removed/added

            // Anim component
            // Parameters state, playable
            // Each layer (transitioning, activestate, playing, playable, previous state, name, activeStateCurrentTime, transition progress)
        };
    }).bind(pcGraphInspector)();

    window.pcGraphInspector = pcGraphInspector;
})();