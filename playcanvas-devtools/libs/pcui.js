(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@playcanvas/observer')) :
    typeof define === 'function' && define.amd ? define(['exports', '@playcanvas/observer'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pcui = {}, global.observer));
})(this, (function (exports, observer) { 'use strict';

    function ___$insertStyle(css) {
        if (!css || typeof window === 'undefined') {
            return;
        }
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        document.head.appendChild(style);
        return css;
    }

    /**
     * @name IBindable
     * @class
     * @classdesc Provides an interface for getting / setting a value for the Element.
     * @property {*} value - Gets / sets the value of the Element.
     * @property {Array<*>} values - Sets multiple values to the Element. It is up to the Element to determine how to display them.
     */
    class IBindable {
    }

    /**
     * @name IFocusable
     * @class
     * @classdesc Provides an interface for focusing / unfocusing an Element.
     */
    class IFocusable {
        /**
         * Focus on the element
         */
        focus() {
            throw new Error('Not implemented');
        }

        /**
         * Unfocus the element
         */
        blur() {
            throw new Error('Not implemented');
        }
    }

    /**
     * @name ICollapsible
     * @property {boolean} collapsible Gets / sets whether the Element is collapsible.
     * @property {boolean} collapsed Gets / sets whether the Element should be collapsed.
     * @class
     * @classdesc Provides an interface to allow collapsing / expanding of an Element.
     */
    class ICollapsible { }

    /**
     * @name IFlex
     * @property {boolean} flex Gets / sets whether the Element supports flex layout.
     * @class
     * @classdesc Provides an interface for allowing support for the flexbox CSS layout
     */
    class IFlex {}

    /**
     * @name IGrid
     * @property {boolean} grid Gets / sets whether the Element supports the grid layout.
     * @class
     * @classdesc Provides an interface for allowing support for the grid CSS layout
     */
    class IGrid {}

    /**
     * @name IScrollable
     * @class
     * @classdesc Provides an interface for allowing scrolling on an Element.
     * @property {boolean} scrollable - Gets / sets whether the Element should be scrollable.
     */
    class IScrollable {}

    /**
     * @name IResizable
     * @class
     * @classdesc Provides an interface for enabling resizing support for an Element
     * @property {number} resizeMin - Gets / sets the minimum size the Element can take when resized in pixels.
     * @property {number} resizeMax - Gets / sets the maximum size the Element can take when resized in pixels.
     * @property {string} resizable - Gets / sets whether the Element is resizable and where the resize handle is located. Can
     * be one of 'top', 'bottom', 'right', 'left'. Set to null to disable resizing.
     */
    class IResizable { }

    var FLEX = 'pcui-flex';
    var GRID = 'pcui-grid';
    var HIDDEN = 'pcui-hidden';
    var SCROLLABLE = 'pcui-scrollable';
    var RESIZABLE = 'pcui-resizable';
    var READONLY = 'pcui-readonly';
    var DISABLED = 'pcui-disabled';
    var COLLAPSIBLE = 'pcui-collapsible';
    var COLLAPSED = 'pcui-collapsed';
    var FOCUS = 'pcui-focus';
    var MULTIPLE_VALUES = 'pcui-multiple-values';
    var ERROR = 'pcui-error';
    var FLASH = 'flash';
    var NOT_FLEXIBLE = 'pcui-not-flexible';
    var DEFAULT_MOUSEDOWN = 'pcui-default-mousedown';
    var FONT_REGULAR = 'font-regular';
    var FONT_BOLD = 'font-bold';

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular, .pcui-element {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n@-webkit-keyframes pcui-flash-animation {\n  from {\n    outline-color: #f60;\n  }\n  to {\n    outline-color: rgba(255, 102, 0, 0);\n  }\n}\n@keyframes pcui-flash-animation {\n  from {\n    outline-color: #f60;\n  }\n  to {\n    outline-color: rgba(255, 102, 0, 0);\n  }\n}\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-element {\n  border: 0 solid #232e30;\n}\n.pcui-element.flash {\n  outline: 1px solid #f60;\n  -webkit-animation: pcui-flash-animation 200ms ease-in-out forwards;\n  animation: pcui-flash-animation 200ms ease-in-out forwards;\n}\n.pcui-element:focus {\n  outline: none;\n}\n.pcui-element::-moz-focus-inner {\n  border: 0;\n}\n\n.pcui-element.pcui-hidden {\n  display: none;\n}");

    const CLASS_ELEMENT = 'pcui-element';

    // these are properties that are
    // available as Element properties and
    // can also be set through the Element constructor
    const SIMPLE_CSS_PROPERTIES = [
        'flexDirection',
        'flexGrow',
        'flexBasis',
        'flexShrink',
        'flexWrap',
        'alignItems',
        'alignSelf',
        'justifyContent',
        'justifySelf'
    ];

    // Stores Element types by name and default arguments
    const ELEMENT_REGISTRY = {};

    /**
     * @event
     * @name Element#enable
     * @description Fired when the Element gets enabled
     */

    /**
     * @event
     * @name Element#disable
     * @description Fired when the Element gets disabled
     */

    /**
     * @event
     * @name Element#hide
     * @description Fired when the Element gets hidden
     */

    /**
     * @event
     * @name Element#hideToRoot
     * @description Fired when the Element or any of its parent get hidden
     */

    /**
     * @event
     * @name Element#show
     * @description Fired when the Element stops being hidden
     */

    /**
     * @event
     * @name Element#showToRoot
     * @description Fired when the Element and all of its parents become visible
     */

    /**
     * @event
     * @name Element#readOnly
     * @param {boolean} readOnly - Whether the Element is now read only
     * @description Fired when the readOnly property of an Element changes
     */

    /**
     * @event
     * @name Element#parent
     * @description Fired when the Element's parent gets set
     * @param {Element} parent - The new parent
     */

    /**
     * @event
     * @name Element#click
     * @description Fired when the mouse is clicked on the Element but only if the Element is enabled.
     * @param {Event} evt - The native mouse event.
     */

    /**
     * @event
     * @name Element#hover
     * @description Fired when the mouse starts hovering on the Element
     * @param {Event} evt - The native mouse event.
     */

    /**
     * @event
     * @name Element#hoverend
     * @description Fired when the mouse stops hovering on the Element
     * @param {Event} evt - The native mouse event.
     */

    /**
     * @event
     * @name Element#destroy
     * @description Fired after the element has been destroyed.
     * @param {HTMLElement} dom - The DOM element
     * @param {Element} element - The element
     */

    /**
     * @event
     * @name Element#hoverend
     * @description Fired when the mouse stops hovering on the Element
     * @param {Event} evt - The native mouse event.
     */

    /**
     * @name Element
     * @class
     * @classdesc The base class for all UI elements.
     * @augments Events
     * @property {boolean} enabled=true Gets / sets whether the Element or its parent chain is enabled or not. Defaults to true.
     * @property {HTMLElement} dom Gets the root DOM node for this Element.
     * @property {Element} parent Gets the parent Element.
     * @property {boolean} hidden Gets / sets whether the Element is hidden.
     * @property {boolean} hiddenToRoot Gets whether the Element is hidden all the way up to the root. If the Element itself or any of its parents are hidden then this is true.
     * @property {boolean} readOnly Gets / sets whether the Element is read only.
     * @property {boolean} ignoreParent Gets / sets whether the Element will ignore parent events & variable states.
     * @property {number} [width=null] Gets / sets the width of the Element in pixels. Can also be an empty string to remove it.
     * @property {number} [height=null] Gets / sets the height of the Element in pixels. Can also be an empty string to remove it.
     * @property {number} tabIndex Gets / sets the tabIndex of the Element.
     * @property {boolean} error Gets / sets whether the Element is in an error state.
     * @property {BindingBase} binding Gets / sets the Binding object for the element.
     * @property {CSSStyleDeclaration} style Shortcut to pcui.Element.dom.style.
     * @property {DOMTokenList} class Shortcut to pcui.Element.dom.classList.
     */
    class Element extends observer.Events {
        /**
         * Creates a new Element.
         *
         * @param {HTMLElement} dom - The DOM element that this pcui.Element wraps.
         * @param {object} args - The arguments. All settable properties can also be set through the constructor.
         * @param {string} [args.id] - The desired id for the Element HTML node.
         * @param {string|string[]} [args.class] - The CSS class or classes we want to add to the element.
         * @param {boolean} [args.isRoot] - If true then this is the root element. Set this to true for the topmost Element in your page.
         */
        constructor(dom, args) {
            super();

            if (!args) args = {};

            this._destroyed = false;
            this._parent = null;

            this._domEventClick = this._onClick.bind(this);
            this._domEventMouseOver = this._onMouseOver.bind(this);
            this._domEventMouseOut = this._onMouseOut.bind(this);
            this._eventsParent = [];

            this._dom = dom || args.dom || document.createElement('div');

            if (args.id !== undefined) {
                this._dom.id = args.id;
            }

            // add ui reference
            this._dom.ui = this;

            // add event listeners
            this._dom.addEventListener('click', this._domEventClick);
            this._dom.addEventListener('mouseover', this._domEventMouseOver);
            this._dom.addEventListener('mouseout', this._domEventMouseOut);

            // add element class
            this._dom.classList.add(CLASS_ELEMENT);

            // add font regular class
            this._dom.classList.add(FONT_REGULAR);

            // add user classes
            if (args.class) {
                if (Array.isArray(args.class)) {
                    for (let i = 0; i < args.class.length; i++) {
                        this._dom.classList.add(args.class[i]);
                    }
                } else {
                    this._dom.classList.add(args.class);
                }
            }

            this.enabled = args.enabled !== undefined ? args.enabled : true;
            this._hiddenParents = !args.isRoot;
            this.hidden = args.hidden || false;
            this.readOnly = args.readOnly || false;
            this.ignoreParent = args.ignoreParent || false;

            if (args.width !== undefined) {
                this.width = args.width;
            }
            if (args.height !== undefined) {
                this.height = args.height;
            }
            if (args.tabIndex !== undefined) {
                this.tabIndex = args.tabIndex;
            }

            // copy CSS properties from args
            for (const key in args) {
                if (args[key] === undefined) continue;
                if (SIMPLE_CSS_PROPERTIES.indexOf(key) !== -1) {
                    this[key] = args[key];
                }
            }

            // set the binding object
            if (args.binding) {
                this.binding = args.binding;
            }

            this._flashTimeout = null;
        }

        /**
         * @name Element#link
         * @description Links the specified observers and paths to the Element's data binding.
         * @param {Observer|Observer[]} observers - An array of observers or a single observer.
         * @param {string|string[]} paths - A path for the observer(s) or an array of paths that maps to each separate observer.
         */
        link(observers, paths) {
            if (this._binding) {
                this._binding.link(observers, paths);
            }
        }


        /**
         * @name Element#unlink
         * @description Unlinks the Element from its observers
         */
        unlink() {
            if (this._binding) {
                this._binding.unlink();
            }
        }

        /**
         * @name Element#flash
         * @description Triggers a flash animation on the Element.
         */
        flash() {
            if (this._flashTimeout) return;

            this.classAdd(FLASH);
            this._flashTimeout = setTimeout(function () {
                this._flashTimeout = null;
                this.classRemove(FLASH);
            }.bind(this), 200);
        }

        _onClick(evt) {
            if (this.enabled) {
                this.emit('click', evt);
            }
        }

        _onMouseOver(evt) {
            this.emit('hover', evt);
        }

        _onMouseOut(evt) {
            this.emit('hoverend', evt);
        }

        _onHiddenToRootChange(hiddenToRoot) {
            if (hiddenToRoot) {
                this.emit('hideToRoot');
            } else {
                this.emit('showToRoot');
            }
        }

        _onEnabledChange(enabled) {
            if (enabled) {
                this.classRemove(DISABLED);
            } else {
                this.classAdd(DISABLED);
            }

            this.emit(enabled ? 'enable' : 'disable');
        }

        _onParentDestroy() {
            this.destroy();
        }

        _onParentDisable() {
            if (this._ignoreParent) return;
            if (this._enabled) {
                this._onEnabledChange(false);
            }
        }

        _onParentEnable() {
            if (this._ignoreParent) return;
            if (this._enabled) {
                this._onEnabledChange(true);
            }
        }

        _onParentShowToRoot() {
            const oldHiddenToRoot = this.hiddenToRoot;
            this._hiddenParents = false;
            if (oldHiddenToRoot !== this.hiddenToRoot) {
                this._onHiddenToRootChange(this.hiddenToRoot);
            }
        }

        _onParentHideToRoot() {
            const oldHiddenToRoot = this.hiddenToRoot;
            this._hiddenParents = true;
            if (oldHiddenToRoot !== this.hiddenToRoot) {
                this._onHiddenToRootChange(this.hiddenToRoot);
            }
        }

        _onReadOnlyChange(readOnly) {
            if (readOnly) {
                this.classAdd(READONLY);
            } else {
                this.classRemove(READONLY);
            }

            this.emit('readOnly', readOnly);
        }

        _onParentReadOnlyChange(readOnly) {
            if (this._ignoreParent) return;
            if (readOnly) {
                if (!this._readOnly) {
                    this._onReadOnlyChange(true);
                }
            } else {
                if (!this._readOnly) {
                    this._onReadOnlyChange(false);
                }
            }

        }

        /**
         * @name Element#classAdd
         * @description Adds the specified class to the DOM element but checks if the classList contains it first.
         * @param {string} cls - The class to add
         */
        classAdd(cls) {
            var classList = this._dom.classList;
            if (!classList.contains(cls)) {
                classList.add(cls);
            }
        }

        /**
         * @name Element#classRemove
         * @description Removes the specified class from the DOM element but checks if the classList contains it first.
         * @param {string} cls - The class to remove
         */
        classRemove(cls) {
            var classList = this._dom.classList;
            if (classList.contains(cls)) {
                classList.remove(cls);
            }
        }

        /**
         * @name Element#destroy
         * @description Destroys the Element and its events.
         */
        destroy() {
            if (this._destroyed) return;

            this._destroyed = true;

            if (this.binding) {
                this.binding = null;
            } else {
                this.unlink();
            }

            if (this.parent) {
                const parent = this.parent;

                for (let i = 0; i < this._eventsParent.length; i++) {
                    this._eventsParent[i].unbind();
                }
                this._eventsParent.length = 0;


                // remove element from parent
                // check if parent has been destroyed already
                // because we do not want to be emitting events
                // on a destroyed parent after it's been destroyed
                // as it is easy to lead to null exceptions
                if (parent.remove && !parent._destroyed) {
                    parent.remove(this);
                }

                // set parent to null and remove from
                // parent dom just in case parent.remove above
                // didn't work because of an override or other condition
                this._parent = null;

                // Do not manually call removeChild for elements whose parent has already been destroyed.
                // For example when we destroy a TreeViewItem that has many child nodes, that will trigger every child Element to call dom.parentElement.removeChild(dom).
                // But we don't need to remove all these DOM elements from their parents since the root DOM element is destroyed anyway.
                // This has a big impact on destroy speed in certain cases.
                if (!parent._destroyed && this._dom && this._dom.parentElement) {
                    this._dom.parentElement.removeChild(this._dom);
                }

            }

            const dom = this._dom;
            if (dom) {
                // remove event listeners
                dom.removeEventListener('click', this._domEventClick);
                dom.removeEventListener('mouseover', this._domEventMouseOver);
                dom.removeEventListener('mouseout', this._domEventMouseOut);

                // remove ui reference
                delete dom.ui;

                this._dom = null;
            }

            this._domEventClick = null;
            this._domEventMouseOver = null;
            this._domEventMouseOut = null;

            if (this._flashTimeout) {
                clearTimeout(this._flashTimeout);
            }

            this.emit('destroy', dom, this);

            this.unbind();
        }

        /**
         * @static
         * @param {string} type - The type we want to reference this Element by
         * @param {object} cls - The actual class of the Element
         * @param {object} [defaultArguments] - Default arguments when creating this type
         */
        static register(type, cls, defaultArguments) {
            ELEMENT_REGISTRY[type] = { cls, defaultArguments };
        }

        /**
         * @static
         * @param {string} type - The type we want to unregister
         */
        static unregister(type) {
            delete ELEMENT_REGISTRY[type];
        }

        /**
         * @static
         * @param {string} type - The type of the Element (registered by pcui.Element#register)
         * @param {object} args - Arguments for the Element
         * @returns {Element} A new pcui.Element of the desired type
         */
        static create(type, args) {
            const entry = ELEMENT_REGISTRY[type];
            if (!entry) {
                console.error('Invalid type passed to pcui.Element#create', type);
                return;
            }

            const cls = entry.cls;
            const clsArgs = {};

            if (entry.defaultArguments) {
                Object.assign(clsArgs, entry.defaultArguments);
            }
            if (args) {
                Object.assign(clsArgs, args);
            }

            return new cls(clsArgs);
        }

        get enabled() {
            if (this._ignoreParent) return this._enabled;
            return this._enabled && (!this._parent || this._parent.enabled);
        }

        set enabled(value) {
            if (this._enabled === value) return;

            // remember if enabled in hierarchy
            const enabled = this.enabled;

            this._enabled = value;

            // only fire event if hierarchy state changed
            if (enabled !== value) {
                this._onEnabledChange(value);
            }
        }

        get ignoreParent() {
            return this._ignoreParent;
        }

        set ignoreParent(value) {
            this._ignoreParent = value;
            this._onEnabledChange(this.enabled);
            this._onReadOnlyChange(this.readOnly);
        }

        get dom() {
            return this._dom;
        }

        get parent() {
            return this._parent;
        }

        set parent(value) {
            if (value === this._parent) return;

            const oldEnabled = this.enabled;
            const oldReadonly = this.readOnly;
            const oldHiddenToRoot = this.hiddenToRoot;

            if (this._parent) {
                for (let i = 0; i < this._eventsParent.length; i++) {
                    this._eventsParent[i].unbind();
                }
                this._eventsParent.length = 0;
            }

            this._parent = value;

            if (this._parent) {
                this._eventsParent.push(this._parent.once('destroy', this._onParentDestroy.bind(this)));
                this._eventsParent.push(this._parent.on('disable', this._onParentDisable.bind(this)));
                this._eventsParent.push(this._parent.on('enable', this._onParentEnable.bind(this)));
                this._eventsParent.push(this._parent.on('readOnly', this._onParentReadOnlyChange.bind(this)));
                this._eventsParent.push(this._parent.on('showToRoot', this._onParentShowToRoot.bind(this)));
                this._eventsParent.push(this._parent.on('hideToRoot', this._onParentHideToRoot.bind(this)));

                this._hiddenParents = this._parent.hiddenToRoot;
            } else {
                this._hiddenParents = true;
            }

            this.emit('parent', this._parent);

            const newEnabled = this.enabled;
            if (newEnabled !== oldEnabled) {
                this._onEnabledChange(newEnabled);
            }

            const newReadonly = this.readOnly;
            if (newReadonly !== oldReadonly) {
                this._onReadOnlyChange(newReadonly);
            }

            const hiddenToRoot = this.hiddenToRoot;
            if (hiddenToRoot !== oldHiddenToRoot) {
                this._onHiddenToRootChange(hiddenToRoot);
            }
        }

        get hidden() {
            return this._hidden;
        }

        set hidden(value) {
            if (value === this._hidden) return;

            const oldHiddenToRoot = this.hiddenToRoot;

            this._hidden = value;

            if (value) {
                this.classAdd(HIDDEN);
            } else {
                this.classRemove(HIDDEN);
            }

            this.emit(value ? 'hide' : 'show');

            if (this.hiddenToRoot !== oldHiddenToRoot) {
                this._onHiddenToRootChange(this.hiddenToRoot);
            }
        }

        get hiddenToRoot() {
            return this._hidden || this._hiddenParents;
        }

        get readOnly() {
            if (this._ignoreParent) return this._readOnly;
            return this._readOnly || !!(this._parent && this._parent.readOnly);
        }

        set readOnly(value) {
            if (this._readOnly === value) return;
            this._readOnly = value;

            this._onReadOnlyChange(value);
        }

        get error() {
            return this._hasError;
        }

        set error(value) {
            if (this._hasError === value) return;
            this._hasError = value;
            if (value) {
                this.classAdd(ERROR);
            } else {
                this.classRemove(ERROR);
            }
        }

        get style() {
            return this._dom.style;
        }

        get class() {
            return this._dom.classList;
        }

        get width() {
            return this._dom.clientWidth;
        }

        set width(value) {
            if (typeof value === 'number') {
                value += 'px';
            }
            this.style.width = value;
        }

        get height() {
            return this._dom.clientHeight;
        }

        set height(value) {
            if (typeof value === 'number') {
                value += 'px';
            }
            this.style.height = value;
        }

        get tabIndex() {
            return this._dom.tabIndex;
        }

        set tabIndex(value) {
            this._dom.tabIndex = value;
        }

        get binding() {
            return this._binding;
        }

        set binding(value) {
            if (this._binding === value) return;

            let prevObservers;
            let prevPaths;

            if (this._binding) {
                prevObservers = this._binding.observers;
                prevPaths = this._binding.paths;

                this.unlink();
                this._binding.element = null;
                this._binding = null;
            }

            this._binding = value;

            if (this._binding) {
                this._binding.element = this;
                if (prevObservers && prevPaths) {
                    this.link(prevObservers, prevPaths);
                }
            }
        }

        get destroyed() {
            return this._destroyed;
        }

        /*  Backwards Compatibility */
        // we should remove those after we migrate
        get disabled() {
            return !this.enabled;
        }

        set disabled(value) {
            this.enabled = !value;
        }

        get element() {
            return this.dom;
        }

        set element(value) {
            this.dom = value;
        }

        get innerElement() {
            return this.domContent;
        }

        set innerElement(value) {
            this.domContent = value;
        }
    }

    // utility function to expose a CSS property
    // via an Element.prototype property
    function exposeCssProperty(name) {
        Object.defineProperty(Element.prototype, name, {
            get: function () {
                return this.style[name];
            },
            set: function (value) {
                this.style[name] = value;
            }
        });
    }

    // expose rest of CSS properties
    SIMPLE_CSS_PROPERTIES.forEach(exposeCssProperty);

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont, .pcui-text-input.pcui-multiple-values:before, .pcui-text-input > input {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-text-input {\n  display: inline-block;\n  border: 1px solid #293538;\n  border-radius: 2px;\n  box-sizing: border-box;\n  margin: 6px;\n  min-height: 24px;\n  height: 24px;\n  background-color: #2c393c;\n  vertical-align: top;\n  transition: color 100ms, background-color 100ms, box-shadow 100ms;\n  position: relative;\n  color: #b1b8ba;\n}\n.pcui-text-input > input {\n  height: 100%;\n  width: calc(100% - 16px);\n  padding: 0 6px;\n  line-height: 1;\n  color: inherit;\n  background: transparent;\n  border: none;\n  outline: none;\n  box-shadow: none;\n}\n.pcui-text-input:before {\n  color: inherit;\n}\n\n.pcui-text-input.pcui-multiple-values:before {\n  position: absolute;\n  padding: 0 8px;\n  content: \"...\";\n  white-space: nowrap;\n  top: 5px;\n  font-size: 12px;\n}\n\n.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly):hover {\n  background-color: #293538;\n  color: #ffffff;\n}\n.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error):hover {\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-text-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus {\n  background-color: #20292b;\n  box-shadow: 0 0 0 1px rgba(255, 102, 0, 0.3);\n}\n\n.pcui-text-input.pcui-focus:after, .pcui-text-input.pcui-focus:before, .pcui-text-input:hover:after, .pcui-text-input:hover:before {\n  display: none;\n}\n\n.pcui-text-input.pcui-readonly {\n  background-color: rgba(44, 57, 60, 0.7);\n  border-color: transparent;\n}\n\n.pcui-text-input.pcui-disabled {\n  color: #5b7073;\n}\n\n.pcui-text-input.pcui-error {\n  color: #b1b8ba;\n  box-shadow: 0 0 0 1px #d34141;\n}\n\n.pcui-text-input[placeholder] {\n  position: relative;\n}\n.pcui-text-input[placeholder]:after {\n  content: attr(placeholder);\n  background-color: #2c393c;\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0 8px;\n  line-height: 22px;\n  font-size: 10px;\n  font-weight: 600;\n  white-space: nowrap;\n  color: #829193;\n  pointer-events: none;\n}");

    const CLASS_TEXT_INPUT = 'pcui-text-input';

    /**
     * @name TextInput
     * @class
     * @classdesc The TextInput is an input element of type text.
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     * @property {string} placeholder Gets / sets the placeholder label that appears on the right of the input.
     * @property {HTMLElement} input Gets the HTML input element.
     * @property {boolean} renderChanges If true then the TextInput will flash when its text changes.
     * @property {boolean} blurOnEnter=true Gets / sets whether pressing Enter will blur (unfocus) the field. Defaults to true.
     * @property {boolean} blurOnEscape=true Gets / sets whether pressing Escape will blur (unfocus) the field. Defaults to true.
     * @property {boolean} keyChange Gets / sets whether any key up event will cause a change event to be fired.} args
     * @property {Function} onValidate A function that validates the value that is entered into the input and returns true if it is valid or false otherwise.
     * If false then the input will be set in an error state and the value will not propagate to the binding.
     */
    class TextInput extends Element {
        /**
         * Creates a new TextInput.
         *
         * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
         */
        constructor(args) {
            if (!args) args = {};
            super(args.dom ? args.dom : document.createElement('div'), args);

            this.class.add(CLASS_TEXT_INPUT);

            let input = args.input;
            if (!input) {
                input = document.createElement('input');
                input.ui = this;
                input.type = 'text';
                input.tabIndex = 0;
            }
            this._domInput = input;

            this._domEvtChange = this._onInputChange.bind(this);
            this._domEvtFocus = this._onInputFocus.bind(this);
            this._domEvtBlur = this._onInputBlur.bind(this);
            this._domEvtKeyDown = this._onInputKeyDown.bind(this);
            this._domEvtKeyUp = this._onInputKeyUp.bind(this);
            this._domEvtCtxMenu = this._onInputCtxMenu.bind(this);

            this._domInput.addEventListener('change', this._domEvtChange);
            this._domInput.addEventListener('focus', this._domEvtFocus);
            this._domInput.addEventListener('blur', this._domEvtBlur);
            this._domInput.addEventListener('keydown', this._domEvtKeyDown);
            this._domInput.addEventListener('contextmenu', this._domEvtCtxMenu, false);
            this.dom.appendChild(this._domInput);

            this._suspendInputChangeEvt = false;

            if (args.value !== undefined) {
                this.value = args.value;
            }
            this.placeholder = args.placeholder || null;
            this.renderChanges = args.renderChanges || false;
            this.blurOnEnter = (args.blurOnEnter !== undefined ? args.blurOnEnter : true);
            this.blurOnEscape = (args.blurOnEscape !== undefined ? args.blurOnEscape : true);
            this.keyChange = args.keyChange || false;
            this._prevValue = null;

            if (args.onValidate) {
                this.onValidate = args.onValidate;
            }

            this.on('change', () => {
                if (this.renderChanges) {
                    this.flash();
                }
            });

            this.on('disable', this._updateInputReadOnly.bind(this));
            this.on('enable', this._updateInputReadOnly.bind(this));
            this.on('readOnly', this._updateInputReadOnly.bind(this));
            this._updateInputReadOnly();
        }

        _onInputChange(evt) {
            if (this._suspendInputChangeEvt) return;

            if (this._onValidate) {
                const error = !this._onValidate(this.value);
                this.error = error;
                if (error) {
                    return;
                }
            } else {
                this.error = false;
            }

            this.emit('change', this.value);

            if (this._binding) {
                this._binding.setValue(this.value);
            }
        }

        _onInputFocus(evt) {
            this.class.add(FOCUS);
            this.emit('focus', evt);
            this._prevValue = this.value;
        }

        _onInputBlur(evt) {
            this.class.remove(FOCUS);
            this.emit('blur', evt);
        }

        _onInputKeyDown(evt) {
            if (evt.keyCode === 13 && this.blurOnEnter) {
                // do not fire input change event on blur
                // if keyChange is true (because a change event)
                // will have already been fired before for the current
                // value
                this._suspendInputChangeEvt = this.keyChange;
                this._domInput.blur();
                this._suspendInputChangeEvt = false;
            } else if (evt.keyCode === 27) {
                this._suspendInputChangeEvt = true;
                const prev = this._domInput.value;
                this._domInput.value = this._prevValue;
                this._suspendInputChangeEvt = false;

                // manually fire change event
                if (this.keyChange && prev !== this._prevValue) {
                    this._onInputChange(evt);
                }

                if (this.blurOnEscape) {
                    this._domInput.blur();
                }
            }

            this.emit('keydown', evt);
        }

        _onInputKeyUp(evt) {
            if (evt.keyCode !== 27) {
                this._onInputChange(evt);
            }

            this.emit('keyup', evt);
        }

        _onInputCtxMenu(evt) {
            this._domInput.select();
        }

        _updateInputReadOnly() {
            const readOnly = !this.enabled || this.readOnly;
            if (readOnly) {
                this._domInput.setAttribute('readonly', true);
            } else {
                this._domInput.removeAttribute('readonly');
            }
        }

        _updateValue(value) {
            this.class.remove(MULTIPLE_VALUES);

            if (value && typeof (value) === 'object') {
                if (Array.isArray(value)) {
                    let isObject = false;
                    for (let i = 0; i < value.length; i++) {
                        if (value[i] && typeof value[i] === 'object') {
                            isObject = true;
                            break;
                        }
                    }

                    value = isObject ? '[Not available]' : value.map((val) => {
                        return val === null ? 'null' : val;
                    }).join(',');
                } else {
                    value = '[Not available]';
                }
            }

            if (value === this.value) return false;

            this._suspendInputChangeEvt = true;
            this._domInput.value = (value === null || value === undefined) ? '' : value;
            this._suspendInputChangeEvt = false;

            this.emit('change', value);

            return true;
        }

        /**
         * @name TextInput#focus
         * @description Focuses the Element.
         * @param {boolean} select - If true then this will also select the text after focusing.
         */
        focus(select) {
            this._domInput.focus();
            if (select) {
                this._domInput.select();
            }
        }

        /**
         * @name TextInput#blur
         * @description Blurs (unfocuses) the Element.
         */
        blur() {
            this._domInput.blur();
        }

        destroy() {
            if (this._destroyed) return;
            this._domInput.removeEventListener('change', this._domEvtChange);
            this._domInput.removeEventListener('focus', this._domEvtFocus);
            this._domInput.removeEventListener('blur', this._domEvtBlur);
            this._domInput.removeEventListener('keydown', this._domEvtKeyDown);
            this._domInput.removeEventListener('keyup', this._domEvtKeyUp);
            this._domInput.removeEventListener('contextmenu', this._domEvtCtxMenu);
            this._domInput = null;

            super.destroy();
        }

        get value() {
            return this._domInput.value;
        }

        set value(value) {
            const changed = this._updateValue(value);

            if (changed) {
                // reset error
                this.error = false;
            }

            if (changed && this._binding) {
                this._binding.setValue(value);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            let different = false;
            const value = values[0];
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== value) {
                    different = true;
                    break;
                }
            }

            if (different) {
                this._updateValue(null);
                this.class.add(MULTIPLE_VALUES);
            } else {
                this._updateValue(values[0]);
            }
        }

        get placeholder() {
            return this.dom.getAttribute('placeholder');
        }

        set placeholder(value) {
            if (value) {
                this.dom.setAttribute('placeholder', value);
            } else {
                this.dom.removeAttribute('placeholder');
            }
        }

        get keyChange() {
            return this._keyChange;
        }

        set keyChange(value) {
            if (this._keyChange === value) return;

            this._keyChange = value;
            if (value) {
                this._domInput.addEventListener('keyup', this._domEvtKeyUp);
            } else {
                this._domInput.removeEventListener('keyup', this._domEvtKeyUp);
            }
        }

        get input() {
            return this._domInput;
        }

        get onValidate() {
            return this._onValidate;
        }

        set onValidate(value) {
            this._onValidate = value;
        }
    }

    Element.register('string', TextInput, { renderChanges: true });

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont, .pcui-text-area-input > textarea {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-text-area-input {\n  min-height: 48px;\n  height: auto;\n}\n.pcui-text-area-input > textarea {\n  resize: none;\n  height: 100%;\n  width: calc(100% - 16px);\n  padding: 0 8px;\n  line-height: 22px;\n  color: inherit;\n  background: transparent;\n  border: none;\n  outline: none;\n  box-shadow: none;\n  min-height: 44px;\n  min-width: 172px;\n}\n\n.pcui-text-area-input.pcui-text-area-input-resizable-none > textarea {\n  resize: none;\n}\n\n.pcui-text-area-input.pcui-text-area-input-resizable-both > textarea {\n  resize: both;\n}\n\n.pcui-text-area-input.pcui-text-area-input-resizable-horizontal > textarea {\n  resize: horizontal;\n}\n\n.pcui-text-area-input.pcui-text-area-input-resizable-vertical > textarea {\n  resize: vertical;\n}");

    const CLASS_TEXT_AREA_INPUT = 'pcui-text-area-input';
    const CLASS_TEXT_AREA_INPUT_RESIZABLE = CLASS_TEXT_AREA_INPUT + '-resizable';
    const CLASS_TEXT_AREA_INPUT_RESIZABLE_NONE = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-none';
    const CLASS_TEXT_AREA_INPUT_RESIZABLE_BOTH = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-both';
    const CLASS_TEXT_AREA_INPUT_RESIZABLE_HORIZONTAL = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-horizontal';
    const CLASS_TEXT_AREA_INPUT_RESIZABLE_VERTICAL = CLASS_TEXT_AREA_INPUT_RESIZABLE + '-vertical';

    /**
     * @name TextAreaInput
     * @class
     * @classdesc The TextAreaInput wraps a textarea element. It has the same interface as pcui.TextInput.
     * @augments TextInput
     * @property {string} [resizable=none] Sets whether the size of the text area input can be modified by the user. Can be one of 'none', 'both', 'horizontal' or 'vertical'.
     */
    class TextAreaInput extends TextInput {
        /**
         * Creates a new TextAreaInput.
         *
         * @param {object} args - The arguments. Extends the pcui.TextInput constructor arguments.
         */
        constructor(args) {
            args = Object.assign({
                input: document.createElement('textarea')
            }, args);

            super(args);

            this.class.add(CLASS_TEXT_AREA_INPUT);
            switch (args.resizable) {
                case 'both':
                    this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_BOTH);
                    break;
                case 'horizontal':
                    this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_HORIZONTAL);
                    break;
                case 'vertical':
                    this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_VERTICAL);
                    break;
                case 'none':
                default:
                    this.class.add(CLASS_TEXT_AREA_INPUT_RESIZABLE_NONE);
                    break;
            }
        }

        _onInputKeyDown(evt) {
            if ((evt.keyCode === 27 && this.blurOnEscape) || (evt.keyCode === 13 && this.blurOnEnter && !evt.shiftKey)) {
                this._domInput.blur();
            }

            this.emit('keydown', evt);
        }
    }

    Element.register('text', TextAreaInput, { renderChanges: true });

    ___$insertStyle(".pcui-numeric-input-slider-control {\n  display: none;\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  right: 3px;\n  border: 2px solid #20292b;\n  background-color: #293538;\n  border-radius: 100px;\n  z-index: 9999;\n  transform: translateY(-50%);\n  top: 50%;\n  cursor: ew-resize;\n}\n\n.pcui-numeric-input-slider-control:after {\n  content: \"\\e408\";\n  font-size: 15px;\n  font-family: \"pc-icon\";\n  position: absolute;\n  left: -5px;\n  top: -5px;\n  transform: rotateZ(90deg);\n}\n\n.pcui-numeric-input-slider-control:hover {\n  opacity: 50%;\n  color: #b1b8ba;\n}\n\n.pcui-numeric-input-slider-control-active {\n  opacity: 100% !important;\n  color: #7f7 !important;\n}\n\n.pcui-numeric-input-slider-control-hidden {\n  display: none !important;\n}\n\n.pcui-numeric-input:hover .pcui-numeric-input-slider-control {\n  display: block;\n}\n\n.pcui-numeric-input.pcui-disabled:hover .pcui-numeric-input-slider-control {\n  display: none;\n}\n\n.pcui-numeric-input.pcui-disabled .pcui-numeric-input-slider-control, .pcui-numeric-input.pcui-readonly .pcui-numeric-input-slider-control {\n  display: none;\n}");

    const CLASS_NUMERIC_INPUT = 'pcui-numeric-input';
    const CLASS_NUMERIC_INPUT_SLIDER_CONTROL = CLASS_NUMERIC_INPUT + '-slider-control';
    const CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE = CLASS_NUMERIC_INPUT_SLIDER_CONTROL + '-active';
    const CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN = CLASS_NUMERIC_INPUT_SLIDER_CONTROL + '-hidden';

    const REGEX_COMMA = /,/g;

    /**
     * @name NumericInput
     * @class
     * @classdesc The NumericInput represents an input element that holds numbers.
     * @property {number} [min=0] Gets / sets the minimum value this field can take.
     * @property {number} [max=1] Gets / sets the maximum value this field can take.
     * @property {number} [precision=7] Gets / sets the maximum number of decimals a value can take.
     * @property {number} [step=0.01] Gets / sets the amount that the value will be increased or decreased when using the arrow keys. Holding Shift will use 10x the step.
     * @property {boolean} [hideSlider=true] Hide the input mouse drag slider.
     * @augments TextInput
     */
    class NumericInput extends TextInput {
        /**
         * Creates a new NumericInput.
         *
         * @param {object} args - The arguments. Extends the pcui.TextInput constructor arguments.
         * @param {boolean} [args.allowNull] - Gets / sets whether the value can be null. If not then it will be 0 instead of null.
         */
        constructor(args) {
            // make copy of args
            args = Object.assign({}, args);
            const value = args.value;
            // delete value because we want to set it after
            // the other arguments
            delete args.value;
            const renderChanges = args.renderChanges || false;
            delete args.renderChanges;

            super(args);

            this.class.add(CLASS_NUMERIC_INPUT);

            this._min = args.min !== undefined ? args.min : null;
            this._max = args.max !== undefined ? args.max : null;
            this._allowNull = args.allowNull || false;
            this._precision = Number.isFinite(args.precision) ? args.precision : 7;

            if (Number.isFinite(args.step)) {
                this._step = args.step;
            } else if (Number.isFinite(args.precision)) {
                this._step = 1 / Math.pow(10, args.precision);
            } else {
                this._step = 1;
            }

            this._oldValue = undefined;
            this.value = value;

            this._historyCombine = false;
            this._historyPostfix = null;
            this._sliderPrevValue = 0;

            this.renderChanges = renderChanges;

            this._domEvtPointerLock = null;
            this._domEvtSliderMouseDown = null;
            this._domEvtSliderMouseUp = null;
            this._domEvtMouseWheel = null;

            if (!args.hideSlider) {
                this._sliderControl = new Element();
                this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL);
                this.dom.append(this._sliderControl.dom);

                let sliderUsed = false;
                this._domEvtSliderMouseDown = () => {
                    this._sliderControl.dom.requestPointerLock();
                    this._sliderMovement = 0.0;
                    this._sliderPrevValue = this.value;
                    sliderUsed = true;
                    if (this.binding) {
                        this._historyCombine = this.binding.historyCombine;
                        this._historyPostfix = this.binding.historyPostfix;

                        this.binding.historyCombine = true;
                        this.binding.historyPostfix = `(${Date.now()})`;
                    }
                };

                this._domEvtSliderMouseUp = () => {
                    document.exitPointerLock();
                    if (!sliderUsed) return;
                    sliderUsed = false;
                    this.value = this._sliderPrevValue + this._sliderMovement;

                    if (this.binding) {
                        this.binding.historyCombine = this._historyCombine;
                        this.binding.historyPostfix = this._historyPostfix;

                        this._historyCombine = false;
                        this._historyPostfix = null;
                    }
                };

                this._domEvtPointerLock = this._pointerLockChangeAlert.bind(this);

                this._domEvtMouseWheel = this._updatePosition.bind(this);

                this._sliderControl.dom.addEventListener('mousedown', this._domEvtSliderMouseDown);
                this._sliderControl.dom.addEventListener('mouseup', this._domEvtSliderMouseUp);

                document.addEventListener('pointerlockchange', this._domEvtPointerLock, false);
                document.addEventListener('mozpointerlockchange', this._domEvtPointerLock, false);
            }
        }

        _updatePosition(evt) {
            let movement = 0;
            if (evt.constructor === WheelEvent) {
                movement = evt.deltaY;
            } else if (evt.constructor === MouseEvent) {
                movement = evt.movementX;
            }
            // move one step every 100 pixels
            this._sliderMovement += movement / 100 * this._step;
            this.value = this._sliderPrevValue + this._sliderMovement;
        }

        _onInputChange(evt) {
            // get the content of the input and pass it
            // through our value setter
            this.value = this._domInput.value;
        }

        _onInputKeyDown(evt) {
            if (!this.enabled || this.readOnly) return super._onInputKeyDown(evt);

            // increase / decrease value with arrow keys
            if (evt.keyCode === 38 || evt.keyCode === 40) {
                const inc = (evt.shiftKey ? 10 : 1) * (evt.keyCode === 40 ? -1 : 1);
                this.value += this.step * inc;
                return;
            }

            super._onInputKeyDown(evt);
        }

        _isScrolling() {
            if (!this._sliderControl) return false;
            return (document.pointerLockElement === this._sliderControl.dom ||
                document.mozPointerLockElement === this._sliderControl.dom);
        }

        _pointerLockChangeAlert() {
            if (this._isScrolling()) {
                this._sliderControl.dom.addEventListener("mousemove", this._domEvtMouseWheel, false);
                this._sliderControl.dom.addEventListener("wheel", this._domEvtMouseWheel, false);
                this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE);
            } else {
                this._sliderControl.dom.removeEventListener("mousemove", this._domEvtMouseWheel, false);
                this._sliderControl.dom.removeEventListener("wheel", this._domEvtMouseWheel, false);
                this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_ACTIVE);
            }
        }

        _normalizeValue(value) {
            try {
                if (typeof value === 'string') {
                    // replace commas with dots (for some international keyboards)
                    value = value.replace(REGEX_COMMA, '.');

                    // remove spaces
                    value = value.replace(/\s/g, '');

                    // sanitize input to only allow short mathematical expressions to be evaluated
                    value = value.match(/^[*/+\-0-9().]+$/);
                    if (value !== null && value[0].length < 20) {
                        var expression = value[0];
                        var operators = ['+', '-', '/', '*'];
                        operators.forEach((operator) => {
                            var expressionArr = expression.split(operator);
                            expressionArr.forEach((_, i) => {
                                expressionArr[i] = expressionArr[i].replace(/^0+/, '');
                            });
                            expression = expressionArr.join(operator);
                        });
                        // eslint-disable-next-line
                        value = Function('"use strict";return (' + expression + ')')();
                    }
                }
            } catch (error) {
                value = null;
            }

            if (value === null || isNaN(value)) {
                if (this._allowNull) {
                    return null;
                }

                value = 0;
            }

            // clamp between min max
            if (this.min !== null && value < this.min) {
                value = this.min;
            }
            if (this.max !== null && value > this.max) {
                value = this.max;
            }

            // fix precision
            if (this.precision !== null) {
                value = parseFloat(Number(value).toFixed(this.precision), 10);
            }

            return value;
        }

        _updateValue(value, force) {
            const different = (value !== this._oldValue || force);

            // always set the value to the input because
            // we always want it to show an actual number or nothing
            this._oldValue = value;
            this._domInput.value = value;

            this.class.remove(MULTIPLE_VALUES);

            if (different) {
                this.emit('change', value);
            }

            return different;
        }

        get value() {
            const val = super.value;
            return val !== '' ? parseFloat(val, 10) : null;
        }

        set value(value) {
            value = this._normalizeValue(value);

            const forceUpdate = this.class.contains(MULTIPLE_VALUES) && value === null && this._allowNull;
            const changed = this._updateValue(value, forceUpdate);

            if (changed && this.binding) {
                this.binding.setValue(value);
            }
            if (this._sliderControl) {
                this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            let different = false;
            const value = this._normalizeValue(values[0]);
            for (let i = 1; i < values.length; i++) {
                if (value !== this._normalizeValue(values[i])) {
                    different = true;
                    break;
                }
            }

            if (different) {
                this._updateValue(null);
                this.class.add(MULTIPLE_VALUES);
                if (this._sliderControl) {
                    this._sliderControl.class.add(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
                }
            } else {
                this._updateValue(value);
                if (this._sliderControl) {
                    this._sliderControl.class.remove(CLASS_NUMERIC_INPUT_SLIDER_CONTROL_HIDDEN);
                }
            }
        }

        get min() {
            return this._min;
        }

        set min(value) {
            if (this._min === value) return;
            this._min = value;

            // reset value
            if (this._min !== null) {
                this.value = this.value; // eslint-disable-line no-self-assign
            }
        }

        get max() {
            return this._max;
        }

        set max(value) {
            if (this._max === value) return;
            this._max = value;

            // reset value
            if (this._max !== null) {
                this.value = this.value; // eslint-disable-line no-self-assign
            }
        }

        get precision() {
            return this._precision;
        }

        set precision(value) {
            if (this._precision === value) return;
            this._precision = value;

            // reset value
            if (this._precision !== null) {
                this.value = this.value; // eslint-disable-line no-self-assign
            }
        }

        get step() {
            return this._step;
        }

        set step(value) {
            this._step = value;
        }

        destroy() {
            if (this.destroyed) return;

            if (this._domEvtSliderMouseDown) {
                this._sliderControl.dom.removeEventListener('mousedown', this._domEvtSliderMouseDown);
                this._sliderControl.dom.removeEventListener('mouseup', this._domEvtSliderMouseUp);
            }

            if (this._domEvtMouseWheel) {
                this._sliderControl.dom.removeEventListener("mousemove", this._domEvtMouseWheel, false);
                this._sliderControl.dom.removeEventListener("wheel", this._domEvtMouseWheel, false);
            }

            if (this._domEvtPointerLock) {
                document.removeEventListener('pointerlockchange', this._domEvtPointerLock, false);
                document.removeEventListener('mozpointerlockchange', this._domEvtPointerLock, false);
            }

            super.destroy();
        }
    }

    Element.register('number', NumericInput, { renderChanges: true });

    var utils = { };


    // utils.deepCopy
    utils.deepCopy = function deepCopy(data) {
        if (data == null || typeof (data) !== 'object')
            return data;

        if (data instanceof Array) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                arr[i] = deepCopy(data[i]);
            }
            return arr;
        }

        var obj = { };
        for (var key in data) {
            if (data.hasOwnProperty(key))
                obj[key] = deepCopy(data[key]);
        }
        return obj;

    };

    utils.isMobile = function () {
        return /Android/i.test(navigator.userAgent) ||
          /iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    /**
     * @name utils.implements
     * @description Adds properties and methods from the sourceClass
     * to the targetClass but only if properties with the same name do not
     * already exist in the targetClass.
     * @param {object} targetClass - The target class.
     * @param {object} sourceClass - The source class.
     * @example utils.implements(pcui.Container, pcui.IContainer);
     */
    utils.implements = function (targetClass, sourceClass) {
        var properties = Object.getOwnPropertyDescriptors(sourceClass.prototype);
        for (var key in properties) {
            if (targetClass.prototype.hasOwnProperty(key)) {
                delete properties[key];
            }
        }

        Object.defineProperties(targetClass.prototype, properties);
    };

    /**
     * @name utils.proxy
     * @description Creates new properties on the target class that get / set
     * the properties of the member.
     * @param {object} targetClass - The target class
     * @param {string} memberName - The name of the member of the target class that properties will be proxied to.
     * @param {string[]} properties - A list of properties to be proxied.
     * @example
     * utils.proxy(pcui.SliderInput, '_numericInput', ['max', 'min', 'placeholder']);
     */
    utils.proxy = function (targetClass, memberName, properties) {
        properties.forEach((property) => {
            Object.defineProperty(targetClass.prototype, property, {
                get: function () {
                    return this[memberName][property];
                },
                set: function (value) {
                    this[memberName][property] = value;
                }
            });
        });
    };

    // String.startsWith
    if (!String.prototype.startsWith) {
        // eslint-disable-next-line
        Object.defineProperty(String.prototype, 'startsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (str) {
                var that = this;
                var ceil = str.length;
                for (var i = 0; i < ceil; i++)
                    if (that[i] !== str[i]) return false;
                return true;
            }
        });
    }

    // String.endsWith polyfill
    if (!String.prototype.endsWith) {
        // eslint-disable-next-line
        Object.defineProperty(String.prototype, 'endsWith', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (str) {
                var that = this;
                for (var i = 0, ceil = str.length; i < ceil; i++)
                    if (that[i + that.length - ceil] !== str[i])
                        return false;
                return true;
            }
        });
    }

    // Appends query parameter to string (supposedly the string is a URL)
    // automatically figuring out if the separator should be ? or &.
    // Example: url.appendQuery('t=123').appendQuery('q=345');
    if (!String.prototype.appendQuery) {
        // eslint-disable-next-line
        Object.defineProperty(String.prototype, 'appendQuery', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: function (queryParameter) {
                var separator = this.indexOf('?') !== -1 ? '&' : '?';
                return this + separator + queryParameter;
            }
        });
    }

    utils.arrayEquals = function (lhs, rhs) {
        if (!lhs)
            return false;

        if (!rhs)
            return false;

        if (lhs.length !== rhs.length)
            return false;

        for (var i = 0, l = lhs.length; i < l; i++) {
            if (this[i] instanceof Array && rhs[i] instanceof Array) {
                if (!this[i].equals(rhs[i]))
                    return false;
            } else if (this[i] !== rhs[i]) {
                return false;
            }
        }
        return true;
    };

    // element.classList.add polyfill
    (function () {
        var dummy  = document.createElement('div'),
            dtp    = DOMTokenList.prototype,
            add    = dtp.add,
            rem    = dtp.remove;

        dummy.classList.add('class1', 'class2');

        // Older versions of the HTMLElement.classList spec didn't allow multiple
        // arguments, easy to test for
        if (!dummy.classList.contains('class2')) {
            dtp.add    = function () {
                Array.prototype.forEach.call(arguments, add.bind(this));
            };
            dtp.remove = function () {
                Array.prototype.forEach.call(arguments, rem.bind(this));
            };
        }
    })();

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect, .pcui-slider {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-slider {\n  display: inline-flex;\n  height: 24px;\n  margin: 6px;\n  align-items: center;\n}\n.pcui-slider > .pcui-numeric-input {\n  flex: 1;\n  margin-left: 0;\n}\n\n.pcui-slider-container {\n  flex: 3;\n}\n\n.pcui-slider-bar {\n  position: relative;\n  width: calc(100% - 18px);\n  height: 4px;\n  margin: 9px 8px;\n  background-color: #2c393c;\n  border: 1px solid #293538;\n}\n\n.pcui-slider-handle {\n  position: absolute;\n  top: -7px;\n  left: 0;\n  margin-left: -9px;\n  width: 8px;\n  height: 16px;\n  background-color: #5b7073;\n  border: 1px solid #293538;\n  transition: left 100ms ease;\n}\n.pcui-slider-handle:hover, .pcui-slider-handle:focus {\n  outline: none;\n}\n\n.pcui-slider-active {\n  cursor: ew-resize;\n}\n.pcui-slider-active .pcui-slider-bar {\n  border-color: #20292b;\n  background-color: #20292b;\n}\n.pcui-slider-active .pcui-slider-handle {\n  border-color: #20292b;\n  background-color: #ffffff;\n  transition: none;\n}\n\n.pcui-slider:not(.pcui-disabled):not(.pcui-readonly):hover {\n  cursor: pointer;\n}\n.pcui-slider:not(.pcui-disabled):not(.pcui-readonly) .pcui-slider-handle:focus, .pcui-slider:not(.pcui-disabled):not(.pcui-readonly) .pcui-slider-handle:hover {\n  cursor: ew-resize;\n  outline: none;\n  border-color: #20292b;\n  background-color: #ffffff;\n}\n\n.pcui-slider.pcui-readonly .pcui-numeric-input {\n  flex: 1;\n}\n.pcui-slider.pcui-readonly .pcui-slider-bar {\n  display: none;\n}\n\n.pcui-slider.pcui-multiple-values .pcui-slider-handle {\n  display: none;\n}");

    const CLASS_SLIDER = 'pcui-slider';
    const CLASS_SLIDER_CONTAINER = CLASS_SLIDER + '-container';
    const CLASS_SLIDER_BAR = CLASS_SLIDER + '-bar';
    const CLASS_SLIDER_HANDLE = CLASS_SLIDER + '-handle';
    const CLASS_SLIDER_ACTIVE = CLASS_SLIDER + '-active';

    const IS_CHROME = /Chrome\//.test(navigator.userAgent);

    // fields that are proxied between the slider and the numeric input
    const PROXY_FIELDS = [
        'allowNull',
        'max',
        'min',
        'keyChange',
        'placeholder',
        'precision',
        'renderChanges',
        'step'
    ];

    /**
     * @name SliderInput
     * @class
     * @classdesc The SliderInput shows a pcui.NumericInput and a slider widget next to it. It acts as a proxy
     * of the NumericInput.
     * @property {number} min=0 Gets / sets the minimum value that the numeric input field can take.
     * @property {number} max=1 Gets / sets the maximum value that the numeric input field can take.
     * @property {number} sliderMin=0 Gets / sets the minimum value that the slider field can take.
     * @property {number} sliderMax=1 Gets / sets the maximum value that the slider field can take.
     * @property {number} pre Gets / sets the maximum number of decimals a value can take.
     * @property {number} step Gets / sets the amount that the value will be increased or decreased when using the arrow keys. Holding Shift will use 10x the step.
     * @property {boolean} allowNull Gets / sets whether the value can be null. If not then it will be 0 instead of null.
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     */
    class SliderInput extends Element {
        /**
         * Creates a new SliderInput.
         *
         * @param {object} args - The arguments. Extends the pcui.NumericInput constructor arguments.
         */
        constructor(args) {
            args = Object.assign({}, args);

            const inputArgs = {};
            PROXY_FIELDS.forEach((field) => {
                inputArgs[field] = args[field];
            });

            if (inputArgs.precision === undefined) {
                inputArgs.precision = 2;
            }

            // binding should only go to the slider
            // and the slider will propagate changes to the numeric input
            delete inputArgs.binding;

            super(args.dom ? args.dom : document.createElement('div'), args);

            if (args.pre) this.precision = args.pre;

            this.class.add(CLASS_SLIDER);

            this._historyCombine = false;
            this._historyPostfix = null;

            this._numericInput = new NumericInput({ ...inputArgs, hideSlider: true });

            // propagate change event
            this._numericInput.on('change', this._onValueChange.bind(this));
            // propagate focus / blur events
            this._numericInput.on('focus', () => {
                this.emit('focus');
            });

            this._numericInput.on('blur', () => {
                this.emit('blur');
            });

            this._sliderMin = (args.sliderMin !== undefined ? args.sliderMin : this.min || 0);
            this._sliderMax = (args.sliderMax !== undefined ? args.sliderMax : this.max || 1);

            this.dom.appendChild(this._numericInput.dom);
            this._numericInput.parent = this;

            this._domSlider = document.createElement('div');
            this._domSlider.classList.add(CLASS_SLIDER_CONTAINER);
            this.dom.appendChild(this._domSlider);

            this._domBar = document.createElement('div');
            this._domBar.classList.add(CLASS_SLIDER_BAR);
            this._domBar.ui = this;
            this._domSlider.appendChild(this._domBar);

            this._domHandle = document.createElement('div');
            this._domHandle.ui = this;
            this._domHandle.tabIndex = 0;
            this._domHandle.classList.add(CLASS_SLIDER_HANDLE);
            this._domBar.appendChild(this._domHandle);
            this._cursorHandleOffset = 0;

            this._domMouseDown = this._onMouseDown.bind(this);
            this._domMouseMove = this._onMouseMove.bind(this);
            this._domMouseUp = this._onMouseUp.bind(this);
            this._domTouchStart = this._onTouchStart.bind(this);
            this._domTouchMove = this._onTouchMove.bind(this);
            this._domTouchEnd = this._onTouchEnd.bind(this);
            this._domKeyDown = this._onKeyDown.bind(this);

            this._touchId = null;

            this._domSlider.addEventListener('mousedown', this._domMouseDown);
            this._domSlider.addEventListener('touchstart', this._domTouchStart, { passive: true });
            this._domHandle.addEventListener('keydown', this._domKeyDown);

            if (args.value !== undefined) {
                this.value = args.value;
            }

            // update the handle in case a 0 value has been
            // passed through the constructor
            if (this.value === 0) {
                this._updateHandle(0);
            }
        }

        _onMouseDown(evt) {
            if (evt.button !== 0 || !this.enabled || this.readOnly) return;
            this._onSlideStart(evt.pageX);
        }

        _onMouseMove(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            this._onSlideMove(evt.pageX);
        }

        _onMouseUp(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            this._onSlideEnd(evt.pageX);
        }

        _onTouchStart(evt) {
            if (!this.enabled || this.readOnly) return;

            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];
                if (!touch.target.ui || touch.target.ui !== this)
                    continue;

                this._touchId = touch.identifier;
                this._onSlideStart(touch.pageX);
                break;
            }
        }

        _onTouchMove(evt) {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];

                if (touch.identifier !== this._touchId)
                    continue;

                evt.stopPropagation();
                evt.preventDefault();

                this._onSlideMove(touch.pageX);
                break;
            }
        }

        _onTouchEnd(evt) {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];

                if (touch.identifier !== this._touchId)
                    continue;

                evt.stopPropagation();
                evt.preventDefault();

                this._onSlideEnd(touch.pageX);
                this._touchId = null;
                break;
            }
        }

        _onKeyDown(evt) {
            if (evt.keyCode === 27) {
                this.blur();
                return;
            }

            if (!this.enabled || this.readOnly) return;

            // move slider with left / right arrow keys
            if (evt.keyCode !== 37 && evt.keyCode !== 39) return;

            evt.stopPropagation();
            evt.preventDefault();
            let x = evt.keyCode === 37 ? -1 : 1;
            if (evt.shiftKey) {
                x *= 10;
            }

            this.value += x * this.step;
        }

        _updateHandle(value) {
            const left = Math.max(0, Math.min(1, ((value || 0) - this._sliderMin) / (this._sliderMax - this._sliderMin))) * 100;
            const handleWidth = this._domHandle.getBoundingClientRect().width;
            this._domHandle.style.left = `calc(${left}% + ${handleWidth / 2}px)`;
        }

        _onValueChange(value) {
            this._updateHandle(value);
            this.emit('change', value);

            if (this._binding) {
                this._binding.setValue(value);
            }
        }

        // Calculates the distance in pixels between
        // the cursor x and the middle of the handle.
        // If the cursor is not on the handle sets the offset to 0
        _calculateCursorHandleOffset(pageX) {
            // not sure why but the left side needs a margin of a couple of pixels
            // to properly determine if the cursor is on the handle (in Chrome)
            const margin = IS_CHROME ? 2 : 0;
            const rect = this._domHandle.getBoundingClientRect();
            const left = rect.left - margin;
            const right = rect.right;
            if (pageX >= left && pageX <= right) {
                this._cursorHandleOffset = pageX - (left + (right - left) / 2);
            } else {
                this._cursorHandleOffset = 0;
            }

            return this._cursorHandleOffset;
        }

        _onSlideStart(pageX) {
            this._domHandle.focus();
            if (this._touchId === null) {
                window.addEventListener('mousemove', this._domMouseMove);
                window.addEventListener('mouseup', this._domMouseUp);
            } else {
                window.addEventListener('touchmove', this._domTouchMove);
                window.addEventListener('touchend', this._domTouchEnd);
            }

            this.class.add(CLASS_SLIDER_ACTIVE);

            // calculate the cursor - handle offset. If there is
            // an offset that means the cursor is on the handle so
            // do not move the handle until the cursor moves.
            if (!this._calculateCursorHandleOffset(pageX)) {
                this._onSlideMove(pageX);
            }

            if (this.binding) {
                this._historyCombine = this.binding.historyCombine;
                this._historyPostfix = this.binding.historyPostfix;

                this.binding.historyCombine = true;
                this.binding.historyPostfix = `(${Date.now()})`;
            }
        }

        _onSlideMove(pageX) {
            const rect = this._domBar.getBoundingClientRect();
            // reduce pageX by the initial cursor - handle offset
            pageX -= this._cursorHandleOffset;
            const x = Math.max(0, Math.min(1, (pageX - rect.left) / rect.width));

            const range = this._sliderMax - this._sliderMin;
            let value = (x * range) + this._sliderMin;
            value = parseFloat(value.toFixed(this.precision), 10);

            this.value = value;
        }

        _onSlideEnd(pageX) {
            // when slide ends only move the handle if the cursor is no longer
            // on the handle
            if (!this._calculateCursorHandleOffset(pageX)) {
                this._onSlideMove(pageX);
            }

            this.class.remove(CLASS_SLIDER_ACTIVE);

            if (this._touchId === null) {
                window.removeEventListener('mousemove', this._domMouseMove);
                window.removeEventListener('mouseup', this._domMouseUp);
            } else {
                window.removeEventListener('touchmove', this._domTouchMove);
                window.removeEventListener('touchend', this._domTouchEnd);
            }

            if (this.binding) {
                this.binding.historyCombine = this._historyCombine;
                this.binding.historyPostfix = this._historyPostfix;

                this._historyCombine = false;
                this._historyPostfix = null;
            }

        }

        focus() {
            this._numericInput.focus();
        }

        blur() {
            this._domHandle.blur();
            this._numericInput.blur();
        }

        destroy() {
            if (this._destroyed) return;
            this._domSlider.removeEventListener('mousedown', this._domMouseDown);
            this._domSlider.removeEventListener('touchstart', this._domTouchStart);

            this._domHandle.removeEventListener('keydown', this._domKeyDown);

            this.dom.removeEventListener('mouseup', this._domMouseUp);
            this.dom.removeEventListener('mousemove', this._domMouseMove);
            this.dom.removeEventListener('touchmove', this._domTouchMove);
            this.dom.removeEventListener('touchend', this._domTouchEnd);
            super.destroy();
        }

        get sliderMin() {
            return this._sliderMin;
        }

        set sliderMin(value) {
            if (this._sliderMin === value) return;

            this._sliderMin = value;
            this._updateHandle(this.value);
        }

        get sliderMax() {
            return this._sliderMax;
        }

        set sliderMax(value) {
            if (this._sliderMax === value) return;

            this._sliderMax = value;
            this._updateHandle(this.value);
        }

        get value() {
            return this._numericInput.value;
        }

        set value(value) {
            this._numericInput.value = value;
            if (this._numericInput.class.contains(MULTIPLE_VALUES)) {
                this.class.add(MULTIPLE_VALUES);
            } else {
                this.class.remove(MULTIPLE_VALUES);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            this._numericInput.values = values;
            if (this._numericInput.class.contains(MULTIPLE_VALUES)) {
                this.class.add(MULTIPLE_VALUES);
            } else {
                this.class.remove(MULTIPLE_VALUES);
            }
        }
    }

    utils.proxy(SliderInput, '_numericInput', PROXY_FIELDS);

    Element.register('slider', SliderInput, { renderChanges: true });

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-vector-input {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-vector-input:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-vector-input {\n  flex-direction: row;\n  align-items: center;\n}\n.pcui-vector-input > .pcui-numeric-input {\n  flex: 1;\n  margin: 6px 3px;\n}\n.pcui-vector-input > .pcui-numeric-input:first-child {\n  margin-left: 0;\n}\n.pcui-vector-input > .pcui-numeric-input:last-child {\n  margin-right: 0;\n}");

    const CLASS_VECTOR_INPUT = 'pcui-vector-input';

    /**
     * @name VectorInput
     * @class
     * @classdesc A vector input
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     */
    class VectorInput extends Element {
        /**
         * Creates a new pcui.VectorInput.
         *
         * @param {object} args - The arguments.
         * @param {number} [args.dimensions=3] - The number of dimensions in the vector. Can be between 2 to 4. Defaults to 3.
         * @param {number} [args.min] - The minimum value for each vector element.
         * @param {number} [args.max] - The maximum value for each vector element.
         * @param {number} [args.precision] - The decimal precision for each vector element.
         * @param {number} [args.step] - The incremental step when using arrow keys for each vector element.
         * @param {boolean} [args.renderChanges] - If true each vector element will flash on changes.
         * @param {string[]|string} [args.placeholder] - The placeholder string for each vector element.
         */
        constructor(args) {
            args = Object.assign({}, args);

            // set binding after inputs have been created
            const binding = args.binding;
            delete args.binding;

            super(args.dom ? args.dom : document.createElement('div'), args);

            this.class.add(CLASS_VECTOR_INPUT);

            const dimensions = Math.max(2, Math.min(4, args.dimensions || 3));

            const onInputChange = this._onInputChange.bind(this);
            this._inputs = new Array(dimensions);
            for (let i = 0; i < this._inputs.length; i++) {
                this._inputs[i] = new NumericInput({
                    min: args.min,
                    max: args.max,
                    precision: args.precision,
                    step: args.step,
                    renderChanges: args.renderChanges,
                    placeholder: args.placeholder ? (Array.isArray(args.placeholder) ? args.placeholder[i] : args.placeholder) : null
                });
                this._inputs[i].on('change', onInputChange);
                this._inputs[i].on('focus', () => {
                    this.emit('focus');
                });
                this._inputs[i].on('blur', () => {
                    this.emit('blur');
                });
                this.dom.appendChild(this._inputs[i].dom);
                this._inputs[i].parent = this;
            }

            // set the binding after the inputs have been created
            // because we rely on them in the overriden setter
            if (binding) {
                this.binding = binding;
            }

            this._applyingChange = false;

            if (args.value !== undefined) {
                this.value = args.value;
            }

        }

        _onInputChange() {
            if (this._applyingChange) return;

            // check if any of our inputs have the multiple_values class
            // and if so inherit it for us as well
            let showingMultipleValues = false;
            for (let i = 0; i < this._inputs.length; i++) {
                if (this._inputs[i].class.contains(MULTIPLE_VALUES)) {
                    showingMultipleValues = true;
                    break;
                }
            }

            if (showingMultipleValues) {
                this.class.add(MULTIPLE_VALUES);
            } else {
                this.class.remove(MULTIPLE_VALUES);
            }

            this.emit('change', this.value);
        }

        _updateValue(value) {
            this.class.remove(MULTIPLE_VALUES);

            if (JSON.stringify(this.value) === JSON.stringify(value)) return false;

            this._applyingChange = true;

            for (let i = 0; i < this._inputs.length; i++) {
                // disable binding for each individual input when we use
                // the 'value' setter for the whole vector value. That is because
                // we do not want the individual inputs to emit their own binding events
                // since we are setting the whole vector value here
                const binding = this._inputs[i].binding;
                let applyingChange = false;
                if (binding) {
                    applyingChange = binding.applyingChange;
                    binding.applyingChange = true;
                }
                this._inputs[i].value = (value && value[i] !== undefined ? value[i] : null);
                if (binding) {
                    binding.applyingChange = applyingChange;
                }
            }

            this.emit('change', this.value);

            this._applyingChange = false;

            return true;
        }

        link(observers, paths) {
            super.link(observers, paths);
            observers = Array.isArray(observers) ? observers : [observers];
            paths = Array.isArray(paths) ? paths : [paths];

            const useSinglePath = paths.length === 1 || observers.length !== paths.length;
            if (useSinglePath) {
                for (let i = 0; i < this._inputs.length; i++) {
                    // link observers to path.i for each dimension
                    this._inputs[i].link(observers, paths[0] + `.${i}`);
                }
            } else {
                for (let i = 0; i < this._inputs.length; i++) {
                    // link observers to paths[i].i for each dimension
                    this._inputs[i].link(observers, paths.map(path => `${path}.${i}`));
                }

            }
        }

        unlink() {
            super.unlink();
            for (let i = 0; i < this._inputs.length; i++) {
                this._inputs[i].unlink();
            }
        }

        focus() {
            this._inputs[0].focus();
        }

        blur() {
            for (let i = 0; i < this._inputs.length; i++) {
                this._inputs[i].blur();
            }
        }

        get value() {
            const value = new Array(this._inputs.length);
            for (let i = 0; i < this._inputs.length; i++) {
                value[i] = this._inputs[i].value;
            }

            return value;
        }

        set value(value) {
            if (typeof value === 'string') {
                try {
                    // try to parse the string
                    value = JSON.parse(value);
                    // if the string could be converted to an array but some of it's values aren't numbers
                    // then use a default array also
                    if (Array.isArray(value) && value.some(i => !Number.isFinite(i))) {
                        throw new Error('VectorInput value set to string which doesn\'t contain an array of numbers');
                    }
                } catch (e) {
                    console.error(e);
                    value = [];
                }
            }
            if (!Array.isArray(value)) {
                value = [];
            }

            const changed = this._updateValue(value);

            if (changed && this._binding) {
                this._binding.setValue(value);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            // create an array for each dimension (e.g. one array for x one for y one for z)
            values = this._inputs.map((_, i) => values.map((arr) => {
                return arr ? arr[i] : undefined;
            }));

            this._inputs.forEach((input, i) => {
                input.values = values[i];
            });
        }

        // override binding setter to set a binding clone to
        // each input
        set binding(value) {
            super.binding = value;
            for (let i = 0; i < this._inputs.length; i++) {
                this._inputs[i].binding = (value ? value.clone() : null);
            }
        }

        // we have to override the getter too because
        // we have overriden the setter
        get binding() {
            return super.binding;
        }

        get placeholder() {
            return this._inputs.map(input => input.placeholder);
        }

        set placeholder(value) {
            for (let i = 0; i < this._inputs.length; i++) {
                this._inputs[i].placeholder = value[i] || value || null;
            }
        }

        get inputs() {
            return this._inputs.slice();
        }
    }

    // add proxied properties
    [
        'min',
        'max',
        'precision',
        'step',
        'renderChanges'
    ].forEach((property) => {
        Object.defineProperty(VectorInput.prototype, property, {
            get: function () {
                return this._inputs[0][property];
            },
            set: function (value) {
                for (let i = 0; i < this._inputs.length; i++) {
                    this._inputs[i][property] = value;
                }
            }
        });
    });

    Element.register('vec2', VectorInput, { dimensions: 2, renderChanges: true });
    Element.register('vec3', VectorInput, { dimensions: 3, renderChanges: true });
    Element.register('vec4', VectorInput, { dimensions: 4, renderChanges: true });

    ___$insertStyle("@charset \"UTF-8\";\n@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-boolean-input.pcui-boolean-input-ticked:after {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-boolean-input.pcui-boolean-input-ticked:after {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.pcui-boolean-input {\n  display: inline-block;\n  position: relative;\n  box-sizing: border-box;\n  background-color: #2c393c;\n  color: #fff;\n  width: 14px;\n  height: 14px;\n  line-height: 1;\n  overflow: hidden;\n  margin: 6px;\n  transition: opacity 100ms, background-color 100ms, box-shadow 100ms;\n}\n.pcui-boolean-input:focus {\n  outline: none;\n}\n\n.pcui-boolean-input.pcui-boolean-input-ticked {\n  background-color: #b1b8ba;\n}\n.pcui-boolean-input.pcui-boolean-input-ticked:after {\n  content: \"\\e372\";\n  color: #20292b;\n  background-color: inherit;\n  font-size: 19px;\n  display: block;\n  margin-top: -2px;\n  margin-left: -2px;\n}\n\n.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly):hover, .pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly):focus {\n  cursor: pointer;\n  background-color: #293538;\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:hover, .pcui-boolean-input:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:focus {\n  background-color: #b1b8ba;\n}\n\n.pcui-boolean-input.pcui-disabled {\n  opacity: 0.4;\n}\n\n.pcui-boolean-input.pcui-multiple-values:after {\n  position: absolute;\n  font-size: 17px;\n  font-weight: bold;\n  color: #b1b8ba;\n  left: 4px;\n  top: -3px;\n  content: \"-\";\n}\n\n.pcui-boolean-input-toggle {\n  display: inline-block;\n  position: relative;\n  width: 30px;\n  height: 16px;\n  border-radius: 8px;\n  flex-shrink: 0;\n  border: 1px solid #293538;\n  box-sizing: border-box;\n  background-color: #364346;\n  color: #fff;\n  line-height: 1;\n  overflow: hidden;\n  margin: 6px;\n  transition: opacity 100ms, background-color 100ms, box-shadow 100ms;\n}\n.pcui-boolean-input-toggle:focus {\n  outline: none;\n}\n.pcui-boolean-input-toggle:after {\n  content: \" \";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background-color: #5b7073;\n  transition: left 100ms ease, background-color 100ms ease;\n}\n\n.pcui-boolean-input-toggle.pcui-boolean-input-ticked {\n  border-color: #293538;\n}\n.pcui-boolean-input-toggle.pcui-boolean-input-ticked:after {\n  left: 15px;\n  background-color: #69b875;\n}\n\n.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):hover, .pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):focus {\n  cursor: pointer;\n  border-color: #20292b;\n  background-color: #20292b;\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):hover:after, .pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly):focus:after {\n  background-color: #d34141;\n}\n.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:hover, .pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:focus {\n  border-color: #20292b;\n  background-color: #20292b;\n}\n.pcui-boolean-input-toggle:not(.pcui-disabled):not(.pcui-readonly).pcui-boolean-input-ticked:after {\n  background-color: #7f7;\n}\n\n.pcui-boolean-input-toggle.pcui-readonly {\n  opacity: 0.7;\n}\n\n.pcui-boolean-input-toggle.pcui-disabled {\n  opacity: 0.4;\n}\n\n.pcui-boolean-input-toggle.pcui-multiple-values:after {\n  left: 8px;\n  background-color: rgba(155, 161, 163, 0.25);\n}");

    const CLASS_BOOLEAN_INPUT = 'pcui-boolean-input';
    const CLASS_BOOLEAN_INPUT_TICKED = CLASS_BOOLEAN_INPUT + '-ticked';
    const CLASS_BOOLEAN_INPUT_TOGGLE = CLASS_BOOLEAN_INPUT + '-toggle';

    /**
     * @name BooleanInput
     * @class
     * @classdesc A checkbox element.
     * @property {boolean} renderChanges If true the input will flash when changed.
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     */
    class BooleanInput extends Element {
        /**
         * Creates a new pcui.BooleanInput.
         *
         * @param {object} args - The arguments.
         * @param {string} [args.type] - The type of checkbox currently can be null or 'toggle'.
         */
        constructor(args) {
            args = Object.assign({
                tabIndex: 0
            }, args);

            super(args.dom ? args.dom : document.createElement('div'), args);

            if (args.type === 'toggle') {
                this.class.add(CLASS_BOOLEAN_INPUT_TOGGLE);
            } else {
                this.class.add(CLASS_BOOLEAN_INPUT);
            }
            this.class.add(NOT_FLEXIBLE);

            this._domEventKeyDown = this._onKeyDown.bind(this);
            this._domEventFocus = this._onFocus.bind(this);
            this._domEventBlur = this._onBlur.bind(this);

            this.dom.addEventListener('keydown', this._domEventKeyDown);
            this.dom.addEventListener('focus', this._domEventFocus);
            this.dom.addEventListener('blur', this._domEventBlur);

            this._value = null;
            if (args.value !== undefined) {
                this.value = args.value;
            }

            this.renderChanges = args.renderChanges;
        }

        _onClick(evt) {
            if (this.enabled) {
                this.focus();
            }

            if (this.enabled && !this.readOnly) {
                this.value = !this.value;
            }

            return super._onClick(evt);
        }

        _onKeyDown(evt) {
            if (evt.keyCode === 27) {
                this.blur();
                return;
            }

            if (!this.enabled || this.readOnly) return;

            if (evt.keyCode === 32) {
                evt.stopPropagation();
                evt.preventDefault();
                this.value = !this.value;
            }
        }

        _onFocus() {
            this.emit('focus');
        }

        _onBlur() {
            this.emit('blur');
        }

        _updateValue(value) {
            this.class.remove(MULTIPLE_VALUES);

            if (value === this.value) return false;

            this._value = value;

            if (value) {
                this.class.add(CLASS_BOOLEAN_INPUT_TICKED);
            } else {
                this.class.remove(CLASS_BOOLEAN_INPUT_TICKED);
            }

            if (this.renderChanges) {
                this.flash();
            }

            this.emit('change', value);

            return true;
        }

        focus() {
            this.dom.focus();
        }

        blur() {
            this.dom.blur();
        }

        destroy() {
            if (this._destroyed) return;

            this.dom.removeEventListener('keydown', this._domEventKeyDown);
            this.dom.removeEventListener('focus', this._domEventFocus);
            this.dom.removeEventListener('blur', this._domEventBlur);

            super.destroy();
        }

        get value() {
            return this._value;
        }

        set value(value) {
            const changed = this._updateValue(value);
            if (changed && this._binding) {
                this._binding.setValue(value);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            let different = false;
            const value = values[0];
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== value) {
                    different = true;
                    break;
                }
            }

            if (different) {
                this._updateValue(null);
                this.class.add(MULTIPLE_VALUES);
            } else {
                this._updateValue(values[0]);
            }
        }
    }

    Element.register('boolean', BooleanInput, { renderChanges: true });

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont, .pcui-label.pcui-multiple-values:before {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect, .pcui-label.pcui-selectable:hover {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-label {\n  display: inline-block;\n  box-sizing: border-box;\n  margin: 6px;\n  vertical-align: middle;\n  transition: opacity 100ms;\n  color: #b1b8ba;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  user-select: none;\n}\n\n.pcui-label.pcui-default-mousedown {\n  user-select: initial;\n}\n\n.pcui-label.pcui-multiple-values {\n  position: relative;\n  color: transparent;\n}\n.pcui-label.pcui-multiple-values:before {\n  content: \"...\";\n  color: #b1b8ba;\n  white-space: nowrap;\n  font-size: 12px;\n}\n\n.pcui-label.pcui-error {\n  color: #d34141;\n}\n\n.pcui-label.pcui-selectable:hover {\n  color: #f60;\n  text-decoration: underline;\n}\n\n.pcui-label[placeholder] {\n  position: relative;\n}\n.pcui-label[placeholder]:after {\n  content: attr(placeholder);\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0 8px;\n  color: #999;\n  pointer-events: none;\n}");

    const CLASS_LABEL = 'pcui-label';

    /**
     * @name Label
     * @class
     * @classdesc The Label is a simple span element that displays some text.
     * @property {string} placeholder Gets / sets the placeholder label that appears on the right of the label.
     * @property {string} text Gets / sets the text of the Label.
     * @property {boolean} renderChanges If true then the Label will flash when its text changes.
     * @augments Element
     * @mixes IBindable
     */
    class Label extends Element {
        /**
         * Creates a new Label.
         *
         * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
         * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
         * @param {boolean} [args.nativeTooltip] - If true then use the text of the label as the native HTML tooltip.
         * @param {boolean} [args.allowTextSelection] - If true then the label can be clicked to select text.
         */
        constructor(args) {
            if (!args) args = {};

            super(args.dom ? args.dom : document.createElement('span'), args);

            this.class.add(CLASS_LABEL);

            this._unsafe = args.unsafe || false;
            this.text = args.text || args.value || '';

            if (args.allowTextSelection) {
                this.class.add(DEFAULT_MOUSEDOWN);
            }

            if (args.nativeTooltip) {
                this.dom.title = this.text;
            }
            this.placeholder = args.placeholder || null;

            this.renderChanges = args.renderChanges || false;

            this.on('change', () => {
                if (this.renderChanges) {
                    this.flash();
                }
            });
        }

        _updateText(value) {
            this.class.remove(MULTIPLE_VALUES);

            if (this._text === value) return false;

            this._text = value;

            if (this._unsafe) {
                this._dom.innerHTML = value;
            } else {
                this._dom.textContent = value;
            }

            this.emit('change', value);

            return true;
        }

        get text() {
            return this._text;
        }

        set text(value) {
            if (value === undefined || value === null) {
                value = '';
            }

            const changed = this._updateText(value);

            if (changed && this._binding) {
                this._binding.setValue(value);
            }
        }

        get value() {
            return this.text;
        }

        set value(value) {
            this.text = value;
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            let different = false;
            const value = values[0];
            for (let i = 1; i < values.length; i++) {
                if (values[i] !== value) {
                    different = true;
                    break;
                }
            }

            if (different) {
                this._updateText('');
                this.class.add(MULTIPLE_VALUES);
            } else {
                this._updateText(values[0]);
            }
        }

        get placeholder() {
            return this.dom.getAttribute('placeholder');
        }

        set placeholder(value) {
            if (value) {
                this.dom.setAttribute('placeholder', value);
            } else {
                this.dom.removeAttribute('placeholder');
            }
        }
    }

    Element.register('label', Label);

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-button[data-icon]:before {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-button[data-icon]:before {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect, .pcui-button {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-button {\n  font-family: inherit;\n  display: inline-block;\n  border: 1px solid #20292b;\n  border-radius: 2px;\n  box-sizing: border-box;\n  background-color: #2c393c;\n  color: #b1b8ba;\n  padding: 0 8px;\n  margin: 6px;\n  height: 28px;\n  line-height: 28px;\n  max-height: 100%;\n  vertical-align: middle;\n  font-size: 12px;\n  font-weight: 600;\n  text-align: center;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: color 100ms, opacity 100ms, box-shadow 100ms;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.pcui-button[data-icon]:before {\n  content: attr(data-icon);\n  font-weight: 100;\n  font-size: inherit;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n.pcui-button[data-icon]:empty:before {\n  margin-right: 0;\n}\n\n.pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover, .pcui-button:not(.pcui-disabled):not(.pcui-readonly):focus {\n  color: #ffffff;\n  background-color: #2c393c;\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-button:not(.pcui-disabled):not(.pcui-readonly):active {\n  background-color: #20292b;\n  box-shadow: none;\n}\n\n.pcui-button.pcui-readonly {\n  opacity: 0.7;\n  cursor: default;\n}\n\n.pcui-button.pcui-disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.pcui-button.pcui-small {\n  height: 24px;\n  line-height: 24px;\n  font-size: 10px;\n}");

    const CLASS_BUTTON = 'pcui-button';

    /**
     * @name Button
     * @class
     * @classdesc Represents a button.
     * @augments Element
     * @property {string} [text=Click Me] Gets / sets the text of the button
     * @property {string} size Gets / sets the 'size' type of the button. Can be null or 'small'.
     * @property {string} [icon=E401] The CSS code for an icon for the button. e.g. E401 (notice we omit the '\' character).
     * @mixes IFocusable
     */
    class Button extends Element {
        /**
         * Creates a new Button.
         *
         * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
         * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
         */
        constructor(args) {
            if (!args) args = {};

            super(args.dom ? args.dom : document.createElement('button'), args);

            this.class.add(CLASS_BUTTON);

            this._unsafe = args.unsafe || false;

            this.text = args.text || '';
            this.size = args.size || null;
            this.icon = args.icon || '';

            this._domEventKeyDown = this._onKeyDown.bind(this);
            this.dom.addEventListener('keydown', this._onKeyDown.bind(this));
        }

        // click on enter
        // blur on escape
        _onKeyDown(evt) {
            if (evt.keyCode === 27) {
                this.blur();
            } else if (evt.keyCode === 13) {
                this._onClick(evt);
            }
        }

        _onClick(evt) {
            this.blur();
            if (this.readOnly) return;

            super._onClick(evt);
        }

        focus() {
            this.dom.focus();
        }

        blur() {
            this.dom.blur();
        }

        destroy() {
            if (this._destroyed) return;

            this.dom.removeEventListener('keydown', this._domEventKeyDown);
            super.destroy();
        }

        get text() {
            return this._text;
        }

        set text(value) {
            if (this._text === value) return;
            this._text = value;
            if (this._unsafe) {
                this.dom.innerHTML = value;
            } else {
                this.dom.textContent = value;
            }
        }

        get icon() {
            return this._icon;
        }

        set icon(value) {
            if (this._icon === value | !value.match(/^E[0-9]{0,4}$/)) return;
            this._icon = value;
            if (value) {
                // set data-icon attribute but first convert the value to a code point
                this.dom.setAttribute('data-icon', String.fromCodePoint(parseInt(value, 16)));
            } else {
                this.dom.removeAttribute('data-icon');
            }
        }

        get size() {
            return this._size;
        }

        set size(value) {
            if (this._size === value) return;
            if (this._size) {
                this.class.remove('pcui-' + this._size);
                this._size = null;
            }

            this._size = value;

            if (this._size) {
                this.class.add('pcui-' + this._size);
            }
        }
    }

    Element.register('button', Button);

    ___$insertStyle(".pcui-container {\n  position: relative;\n  min-width: 0;\n  min-height: 0;\n}\n\n.pcui-container.pcui-resizable > .pcui-resizable-handle {\n  position: absolute;\n  z-index: 1;\n  opacity: 0;\n  background-color: transparent;\n}\n.pcui-container.pcui-resizable > .pcui-resizable-handle:hover {\n  opacity: 1;\n}\n.pcui-container.pcui-resizable.pcui-resizable-resizing > .pcui-resizable-handle {\n  opacity: 1;\n}\n.pcui-container.pcui-resizable.pcui-resizable-left > .pcui-resizable-handle, .pcui-container.pcui-resizable.pcui-resizable-right > .pcui-resizable-handle {\n  top: 0;\n  bottom: 0;\n  width: 1px;\n  height: auto;\n  cursor: ew-resize;\n}\n.pcui-container.pcui-resizable.pcui-resizable-left > .pcui-resizable-handle {\n  left: 0;\n  border-left: 3px solid #20292b;\n}\n.pcui-container.pcui-resizable.pcui-resizable-right > .pcui-resizable-handle {\n  right: 0;\n  border-right: 3px solid #20292b;\n}\n.pcui-container.pcui-resizable.pcui-resizable-top > .pcui-resizable-handle, .pcui-container.pcui-resizable.pcui-resizable-bottom > .pcui-resizable-handle {\n  left: 0;\n  right: 0;\n  width: auto;\n  height: 1px;\n  cursor: ns-resize;\n}\n.pcui-container.pcui-resizable.pcui-resizable-top > .pcui-resizable-handle {\n  top: 0;\n  border-top: 3px solid #20292b;\n}\n.pcui-container.pcui-resizable.pcui-resizable-bottom > .pcui-resizable-handle {\n  bottom: 0;\n  border-bottom: 3px solid #20292b;\n}\n\n.pcui-container-dragged {\n  outline: 2px solid #ffffff;\n  box-sizing: border-box;\n  opacity: 0.7;\n  z-index: 1;\n}\n\n.pcui-container-dragged-child {\n  outline: 1px dotted #f60;\n  box-sizing: border-box;\n}");

    const RESIZE_HANDLE_SIZE = 4;

    const VALID_RESIZABLE_VALUES = [
        null,
        'top',
        'right',
        'bottom',
        'left'
    ];

    const CLASS_RESIZING = RESIZABLE + '-resizing';
    const CLASS_RESIZABLE_HANDLE = 'pcui-resizable-handle';
    const CLASS_CONTAINER = 'pcui-container';

    const CLASS_DRAGGED = CLASS_CONTAINER + '-dragged';
    const CLASS_DRAGGED_CHILD = CLASS_DRAGGED + '-child';

    /**
     * @event
     * @name Container#append
     * @description Fired when a child Element gets added to the Container
     * @param {Element} element - The element that was added
     */

    /**
     * @event
     * @name Container#remove
     * @description Fired when a child Element gets removed from the Container
     * @param {Element} element - The element that was removed
     */

    /**
     * @event
     * @name Container#scroll
     * @description Fired when the container is scrolled.
     * @param {Event} evt - The native scroll event.
     */

    /**
     * @event
     * @name Container#resize
     * @description Fired when the container gets resized using the resize handle.
     */

    /**
     * @name Container
     * @class
     * @classdesc A container is the basic building block for Elements that are grouped together.
     * A container can contain any other element including other containers.
     * @augments Element
     * @mixes IContainer
     * @mixes IFlex
     * @mixes IGrid
     * @mixes IScrollable
     * @mixes IResizable
     */
    class Container extends Element {
        /**
         * Creates a new Container.
         *
         * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
         * @param {HTMLElement} [args.dom] - The DOM element to use for the container. If unspecified a new element will be created.
         */
        constructor(args) {
            if (!args) args = {};

            const dom = args.dom || document.createElement('div');

            super(dom, args);

            this.class.add(CLASS_CONTAINER);

            this._domEventScroll = this._onScroll.bind(this);
            this.domContent = this._dom;

            // scroll
            this._scrollable = false;
            if (args.scrollable) {
                this.scrollable = true;
            }

            // flex
            this._flex = false;
            this.flex = !!args.flex;

            // grid
            this._grid = false;
            let grid = !!args.grid;
            if (grid) {
                if (this.flex) {
                    console.error('Invalid pcui.Container arguments: "grid" and "flex" cannot both be true.');
                    grid = false;
                }
            }
            this.grid = grid;

            // resize related
            this._domResizeHandle = null;
            this._domEventResizeStart = this._onResizeStart.bind(this);
            this._domEventResizeMove = this._onResizeMove.bind(this);
            this._domEventResizeEnd = this._onResizeEnd.bind(this);
            this._domEventResizeTouchStart = this._onResizeTouchStart.bind(this);
            this._domEventResizeTouchMove = this._onResizeTouchMove.bind(this);
            this._domEventResizeTouchEnd = this._onResizeTouchEnd.bind(this);
            this._resizeTouchId = null;
            this._resizeData = null;
            this._resizeHorizontally = true;

            this.resizable = args.resizable || null;
            this._resizeMin = 100;
            this._resizeMax = 300;

            if (args.resizeMin !== undefined) {
                this.resizeMin = args.resizeMin;
            }
            if (args.resizeMax !== undefined) {
                this.resizeMax = args.resizeMax;
            }

            this._draggedStartIndex = -1;
        }

        /**
         * @name Container#append
         * @description Appends an element to the container.
         * @param {Element} element - The element to append.
         * @fires 'append'
         */
        append(element) {
            const dom = this._getDomFromElement(element);
            this._domContent.appendChild(dom);
            this._onAppendChild(element);
        }

        /**
         * @name Container#appendBefore
         * @description Appends an element to the container before the specified reference element.
         * @param {Element} element - The element to append.
         * @param {Element} referenceElement - The element before which the element will be appended.
         * @fires 'append'
         */
        appendBefore(element, referenceElement) {
            const dom = this._getDomFromElement(element);
            this._domContent.appendChild(dom);
            const referenceDom =  referenceElement && this._getDomFromElement(referenceElement);

            this._domContent.insertBefore(dom, referenceDom);

            this._onAppendChild(element);
        }

        /**
         * @name Container#appendAfter
         * @description Appends an element to the container just after the specified reference element.
         * @param {Element} element - The element to append.
         * @param {Element} referenceElement - The element after which the element will be appended.
         * @fires 'append'
         */
        appendAfter(element, referenceElement) {
            const dom = this._getDomFromElement(element);
            const referenceDom = referenceElement && this._getDomFromElement(referenceElement);

            const elementBefore = referenceDom ? referenceDom.nextSibling : null;
            if (elementBefore) {
                this._domContent.insertBefore(dom, elementBefore);
            } else {
                this._domContent.appendChild(dom);
            }

            this._onAppendChild(element);
        }

        /**
         * @name Container#prepend
         * @description Inserts an element in the beginning of the container.
         * @param {Element} element - The element to prepend.
         * @fires 'append'
         */
        prepend(element) {
            const dom = this._getDomFromElement(element);
            const first = this._domContent.firstChild;
            if (first) {
                this._domContent.insertBefore(dom, first);
            } else {
                this._domContent.appendChild(dom);
            }

            this._onAppendChild(element);
        }

        /**
         * @name Container#remove
         * @description Removes the specified child element from the container.
         * @param {Element} element - The element to remove.
         * @fires 'remove'
         */
        remove(element) {
            if (element.parent !== this) return;

            const dom = this._getDomFromElement(element);
            this._domContent.removeChild(dom);

            this._onRemoveChild(element);
        }

        /**
         * @name Container#move
         * @description Moves the specified child at the specified index.
         * @param {Element} element - The element to move.
         * @param {number} index - The index
         */
        move(element, index) {
            let idx = -1;
            for (let i = 0; i < this.dom.childNodes.length; i++) {
                if (this.dom.childNodes[i].ui === element) {
                    idx = i;
                    break;
                }
            }

            if (idx === -1) {
                this.appendBefore(element, this.dom.childNodes[index]);
            } else if (index !== idx) {
                this.remove(element);
                if (index < idx) {
                    this.appendBefore(element, this.dom.childNodes[index]);
                } else {
                    this.appendAfter(element, this.dom.childNodes[index - 1]);
                }
            }
        }

        /**
         * @name Container#clear
         * @description Clears all children from the container.
         * @fires 'remove' for each child element.
         */
        clear() {
            let i = this._domContent.childNodes.length;
            while (i--) {
                const node = this._domContent.childNodes[i];
                if (node.ui && node.ui !== this) {
                    node.ui.destroy();
                }
            }

            if (this._domResizeHandle) {
                this._domResizeHandle.removeEventListener('mousedown', this._domEventResizeStart);
                this._domResizeHandle.removeEventListener('touchstart', this._domEventResizeTouchStart, { passive: false });
                this._domResizeHandle = null;
            }

            this._domContent.innerHTML = '';

            if (this.resizable) {
                this._createResizeHandle();
                this._dom.appendChild(this._domResizeHandle);
            }
        }

        // Used for backwards compatibility with the legacy ui framework
        _getDomFromElement(element) {
            if (element.dom) {
                return element.dom;
            }

            if (element.element) {
                // console.log('Legacy ui.Element passed to pcui.Container', this.class, element.class);
                return element.element;
            }

            return element;
        }

        _onAppendChild(element) {
            element.parent = this;
            this.emit('append', element);
        }

        _onRemoveChild(element) {
            element.parent = null;
            this.emit('remove', element);
        }

        _onScroll(evt) {
            this.emit('scroll', evt);
        }

        _createResizeHandle() {
            const handle = document.createElement('div');
            handle.classList.add(CLASS_RESIZABLE_HANDLE);
            handle.ui = this;

            handle.addEventListener('mousedown', this._domEventResizeStart);
            handle.addEventListener('touchstart', this._domEventResizeTouchStart, { passive: false });

            this._domResizeHandle = handle;
        }

        _onResizeStart(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            window.addEventListener('mousemove', this._domEventResizeMove);
            window.addEventListener('mouseup', this._domEventResizeEnd);

            this._resizeStart();
        }

        _onResizeMove(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            this._resizeMove(evt.clientX, evt.clientY);
        }

        _onResizeEnd(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            window.removeEventListener('mousemove', this._domEventResizeMove);
            window.removeEventListener('mouseup', this._domEventResizeEnd);

            this._resizeEnd();
        }

        _onResizeTouchStart(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];
                if (touch.target === this._domResizeHandle) {
                    this._resizeTouchId = touch.identifier;
                }
            }

            window.addEventListener('touchmove', this._domEventResizeTouchMove);
            window.addEventListener('touchend', this._domEventResizeTouchEnd);

            this._resizeStart();
        }

        _onResizeTouchMove(evt) {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];
                if (touch.identifier !== this._resizeTouchId) {
                    continue;
                }

                evt.stopPropagation();
                evt.preventDefault();

                this._resizeMove(touch.clientX, touch.clientY);

                break;
            }
        }

        _onResizeTouchEnd(evt) {
            for (let i = 0; i < evt.changedTouches.length; i++) {
                const touch = evt.changedTouches[i];
                if (touch.identifier === this._resizeTouchId) {
                    continue;
                }

                this._resizeTouchId = null;

                evt.preventDefault();
                evt.stopPropagation();

                window.removeEventListener('touchmove', this._domEventResizeTouchMove);
                window.removeEventListener('touchend', this._domEventResizeTouchEnd);

                this._resizeEnd();

                break;
            }
        }

        _resizeStart() {
            this.class.add(CLASS_RESIZING);
        }

        _resizeMove(x, y) {
            // if we haven't initialized resizeData do so now
            if (!this._resizeData) {
                this._resizeData = {
                    x: x,
                    y: y,
                    width: this.dom.clientWidth,
                    height: this.dom.clientHeight
                };

                return;
            }

            if (this._resizeHorizontally) {
                // horizontal resizing
                let offsetX = this._resizeData.x - x;

                if (this._resizable === 'right') {
                    offsetX = -offsetX;
                }

                this.width = RESIZE_HANDLE_SIZE + Math.max(this._resizeMin, Math.min(this._resizeMax, (this._resizeData.width + offsetX)));
            } else {
                // vertical resizing
                let offsetY = this._resizeData.y - y;

                if (this._resizable === 'bottom') {
                    offsetY = -offsetY;
                }

                this.height = Math.max(this._resizeMin, Math.min(this._resizeMax, (this._resizeData.height + offsetY)));
            }

            this.emit('resize');
        }

        _resizeEnd() {
            this._resizeData = null;
            this.class.remove(CLASS_RESIZING);
        }

        /**
         * Resize the container
         *
         * @param {number} x - The amount of pixels to resize the width
         * @param {number} y - The amount of pixels to resize the height
         */
        resize(x, y) {
            x = x || 0;
            y = y || 0;

            this._resizeStart();
            this._resizeMove(0, 0);
            this._resizeMove(-x + RESIZE_HANDLE_SIZE, -y);
            this._resizeEnd();
        }

        _getDraggedChildIndex(draggedChild) {
            for (let i = 0; i < this.dom.childNodes.length; i++) {
                if (this.dom.childNodes[i].ui === draggedChild) {
                    return i;
                }
            }

            return -1;
        }

        _onChildDragStart(evt, childPanel) {
            this.class.add(CLASS_DRAGGED_CHILD);

            this._draggedStartIndex = this._getDraggedChildIndex(childPanel);

            childPanel.class.add(CLASS_DRAGGED);

            this._draggedHeight = childPanel.height;

            this.emit('child:dragstart', childPanel, this._draggedStartIndex);
        }

        _onChildDragMove(evt, childPanel) {
            const rect = this.dom.getBoundingClientRect();

            const dragOut = (evt.clientX < rect.left || evt.clientX > rect.right || evt.clientY < rect.top || evt.clientY > rect.bottom);

            const childPanelIndex = this._getDraggedChildIndex(childPanel);

            if (dragOut) {
                childPanel.class.remove(CLASS_DRAGGED);
                if (this._draggedStartIndex !== childPanelIndex) {
                    this.remove(childPanel);
                    if (this._draggedStartIndex < childPanelIndex) {
                        this.appendBefore(childPanel, this.dom.childNodes[this._draggedStartIndex]);
                    } else {
                        this.appendAfter(childPanel, this.dom.childNodes[this._draggedStartIndex - 1]);
                    }
                }

                return;
            }

            childPanel.class.add(CLASS_DRAGGED);

            const y = evt.clientY - rect.top;
            let ind = null;

            // hovered script
            for (let i = 0; i < this.dom.childNodes.length; i++) {
                const otherPanel = this.dom.childNodes[i].ui;
                const otherTop = otherPanel.dom.offsetTop;
                if (i < childPanelIndex) {
                    if (y <= otherTop + otherPanel.header.height) {
                        ind = i;
                        break;
                    }
                } else if (i > childPanelIndex) {
                    if (y + childPanel.height >= otherTop + otherPanel.height) {
                        ind = i;
                        break;
                    }
                }
            }

            if (ind !== null && childPanelIndex !== ind) {
                this.remove(childPanel);
                if (ind < childPanelIndex) {
                    this.appendBefore(childPanel, this.dom.childNodes[ind]);
                } else {
                    this.appendAfter(childPanel, this.dom.childNodes[ind - 1]);
                }
            }
        }

        _onChildDragEnd(evt, childPanel) {
            this.class.remove(CLASS_DRAGGED_CHILD);

            childPanel.class.remove(CLASS_DRAGGED);

            const index = this._getDraggedChildIndex(childPanel);

            this.emit('child:dragend', childPanel, index, this._draggedStartIndex);

            this._draggedStartIndex = -1;
        }

        forEachChild(fn) {
            for (let i = 0; i < this.dom.childNodes.length; i++) {
                const node = this.dom.childNodes[i].ui;
                if (node) {
                    const result = fn(node, i);
                    if (result === false) {
                        // early out
                        break;
                    }
                }
            }
        }

        /**
         * If the current node contains a root, recursively append it's children to this node
         * and return it. Otherwise return the current node. Also add each child to the parent
         * under its keyed name.
         *
         * @param {object} node - The current element in the dom structure which must be recursively
         * traversed and appended to it's parent
         *
         * @returns {Element} - The recursively appended element node
         *
         */
        _buildDomNode(node) {
            const keys = Object.keys(node);
            let rootNode;
            if (keys.includes('root')) {
                rootNode = this._buildDomNode(node.root);
                node.children.forEach((childNode) => {
                    const childNodeElement = this._buildDomNode(childNode);
                    if (childNodeElement !== null) {
                        rootNode.append(childNodeElement);
                    }
                });
            } else {
                rootNode = node[keys[0]];
                this[`_${keys[0]}`] = rootNode;
            }
            return rootNode;
        }

        /**
         * Takes an array of pcui elements, each of which can contain their own child elements, and
         * appends them to this container. These child elements are traversed recursively using
         * _buildDomNode.
         *
         * @param {Array} dom - An array of child pcui elements to append to this container.
         *
         * @example
         * buildDom([
         *     {
         *         child1: pcui.Label()
         *     },
         *     {
         *         root: {
         *             container1: pcui.Container()
         *         },
         *         children: [
         *             {
         *                 child2: pcui.Label()
         *             },
         *             {
         *                 child3: pcui.Label()
         *             }
         *         ]
         *     }
         * ]);
         */
        buildDom(dom) {
            dom.forEach((node) => {
                const builtNode = this._buildDomNode(node);
                this.append(builtNode);
            });
        }

        destroy() {
            if (this._destroyed) return;
            this.domContent = null;

            if (this._domResizeHandle) {
                this._domResizeHandle.removeEventListener('mousedown', this._domEventResizeStart);
                window.removeEventListener('mousemove', this._domEventResizeMove);
                window.removeEventListener('mouseup', this._domEventResizeEnd);

                this._domResizeHandle.removeEventListener('touchstart', this._domEventResizeTouchStart);
                window.removeEventListener('touchmove', this._domEventResizeTouchMove);
                window.removeEventListener('touchend', this._domEventResizeTouchEnd);
            }

            this._domResizeHandle = null;
            this._domEventResizeStart = null;
            this._domEventResizeMove = null;
            this._domEventResizeEnd = null;
            this._domEventResizeTouchStart = null;
            this._domEventResizeTouchMove = null;
            this._domEventResizeTouchEnd = null;
            this._domEventScroll = null;

            super.destroy();
        }

        get flex() {
            return this._flex;
        }

        set flex(value) {
            if (value === this._flex) return;

            this._flex = value;

            if (value) {
                this.classAdd(FLEX);
            } else {
                this.classRemove(FLEX);
            }
        }

        get grid() {
            return this._grid;
        }

        set grid(value) {
            if (value === this._grid) return;

            this._grid = value;

            if (value) {
                this.classAdd(GRID);
            } else {
                this.classRemove(GRID);
            }
        }

        get scrollable() {
            return this._scrollable;
        }

        set scrollable(value) {
            if (this._scrollable === value) return;

            this._scrollable = value;

            if (value) {
                this.classAdd(SCROLLABLE);
            } else {
                this.classRemove(SCROLLABLE);
            }

        }

        get resizable() {
            return this._resizable;
        }

        set resizable(value) {
            if (value === this._resizable) return;

            if (VALID_RESIZABLE_VALUES.indexOf(value) === -1) {
                console.error('Invalid resizable value: must be one of ' + VALID_RESIZABLE_VALUES.join(','));
                return;
            }

            // remove old class
            if (this._resizable) {
                this.classRemove(`${RESIZABLE}-${this._resizable}`);
            }

            this._resizable = value;
            this._resizeHorizontally = (value === 'right' || value === 'left');

            if (value) {
                // add resize class and create / append resize handle
                this.classAdd(RESIZABLE);
                this.classAdd(`${RESIZABLE}-${value}`);

                if (!this._domResizeHandle) {
                    this._createResizeHandle();
                }
                this._dom.appendChild(this._domResizeHandle);
            } else {
                // remove resize class and resize handle
                this.classRemove(RESIZABLE);
                if (this._domResizeHandle) {
                    this._dom.removeChild(this._domResizeHandle);
                }
            }

        }

        get resizeMin() {
            return this._resizeMin;
        }

        set resizeMin(value) {
            this._resizeMin = Math.max(0, Math.min(value, this._resizeMax));
        }

        get resizeMax() {
            return this._resizeMax;
        }

        set resizeMax(value) {
            this._resizeMax = Math.max(this._resizeMin, value);
        }

        // The internal dom element used as a the container of all children.
        // Can be overriden by derived classes
        get domContent() {
            return this._domContent;
        }

        set domContent(value) {
            if (this._domContent === value) return;

            if (this._domContent) {
                this._domContent.removeEventListener('scroll', this._domEventScroll);
            }

            this._domContent = value;

            if (this._domContent) {
                this._domContent.addEventListener('scroll', this._domEventScroll);
            }
        }
    }

    Element.register('container', Container);

    ___$insertStyle(".pcui-code {\n  background: #20292b;\n  overflow: auto;\n}\n.pcui-code .pcui-code-inner {\n  color: #f60;\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 10px;\n  white-space: pre;\n}");

    const CLASS_ROOT$7 = 'pcui-code';
    const CLASS_INNER$1 = CLASS_ROOT$7 + '-inner';

    /**
     * @name Code
     * @augments Container
     * @property {string} text The Text to display in the code block
     * @class
     * @classdesc Represents a code block.
     */
    class Code extends Container {
        /**
         * Creates a new spinner.
         *
         * @param {object} [args] - The arguments
         * @param {string} [args.text] - The text to display in the code block;
         */
        constructor(args) {
            if (!args) args = {};
            super(args);
            this.class.add(CLASS_ROOT$7);

            this._inner = new Label();
            this.append(this._inner);
            this._inner.class.add(CLASS_INNER$1);
            if (args.text) {
                this.text = args.text;
            }
        }

        set text(value) {
            this._text = value;
            this._inner.text = value;
        }

        get text() {
            return this._text;
        }
    }

    Element.register('code', Code);

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .pcui-panel-header-title, .pcui-panel-header, .font-icon, .pcui-panel.pcui-collapsible > .pcui-panel-header:before {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-panel.pcui-collapsible > .pcui-panel-header:before {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-panel-header > .pcui-panel-sortable-icon {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-panel-header > .pcui-panel-sortable-icon:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-panel {\n  background-color: #364346;\n}\n\n.pcui-panel-header {\n  background-color: #293538;\n  color: #ffffff;\n  font-size: 12px;\n  white-space: nowrap;\n  padding-left: 10px;\n  flex-shrink: 0;\n  align-items: center;\n}\n\n.pcui-panel-header-title {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n  color: inherit;\n  font-size: inherit;\n  white-space: inherit;\n  margin: 0 auto 0 0;\n}\n\n.pcui-panel-content {\n  flex: 1;\n}\n\n.pcui-panel.pcui-collapsible {\n  transition: height 100ms, width 100ms;\n}\n.pcui-panel.pcui-collapsible > .pcui-panel-header {\n  cursor: pointer;\n}\n.pcui-panel.pcui-collapsible > .pcui-panel-header:before {\n  left: 0;\n  content: \"\\e179\";\n  font-size: 14px;\n  margin-right: 10px;\n  text-align: center;\n  color: #f60;\n}\n.pcui-panel.pcui-collapsible > .pcui-panel-header:hover {\n  color: #ffffff;\n}\n.pcui-panel.pcui-collapsible > .pcui-panel-header:hover:before {\n  color: #ffffff;\n}\n.pcui-panel.pcui-collapsible.pcui-panel-normal > .pcui-panel-header:before {\n  content: \"\\e183\";\n  font-weight: 200;\n}\n.pcui-panel.pcui-collapsible > .pcui-panel-content {\n  transition: visibility 100ms;\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed {\n  overflow: hidden;\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed > .pcui-panel-content {\n  visibility: hidden;\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed > .pcui-panel-header:before {\n  content: \"\\e180\";\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-normal > .pcui-panel-header:before {\n  content: \"\\e184\";\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal > .pcui-panel-header {\n  width: 2048px;\n  -webkit-transform: rotate(90deg);\n  -moz-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  -o-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-transform-origin: 0% 100%;\n  -moz-transform-origin: 0% 100%;\n  -ms-transform-origin: 0% 100%;\n  -o-transform-origin: 0% 100%;\n  transform-origin: 0% 100%;\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal > .pcui-panel-header:before {\n  content: \"\\e177\";\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal.pcui-panel-normal > .pcui-panel-header:before {\n  content: \"\\e181\";\n}\n.pcui-panel.pcui-collapsible.pcui-collapsed.pcui-panel-horizontal > .pcui-panel-content {\n  transition: none;\n}\n\n.pcui-panel.pcui-resizable.pcui-collapsible.pcui-collapsed > .pcui-resizable-handle {\n  display: none;\n}\n.pcui-panel.pcui-resizable.pcui-resizable-resizing {\n  transition: none;\n}\n.pcui-panel.pcui-resizable.pcui-resizable-resizing > .pcui-panel-content {\n  transition: none;\n}\n\n.pcui-panel-header > .pcui-panel-sortable-icon {\n  color: #5b7073;\n  transition: color 100ms;\n  flex-direction: row;\n  align-items: center;\n  margin: 0 10px 0 0;\n  height: 100%;\n}\n.pcui-panel-header > .pcui-panel-sortable-icon:before {\n  content: \" \";\n  border-left: 1px solid #364346;\n  margin-right: 10px;\n  height: calc(100% - 14px);\n  flex-shrink: 0;\n}\n.pcui-panel-header > .pcui-panel-sortable-icon:after {\n  content: \".. .. ..\";\n  white-space: normal;\n  width: 12px;\n  line-height: 5px;\n  overflow: hidden;\n  height: 24px;\n  font-size: 22px;\n  letter-spacing: 1px;\n  flex-shrink: 0;\n}\n\n.pcui-panel:not(.pcui-disabled):not(.pcui-readonly) > .pcui-panel-header > .pcui-panel-sortable-icon:hover {\n  color: #ffffff;\n  cursor: move;\n}\n\n.pcui-panel:not(.pcui-collapsible) > .pcui-panel-header > .pcui-panel-sortable-icon:before {\n  display: none;\n}\n\n.pcui-panel-remove {\n  align-self: flex-end;\n  order: 100;\n}\n.pcui-panel-remove:before {\n  line-height: 30px;\n}\n\n.pcui-panel.pcui-readonly .pcui-panel-remove {\n  display: none;\n}\n\n.pcui-panel-header > .pcui-button {\n  flex-shrink: 0;\n  margin: 1px;\n  background-color: transparent;\n  border: 0;\n}\n\n.pcui-panel.pcui-disabled > .pcui-panel-header {\n  background-color: #303d40;\n  color: #999;\n}\n\n.pcui-subpanel {\n  box-sizing: border-box;\n  margin: 6px;\n  border: 1px solid #293538;\n  border-radius: 2px;\n  background-color: #2c393c;\n  color: #b1b8ba;\n  font-size: 12px;\n}\n.pcui-subpanel .pcui-button {\n  background-color: #364346;\n  border-color: #293538;\n}\n.pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover, .pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):focus {\n  background-color: #364346;\n}\n.pcui-subpanel .pcui-button:not(.pcui-disabled):not(.pcui-readonly):active {\n  background-color: #2c393c;\n}");

    const CLASS_PANEL = 'pcui-panel';
    const CLASS_PANEL_HEADER = CLASS_PANEL + '-header';
    const CLASS_PANEL_HEADER_TITLE = CLASS_PANEL_HEADER + '-title';
    const CLASS_PANEL_CONTENT = CLASS_PANEL + '-content';
    const CLASS_PANEL_HORIZONTAL = CLASS_PANEL + '-horizontal';
    const CLASS_PANEL_SORTABLE_ICON = CLASS_PANEL + '-sortable-icon';
    const CLASS_PANEL_REMOVE = CLASS_PANEL + '-remove';

    // TODO: document panelType

    /**
     * @event
     * @name Panel#collapse
     * @description Fired when the panel gets collapsed
     */

    /**
     * @event
     * @name Panel#expand
     * @description Fired when the panel gets expanded
     */

    /**
     * @name Panel
     * @class
     * @classdesc The Panel is a pcui.Container that itself contains a header container and a content container. The
     * respective pcui.Container functions work using the content container. One can also append elements to the header of the Panel.
     * @property {boolean} flex Gets / sets whether the container supports flex layout. Defaults to false. Cannot co-exist with grid.
     * @property {boolean} grid Gets / sets whether the container supports grid layout. Defaults to false. Cannot co-exist with flex.
     * @property {boolean} sortable Gets / sets whether the panel can be reordered
     * @property {boolean} collapseHorizontally Gets / sets whether the panel collapses horizontally - this would be the case for side panels. Defaults to false.
     * @property {boolean} removable Gets / sets whether the panel can be removed
     * @property {number} headerSize=32 The height of the header in pixels. Defaults to 32.
     * @property {string} headerText The header text of the panel. Defaults to the empty string.
     * @property {Container} header Gets the header container.
     * @property {Container} content Gets the content container.
     * @augments Container
     * @mixes IContainer
     * @mixes IFlex
     * @mixes IGrid
     * @mixes ICollapsible
     * @mixes IScrollable
     * @mixes IResizable
     */
    class Panel extends Container {
        /**
         * Creates a new Panel.
         *
         * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
         */
        constructor(args) {
            if (!args) args = {};

            const panelArgs = Object.assign({}, args);
            panelArgs.flex = true;
            delete panelArgs.grid;
            delete panelArgs.flexDirection;
            delete panelArgs.scrollable;

            super(panelArgs);

            this.class.add(CLASS_PANEL);

            if (args.panelType) {
                this.class.add(CLASS_PANEL + '-' + args.panelType);
            }

            // do not call reflow on every update while
            // we are initializing
            this._suspendReflow = true;

            // initialize header container
            this._initializeHeader(args);

            // initialize content container
            this._initializeContent(args);

            // header size
            this.headerSize = args.headerSize !== undefined ? args.headerSize : 32;

            this._domEvtDragStart = this._onDragStart.bind(this);
            this._domEvtDragMove = this._onDragMove.bind(this);
            this._domEvtDragEnd = this._onDragEnd.bind(this);

            // collapse related
            this._reflowTimeout = null;
            this._widthBeforeCollapse = null;
            this._heightBeforeCollapse = null;

            this.collapsible = args.collapsible || false;
            this.collapsed = args.collapsed || false;
            this.collapseHorizontally = args.collapseHorizontally || false;

            this._iconSort = null;
            this.sortable = args.sortable || false;

            this._btnRemove = null;
            this.removable = args.removable || false;

            // set the contents container to be the content DOM element
            // from now on calling append functions on the panel will append themn
            // elements to the contents container
            this.domContent = this._containerContent.dom;

            // execute reflow now after all fields have been initialized
            this._suspendReflow = false;
            this._reflow();
        }

        _initializeHeader(args) {
            // header container
            this._containerHeader = new Container({
                flex: true,
                flexDirection: 'row',
                class: [CLASS_PANEL_HEADER, FONT_BOLD]
            });

            // header title
            this._labelTitle = new Label({
                text: args.headerText,
                class: [CLASS_PANEL_HEADER_TITLE, FONT_BOLD]
            });
            this._containerHeader.append(this._labelTitle);

            // use native click listener because the pcui.Element#click event is only fired
            // if the element is enabled. However we still want to catch header click events in order
            // to collapse them
            this._containerHeader.dom.addEventListener('click', this._onHeaderClick.bind(this));

            this.append(this._containerHeader);
        }

        _onHeaderClick(evt) {
            if (!this._collapsible) return;
            if (evt.target !== this.header.dom && evt.target !== this._labelTitle.dom) return;

            // toggle collapsed
            this.collapsed = !this.collapsed;
        }

        _onClickRemove(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            this.emit('click:remove');
        }

        _initializeContent(args) {
            // containers container
            this._containerContent = new Container({
                class: CLASS_PANEL_CONTENT,
                grid: args.grid,
                flex: args.flex,
                flexDirection: args.flexDirection,
                scrollable: args.scrollable,
                dom: args.container
            });

            this.append(this._containerContent);
        }

        // Collapses or expands the panel as needed
        _reflow() {
            if (this._suspendReflow) {
                return;
            }

            if (this._reflowTimeout) {
                cancelAnimationFrame(this._reflowTimeout);
                this._reflowTimeout = null;
            }

            if (this.hidden || !this.collapsible) return;

            if (this.collapsed && this.collapseHorizontally) {
                this._containerHeader.style.top = -this.headerSize + 'px';
            } else {
                this._containerHeader.style.top = '';
            }

            // we rely on the content width / height and we have to
            // wait for 1 frame before we can get the final values back
            this._reflowTimeout = requestAnimationFrame(() => {
                this._reflowTimeout = null;

                if (this.collapsed) {
                    // remember size before collapse
                    if (!this._widthBeforeCollapse) {
                        this._widthBeforeCollapse = this.style.width;
                    }
                    if (!this._heightBeforeCollapse) {
                        this._heightBeforeCollapse = this.style.height;
                    }

                    if (this._collapseHorizontally) {
                        this.height = '';
                        this.width = this.headerSize;
                    } else {
                        this.height = this.headerSize;
                    }

                    // add collapsed class after getting the width and height
                    // because if we add it before then because of overflow:hidden
                    // we might get innacurate width/heights.
                    this.class.add(COLLAPSED);
                } else {
                    // remove collapsed class first and the restore width and height
                    // (opposite order of collapsing)
                    this.class.remove(COLLAPSED);

                    if (this._collapseHorizontally) {
                        this.height = '';
                        if (this._widthBeforeCollapse !== null) {
                            this.width = this._widthBeforeCollapse;
                        }
                    } else {
                        if (this._heightBeforeCollapse !== null) {
                            this.height = this._heightBeforeCollapse;
                        }
                    }

                    // reset before collapse vars
                    this._widthBeforeCollapse = null;
                    this._heightBeforeCollapse = null;
                }
            });
        }

        _onDragStart(evt) {
            if (this.disabled || this.readOnly) return;

            evt.stopPropagation();
            evt.preventDefault();

            window.addEventListener('mouseup', this._domEvtDragEnd);
            window.addEventListener('mouseleave', this._domEvtDragEnd);
            window.addEventListener('mousemove', this._domEvtDragMove);

            this.emit('dragstart');
            if (this.parent && this.parent._onChildDragStart) {
                this.parent._onChildDragStart(evt, this);
            }
        }

        _onDragMove(evt) {
            this.emit('dragmove');
            if (this.parent && this.parent._onChildDragStart) {
                this.parent._onChildDragMove(evt, this);
            }
        }

        _onDragEnd(evt) {
            window.removeEventListener('mouseup', this._domEvtDragEnd);
            window.removeEventListener('mouseleave', this._domEvtDragEnd);
            window.removeEventListener('mousemove', this._domEvtDragMove);

            if (this._draggedChild === this) {
                this._draggedChild = null;
            }

            this.emit('dragend');
            if (this.parent && this.parent._onChildDragStart) {
                this.parent._onChildDragEnd(evt, this);
            }
        }


        destroy() {
            if (this._destroyed) return;
            if (this._reflowTimeout) {
                cancelAnimationFrame(this._reflowTimeout);
                this._reflowTimeout = null;
            }

            window.removeEventListener('mouseup', this._domEvtDragEnd);
            window.removeEventListener('mouseleave', this._domEvtDragEnd);
            window.removeEventListener('mousemove', this._domEvtDragMove);

            super.destroy();
        }

        get collapsible() {
            return this._collapsible;
        }

        set collapsible(value) {
            if (value === this._collapsible) return;

            this._collapsible = value;

            if (value) {
                this.classAdd(COLLAPSIBLE);
            } else {
                this.classRemove(COLLAPSIBLE);
            }

            this._reflow();

            if (this.collapsed) {
                this.emit(value ? 'collapse' : 'expand');
            }

        }

        get collapsed() {
            return this._collapsed;
        }

        set collapsed(value) {
            if (this._collapsed === value) return;

            this._collapsed = value;

            this._reflow();

            if (this.collapsible) {
                this.emit(value ? 'collapse' : 'expand');
            }
        }

        get sortable() {
            return this._sortable;
        }

        set sortable(value) {
            if (this._sortable === value) return;

            this._sortable = value;

            if (value) {
                this._iconSort = new Label({
                    class: CLASS_PANEL_SORTABLE_ICON
                });

                this._iconSort.dom.addEventListener('mousedown', this._domEvtDragStart);

                this.header.prepend(this._iconSort);
            } else if (this._iconSort) {
                this._iconSort.destroy();
                this._iconSort = null;
            }
        }

        get removable() {
            return !!this._btnRemove;
        }

        set removable(value) {
            if (this.removable === value) return;

            if (value) {
                this._btnRemove = new Button({
                    icon: 'E289',
                    class: CLASS_PANEL_REMOVE
                });
                this._btnRemove.on('click', this._onClickRemove.bind(this));
                this.header.append(this._btnRemove);
            } else {
                this._btnRemove.destroy();
                this._btnRemove = null;
            }
        }

        get collapseHorizontally() {
            return this._collapseHorizontally;
        }

        set collapseHorizontally(value) {
            if (this._collapseHorizontally === value) return;

            this._collapseHorizontally = value;
            if (value) {
                this.classAdd(CLASS_PANEL_HORIZONTAL);
            } else {
                this.classRemove(CLASS_PANEL_HORIZONTAL);
            }

            this._reflow();
        }

        get content() {
            return this._containerContent;
        }

        get header() {
            return this._containerHeader;
        }

        get headerText() {
            return this._labelTitle.text;
        }

        set headerText(value) {
            this._labelTitle.text = value;
        }

        get headerSize() {
            return this._headerSize;
        }

        set headerSize(value) {
            this._headerSize = value;
            const style = this._containerHeader.dom.style;
            style.height = Math.max(0, value) + 'px';
            style.lineHeight = style.height;
            this._reflow();
        }
    }

    Element.register('panel', Panel);

    ___$insertStyle(".noSelect, .pcui-overlay-inner {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-overlay {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-overlay:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-overlay {\n  position: absolute;\n  width: auto;\n  height: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 101;\n  transition: opacity 100ms, visibility 100ms;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n}\n\n.pcui-overlay-inner {\n  position: absolute;\n  width: auto;\n  height: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(32, 41, 43, 0.7);\n}\n\n.pcui-overlay-clickable > .pcui-overlay-inner {\n  cursor: pointer;\n}\n\n.pcui-overlay-transparent > .pcui-overlay-inner {\n  background-color: transparent;\n}\n\n.pcui-overlay-content {\n  background-color: #364346;\n  transition: width 100ms, height 100ms, margin-left 100ms, margin-top 100ms;\n  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.15);\n}");

    const CLASS_OVERLAY = 'pcui-overlay';
    const CLASS_OVERLAY_INNER = CLASS_OVERLAY + '-inner';
    const CLASS_OVERLAY_CLICKABLE = CLASS_OVERLAY + '-clickable';
    const CLASS_OVERLAY_TRANSPARENT = CLASS_OVERLAY + '-transparent';
    const CLASS_OVERLAY_CONTENT = CLASS_OVERLAY + '-content';

    /**
     * @name Overlay
     * @class
     * @classdesc An overlay element.
     * @property {boolean} clickable Whether the overlay can be hidden by clicking on it.
     * @property {boolean} transparent Whether the overlay is transparent.
     * @augments Container
     */
    class Overlay extends Container {
        /**
         * Creates a new pcui.Overlay.
         *
         * @param {object} args - The arguments.
         */
        constructor(args) {
            if (!args) args = {};
            super(args);

            this.class.add(CLASS_OVERLAY);

            this._domClickableOverlay = document.createElement('div');
            this._domClickableOverlay.ui = this;
            this._domClickableOverlay.classList = CLASS_OVERLAY_INNER;
            this.dom.appendChild(this._domClickableOverlay);

            this._domEventMouseDown = this._onMouseDown.bind(this);
            this._domClickableOverlay.addEventListener('mousedown', this._domEventMouseDown);

            this.domContent = document.createElement('div');
            this.domContent.ui = this;
            this.domContent.classList.add(CLASS_OVERLAY_CONTENT);
            this.dom.appendChild(this.domContent);

            this.clickable = args.clickable || false;
            this.transparent = args.transparent || false;
        }

        _onMouseDown(evt) {
            if (!this.clickable) return;

            // some field might be in focus
            document.body.blur();

            // wait till blur is done
            requestAnimationFrame(() => {
                this.hidden = true;
            });

            evt.preventDefault();
        }

        /**
         * @name Overlay#position
         * @description Position the overlay at specific x, y coordinates.
         * @param {number} x - The x coordinate
         * @param {number} y - The y coordinate
         */
        position(x, y) {
            const area = this._domClickableOverlay.getBoundingClientRect();
            const rect = this.domContent.getBoundingClientRect();

            x = Math.max(0, Math.min(area.width - rect.width, x));
            y = Math.max(0, Math.min(area.height - rect.height, y));

            this.domContent.style.position = 'absolute';
            this.domContent.style.left = `${x}px`;
            this.domContent.style.top = `${y}px`;
        }

        destroy() {
            if (this._destroyed) return;
            this._domClickableOverlay.removeEventListener('mousedown', this._domEventMouseDown);
            super.destroy();
        }

        get clickable() {
            return this.class.contains(CLASS_OVERLAY_CLICKABLE);
        }

        set clickable(value) {
            if (value) {
                this.class.add(CLASS_OVERLAY_CLICKABLE);
            } else {
                this.class.remove(CLASS_OVERLAY_CLICKABLE);
            }
        }

        get transparent() {
            return this.class.contains(CLASS_OVERLAY_TRANSPARENT);
        }

        set transparent(value) {
            if (value) {
                this.class.add(CLASS_OVERLAY_TRANSPARENT);
            } else {
                this.class.remove(CLASS_OVERLAY_TRANSPARENT);
            }
        }
    }

    Element.register('overlay', Overlay);

    ___$insertStyle(".pcui-divider {\n  height: 1px;\n  background-color: #2c393c;\n  margin: 6px 0;\n}");

    const CLASS_ROOT$6 = 'pcui-divider';

    /**
     * @name Divider
     * @augments Element
     * @class
     * @classdesc Represents a vertical division between two elements
     */
    class Divider extends Element {
        constructor(args) {
            if (!args) args = {};
            super(args.dom ? args.dom : document.createElement('div'), args);

            this.class.add(CLASS_ROOT$6);
        }
    }

    Element.register('divider', Divider);

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-infobox[data-icon]:not(.pcui-hidden):before {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-infobox[data-icon]:not(.pcui-hidden):before {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.pcui-infobox {\n  box-sizing: border-box;\n  margin: 6px;\n  padding: 12px;\n  border: 1px solid #293538;\n  border-radius: 2px;\n  background-color: #2c393c;\n  color: #b1b8ba;\n  font-size: 12px;\n}\n.pcui-infobox :first-child {\n  color: #ffffff;\n  margin-bottom: 2px;\n}\n.pcui-infobox[data-icon]:not(.pcui-hidden) {\n  display: grid;\n  grid: auto-flow/min-content 1fr;\n}\n.pcui-infobox[data-icon]:not(.pcui-hidden):before {\n  content: attr(data-icon);\n  font-weight: 100;\n  font-size: 16px;\n  margin-right: 12px;\n  vertical-align: middle;\n  grid-column: 1;\n  grid-row: 1/3;\n}");

    const CLASS_INFOBOX = 'pcui-infobox';

    /**
     * @name InfoBox
     * @class
     * @classdesc Represents an information box.
     * @augments Container
     * @property {string} icon=E401 The CSS code for an icon for the info box. e.g. E401 (notice we omit the '\' character).
     * @property {string} title=Title Gets / sets the 'title' of the info box
     * @property {string} text=Text Gets / sets the 'text' of the info box
     */
    class InfoBox extends Container {
        /**
         * Creates a new InfoBox.
         *
         * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
         * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the title/text. Otherwise textContent will be used instead.
         */
        constructor(args) {
            if (!args) args = {};
            super(args);

            this.class.add(CLASS_INFOBOX);
            this._titleElement = new Element();
            this._textElement = new Element();
            this.append(this._titleElement);
            this.append(this._textElement);

            this._unsafe = args.unsafe || false;

            this.icon = args.icon || '';
            this.title = args.title || '';
            this.text = args.text || '';
        }

        get icon() {
            return this._icon;
        }

        set icon(value) {
            if (this._icon === value) return;
            this._icon = value;
            if (value) {
                // set data-icon attribute but first convert the value to a code point
                this.dom.setAttribute('data-icon', String.fromCodePoint(parseInt(value, 16)));
            } else {
                this.dom.removeAttribute('data-icon');
            }
        }

        get title() {
            return this._title;
        }

        set title(value) {
            if (this._title === value) return;
            this._title = value;
            if (this._unsafe) {
                this._titleElement.dom.innerHTML = value;
            } else {
                this._titleElement.dom.textContent = value;
            }
        }

        get text() {
            return this._text;
        }

        set text(value) {
            if (this._text === value) return;
            this._text = value;
            if (this._unsafe) {
                this._textElement.dom.innerHTML = value;
            } else {
                this._textElement.dom.textContent = value;
            }
        }
    }

    Element.register('infobox', InfoBox);

    // calculate, how many string `a`
    // requires edits, to become string `b`
    const searchStringEditDistance = function (a, b) {
        // Levenshtein distance
        // https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#JavaScript
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        if (a === b) return 0;

        var i, j;
        var matrix = [];

        for (i = 0; i <= b.length; i++)
            matrix[i] = [i];

        for (j = 0; j <= a.length; j++)
            matrix[0][j] = j;

        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
        }

        return matrix[b.length][a.length];
    };


    // calculate, how many characters string `b`
    // contains of a string `a`
    const searchCharsContains = function (a, b) {
        if (a === b)
            return a.length;

        var contains = 0;
        var ind = { };
        var i;

        for (i = 0; i < b.length; i++)
            ind[b.charAt(i)] = true;

        for (i = 0; i < a.length; i++) {
            if (ind[a.charAt(i)])
                contains++;
        }

        return contains;
    };


    // tokenize string into array of tokens
    const searchStringTokenize = function (name) {
        var tokens = [];

        // camelCase
        // upperCASE123
        var string = name.replace(/([^A-Z])([A-Z][^A-Z])/g, '$1 $2').replace(/([A-Z0-9]{2,})/g, ' $1');

        // space notation
        // dash-notation
        // underscore_notation
        var parts = string.split(/(\s|\-|_)/g);

        // filter valid tokens
        for (var i = 0; i < parts.length; i++) {
            parts[i] = parts[i].toLowerCase().trim();
            if (parts[i] && parts[i] !== '-' && parts[i] !== '_')
                tokens.push(parts[i]);
        }

        return tokens;
    };


    const _searchItems = function (items, search, args) {
        var results = [];

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            // direct hit
            if (item.subFull !== Infinity) {
                results.push(item);

                if (item.edits === Infinity)
                    item.edits = 0;

                if (item.sub === Infinity)
                    item.sub = item.subFull;

                continue;
            } else if (item.name === search || item.name.indexOf(search) === 0) {
                results.push(item);

                if (item.edits === Infinity)
                    item.edits = 0;

                if (item.sub === Infinity)
                    item.sub = 0;

                continue;
            }

            // check if name contains enough of search characters
            var contains = searchCharsContains(search, item.name);
            if (contains / search.length < args.containsCharsTolerance)
                continue;

            var editsCandidate = Infinity;
            var subCandidate = Infinity;

            // for each token
            for (var t = 0; t < item.tokens.length; t++) {
                // direct token match
                if (item.tokens[t] === search) {
                    editsCandidate = 0;
                    subCandidate = t;
                    break;
                }

                var edits = searchStringEditDistance(search, item.tokens[t]);

                if ((subCandidate === Infinity || edits < editsCandidate) && item.tokens[t].indexOf(search) !== -1) {
                    // search is a substring of a token
                    subCandidate = t;
                    editsCandidate = edits;
                    continue;
                } else if (subCandidate === Infinity && edits < editsCandidate) {
                    // new edits candidate, not a substring of a token
                    if ((edits / Math.max(search.length, item.tokens[t].length)) <= args.editsDistanceTolerance) {
                        // check if edits tolerance is satisfied
                        editsCandidate = edits;
                    }
                }
            }

            // no match candidate
            if (editsCandidate === Infinity)
                continue;

            // add new result
            results.push(item);
            item.edits = item.edits === Infinity ? editsCandidate : item.edits + editsCandidate;
            item.sub = item.sub === Infinity ? subCandidate : item.sub + subCandidate;
        }

        return results;
    };

    // perform search through items
    // items is an array with arrays of two values
    // where first value is a string to be searched by
    // and second value is an object to be found
    //
    // [
    //     [ 'camera', {object} ],
    //     [ 'New Entity', {object} ],
    //     [ 'Sun', {object} ]
    // ]
    //
    const searchItems = function (items, search, args) {
        let i;

        search = (search || '').toLowerCase().trim();

        if (!search)
            return [];

        var searchTokens = searchStringTokenize(search);
        if (!searchTokens.length)
            return [];

        args = args || { };
        args.containsCharsTolerance = args.containsCharsTolerance || 0.5;
        args.editsDistanceTolerance = args.editsDistanceTolerance || 0.5;

        var records = [];

        for (i = 0; i < items.length; i++) {
            var subInd = items[i][0].toLowerCase().trim().indexOf(search);

            records.push({
                name: items[i][0],
                item: items[i][1],
                tokens: searchStringTokenize(items[i][0]),
                edits: Infinity,
                subFull: (subInd !== -1) ? subInd : Infinity,
                sub: Infinity
            });
        }

        // search each token
        for (i = 0; i < searchTokens.length; i++)
            records = _searchItems(records, searchTokens[i], args);

        // sort result first by substring? then by edits number
        records.sort((a, b) => {
            if (a.subFull !== b.subFull) {
                return a.subFull - b.subFull;
            } else if (a.sub !== b.sub) {
                return a.sub - b.sub;
            } else if (a.edits !== b.edits) {
                return a.edits - b.edits;
            }
            return a.name.length - b.name.length;
        });

        // return only items without match information
        for (i = 0; i < records.length; i++)
            records[i] = records[i].item;

        // limit number of results
        if (args.hasOwnProperty('limitResults') && records.length > args.limitResults) {
            records = records.slice(0, args.limitResults);
        }

        return records;
    };

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-select-input-create-new > .pcui-label:last-child:before, .pcui-select-input-list .pcui-label.pcui-selected:after, .pcui-select-input-icon:after {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-select-input-create-new > .pcui-label:last-child:before, .pcui-select-input-list .pcui-label.pcui-selected:after, .pcui-select-input-icon:after {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont, .pcui-select-input-tag > .pcui-label, .pcui-select-input-list .pcui-label, .pcui-select-input-value {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-select-input-container-value, .pcui-select-input {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-select-input-container-value:not(.pcui-hidden), .pcui-select-input:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-select-input {\n  box-sizing: border-box;\n  margin: 6px;\n  border-radius: 2px;\n  min-width: 0;\n}\n\n.pcui-select-input-container-value {\n  background-color: #2c393c;\n  transition: box-shadow 100ms, opacity 100ms;\n}\n\n.pcui-select-input-shadow {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  transition: box-shadow 100ms;\n  border-radius: 2px;\n  pointer-events: none;\n  z-index: 1;\n}\n\n.pcui-select-input-value {\n  margin: 0;\n  padding: 0 24px 0 8px;\n  height: 24px;\n  line-height: 24px;\n  font-size: 12px;\n  transition: background-color 100ms, color 100ms;\n}\n.pcui-select-input-value:not(.pcui-hidden) {\n  display: block;\n}\n\n.pcui-select-input-textinput {\n  margin: 0;\n}\n\n.pcui-select-input-textinput:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error).pcui-focus, .pcui-select-input-textinput:not(.pcui-disabled):not(.pcui-readonly):not(.pcui-error):hover {\n  box-shadow: none;\n}\n\n.pcui-select-input-icon {\n  position: absolute;\n  right: 6px;\n  color: #5b7073;\n  pointer-events: none;\n  transition: color 100ms;\n  margin: 0;\n  height: 24px;\n  line-height: 24px;\n}\n.pcui-select-input-icon:after {\n  content: \"\\e159\";\n  vertical-align: middle;\n}\n\n.pcui-select-input.pcui-open .pcui-select-input-shadow {\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-select-input.pcui-open .pcui-select-input-value {\n  color: #ffffff;\n  background-color: #20292b;\n}\n.pcui-select-input.pcui-open .pcui-select-input-icon:after {\n  color: #ffffff;\n  content: \"\\e157\";\n}\n\n.pcui-select-input-list {\n  position: absolute;\n  z-index: 1;\n  top: 100%;\n  width: 100%;\n  max-height: 200px;\n  overflow-y: auto;\n  background-color: #293538;\n}\n.pcui-select-input-list .pcui-label {\n  font-size: 12px;\n  height: 22px;\n  line-height: 22px;\n  padding: 0 24px 0 6px;\n  margin: 0;\n  transition: background-color 100ms, color 100ms;\n}\n.pcui-select-input-list .pcui-label:not(.pcui-hidden) {\n  display: block;\n}\n.pcui-select-input-list .pcui-label.pcui-selected {\n  color: #ffffff;\n}\n.pcui-select-input-list .pcui-label.pcui-selected:after {\n  content: \"\\e133\";\n  color: #5b7073;\n  position: absolute;\n  right: 6px;\n}\n\n.pcui-select-input-fit-height .pcui-select-input-list {\n  top: initial;\n  bottom: 100%;\n}\n.pcui-select-input-fit-height .pcui-select-input-shadow {\n  top: initial;\n  bottom: 0;\n}\n\n.pcui-select-input-tags:not(.pcui-select-input-tags-empty) {\n  margin-top: 1px;\n  flex-wrap: wrap;\n}\n\n.pcui-select-input-tag {\n  background-color: #293538;\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid #232e30;\n  margin-right: 2px;\n  margin-top: 2px;\n  min-width: 0;\n  height: 18px;\n}\n.pcui-select-input-tag > * {\n  margin: 0;\n  background-color: transparent;\n  border: 0;\n}\n.pcui-select-input-tag > .pcui-label {\n  padding: 0 5px 0 8px;\n}\n.pcui-select-input-tag > .pcui-button {\n  padding: 0 5px;\n  height: 18px;\n  line-height: 18px;\n  flex-shrink: 0;\n}\n.pcui-select-input-tag > .pcui-button:not(.pcui-disabled):not(.pcui-readonly):hover {\n  box-shadow: none;\n  color: #d34141;\n}\n\n.pcui-select-input-tag-not-everywhere > .pcui-label {\n  opacity: 0.5;\n}\n.pcui-select-input-tag-not-everywhere > .pcui-label:before {\n  content: \"*\";\n  margin-right: 5px;\n}\n\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-container-value:hover .pcui-select-input-shadow {\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-container-value:hover .pcui-select-input-icon {\n  color: #9ba1a3;\n}\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus .pcui-select-input-shadow {\n  box-shadow: 0 0 2px 1px rgba(255, 102, 0, 0.3);\n}\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly).pcui-focus .pcui-select-input-icon {\n  color: #9ba1a3;\n}\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-value:hover {\n  color: #ffffff;\n  background-color: #20292b;\n  cursor: pointer;\n}\n.pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-list > *:hover, .pcui-select-input:not(.pcui-disabled):not(.pcui-readonly) .pcui-select-input-list > .pcui-select-input-label-highlighted {\n  background-color: #20292b;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.pcui-select-input-create-new > .pcui-label {\n  padding-right: 6px;\n}\n.pcui-select-input-create-new > .pcui-label:last-child {\n  flex-shrink: 0;\n  margin-left: auto;\n}\n.pcui-select-input-create-new > .pcui-label:last-child:before {\n  content: \"\\e120\";\n  margin-right: 6px;\n}\n\n.pcui-select-input.pcui-disabled {\n  opacity: 0.4;\n}\n\n.pcui-select-input.pcui-readonly .pcui-select-input-icon {\n  display: none;\n}\n.pcui-select-input.pcui-readonly.pcui-select-input-multi .pcui-select-input-container-value {\n  display: none;\n}\n.pcui-select-input.pcui-readonly.pcui-select-input-multi .pcui-select-input-tag > .pcui-button {\n  display: none;\n}\n.pcui-select-input.pcui-readonly.pcui-select-input-allow-input:not(.pcui-select-input-multi) {\n  opacity: 0.7;\n}\n.pcui-select-input.pcui-readonly.pcui-select-input-allow-input:not(.pcui-select-input-multi) .pcui-select-input-textinput:after {\n  display: none;\n}");

    const CLASS_SELECT_INPUT = 'pcui-select-input';
    const CLASS_SELECT_INPUT_CONTAINER_VALUE = CLASS_SELECT_INPUT + '-container-value';
    const CLASS_MULTI_SELECT = CLASS_SELECT_INPUT + '-multi';
    const CLASS_ALLOW_INPUT = 'pcui-select-input-allow-input';
    const CLASS_VALUE = CLASS_SELECT_INPUT + '-value';
    const CLASS_ICON$1 = CLASS_SELECT_INPUT + '-icon';
    const CLASS_INPUT = CLASS_SELECT_INPUT + '-textinput';
    const CLASS_LIST = CLASS_SELECT_INPUT + '-list';
    const CLASS_TAGS = CLASS_SELECT_INPUT + '-tags';
    const CLASS_TAGS_EMPTY = CLASS_SELECT_INPUT + '-tags-empty';
    const CLASS_TAG = CLASS_SELECT_INPUT + '-tag';
    const CLASS_TAG_NOT_EVERYWHERE = CLASS_SELECT_INPUT + '-tag-not-everywhere';
    const CLASS_SHADOW = CLASS_SELECT_INPUT + '-shadow';
    const CLASS_FIT_HEIGHT = CLASS_SELECT_INPUT + '-fit-height';
    const CLASS_SELECTED$2 = 'pcui-selected';
    const CLASS_HIGHLIGHTED = CLASS_SELECT_INPUT + '-label-highlighted';
    const CLASS_CREATE_NEW = CLASS_SELECT_INPUT + '-create-new';
    const CLASS_OPEN$1 = 'pcui-open';

    const DEFAULT_BOTTOM_OFFSET = 25;


    /**
     * @name SelectInput
     * @class
     * @classdesc An input that allows selecting from a dropdown or entering tags.
     * @property {boolean} renderChanges If true then the input will flash when its value changes.
     * @property {string} placeholder The placeholder text to show next to the current value.
     * @property {boolean} multiSelect If true then the input value becomes an array allowing the selection of multiple options. Defaults to false.
     * @property {object[]} options The dropdown options of the input. Contains an array of objects with the following format {v: Any, t: String} where v is the value and t is the text of the option.
     * @property {Array} invalidOptions An array of values against which new values are checked before they are created. If a value is in the array it will not be created.
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     */
    class SelectInput extends Element {
        /**
         * Creates a new SelectInput.
         *
         * @param {object} args - The arguments. Extends the pcui.Element constructor arguments.
         * @param {boolean} [args.allowNull] - If true then null is a valid input value. Defaults to false.
         * @param {boolean} [args.allowInput] - If true then a text field is shown for the user to search for values or enter new ones. Defaults to false.
         * @param {boolean} [args.allowCreate] - If true then the input allows creating new values from the text field. Only used when allowInput is true. Defaults to false.
         * @param {Function} [args.createFn] - A function to be executed when the user selects to create a new value. The function takes the new value as a parameter.
         * @param {string} [args.createLabelText] - The placeholder text to show when creating a new value. Used when allowInput and allowCreate are both true.
         * @param {string} [args.type] - The type of each value. Can be one of 'string', 'number' or 'boolean'.
         */
        constructor(args) {
            if (!args) args = {};

            // main container
            const container = new Container({ dom: args.dom });
            super(container.dom, args);
            this._container = container;
            this._container.parent = this;

            this.class.add(CLASS_SELECT_INPUT);

            this._containerValue = new Container({
                class: CLASS_SELECT_INPUT_CONTAINER_VALUE
            });
            this._container.append(this._containerValue);

            // focus / hover shadow element
            this._domShadow = document.createElement('div');
            this._domShadow.classList.add(CLASS_SHADOW);
            this._containerValue.append(this._domShadow);

            this._allowInput = args.allowInput || false;
            if (this._allowInput) {
                this.class.add(CLASS_ALLOW_INPUT);
            }

            this._allowCreate = args.allowCreate || false;
            this._createFn = args.createFn;
            this._createLabelText = args.createLabelText || null;

            // displays current value
            this._labelValue = new Label({
                class: CLASS_VALUE,
                tabIndex: 0
            });
            this._labelValue.on('click', this._onValueClick.bind(this));
            this._containerValue.append(this._labelValue);

            this._timeoutLabelValueTabIndex = null;

            // dropdown icon
            this._labelIcon = new Label({
                class: CLASS_ICON$1,
                hidden: args.allowInput && args.multiSelect
            });
            this._containerValue.append(this._labelIcon);

            // input for searching or adding new entries
            this._input = new TextInput({
                class: CLASS_INPUT,
                blurOnEnter: false,
                keyChange: true
            });
            this._containerValue.append(this._input);

            this._lastInputValue = '';
            this._suspendInputChange = false;
            this._input.on('change', this._onInputChange.bind(this));
            this._input.on('keydown', this._onInputKeyDown.bind(this));
            this._input.on('focus', this._onFocus.bind(this));
            this._input.on('blur', this._onBlur.bind(this));

            if (args.placeholder) {
                this.placeholder = args.placeholder;
            }

            // dropdown list
            this._containerOptions = new Container({
                class: CLASS_LIST,
                hidden: true
            });
            this._containerValue.append(this._containerOptions);

            // tags container
            this._containerTags = new Container({
                class: CLASS_TAGS,
                flex: true,
                flexDirection: 'row',
                hidden: true
            });
            this._container.append(this._containerTags);

            if (args.multiSelect) {
                this.class.add(CLASS_MULTI_SELECT);
                this._containerTags.hidden = false;
            }

            // events
            this._domEvtKeyDown = this._onKeyDown.bind(this);
            this._domEvtFocus = this._onFocus.bind(this);
            this._domEvtBlur = this._onBlur.bind(this);
            this._domEvtMouseDown = this._onMouseDown.bind(this);
            this._domEvtWindowMouseDown = this._onWindowMouseDown.bind(this);
            this._domEvtWheel = this._onWheel.bind(this);

            this._labelValue.dom.addEventListener('keydown', this._domEvtKeyDown);
            this._labelValue.dom.addEventListener('focus', this._domEvtFocus);
            this._labelValue.dom.addEventListener('blur', this._domEvtBlur);
            this._labelValue.dom.addEventListener('mousedown', this._domEvtMouseDown);

            this._containerOptions.dom.addEventListener('wheel', this._domEvtWheel, { passive: true });

            this.on('hide', this.close.bind(this));

            this._type = args.type || 'string';

            this._optionsIndex = {};
            this._labelsIndex = {};
            this._labelHighlighted = null;
            this.invalidOptions = args.invalidOptions;
            this.options = args.options || [];
            this._optionsFn = args.optionsFn;

            this._allowNull = args.allowNull || false;

            this._values = null;

            if (args.value !== undefined) {
                this.value = args.value;
            } else if (args.defaultValue) {
                this.value = args.defaultValue;
            } else {
                this.value = null;
            }

            this.renderChanges = args.renderChanges || false;

            this.on('change', () => {
                this._updateInputFieldsVisibility();

                if (this.renderChanges && !this.multiSelect) {
                    this._labelValue.flash();
                }
            });

            this._updateInputFieldsVisibility(false);
        }

        _initializeCreateLabel() {
            const container = new Container({
                class: CLASS_CREATE_NEW,
                flex: true,
                flexDirection: 'row'
            });

            const label = new Label({
                text: this._input.value,
                tabIndex: -1
            });
            container.append(label);

            let evtChange = this._input.on('change', (value) => {
                // check if label is destroyed
                // during change event
                if (label.destroyed) return;
                label.text = value;
                if (this.invalidOptions && this.invalidOptions.indexOf(value) !== -1) {
                    if (!container.hidden) {
                        container.hidden = true;
                        this._resizeShadow();
                    }
                } else {
                    if (container.hidden) {
                        container.hidden = false;
                        this._resizeShadow();
                    }
                }
            });

            container.on('click', (e) => {
                e.stopPropagation();

                const text = label.text;

                this.focus();
                this.close();

                if (this._createFn) {
                    this._createFn(text);
                } else if (text) {
                    this._onSelectValue(text);
                }
            });

            label.on('destroy', () => {
                evtChange.unbind();
                evtChange = null;
            });

            const labelCreateText = new Label({
                text: this._createLabelText
            });
            container.append(labelCreateText);

            this._containerOptions.append(container);

            return container;
        }

        _convertSingleValue(value) {
            if (value === null && this._allowNull) return value;

            if (this._type === 'string') {
                if (!value) {
                    value = '';
                } else {
                    value = value.toString();
                }
            } else if (this._type === 'number') {
                if (!value) {
                    value = 0;
                } else {
                    value = parseInt(value, 10);
                }
            } else if (this._type === 'boolean') {
                return !!value;
            }

            return value;
        }

        _convertValue(value) {
            if (value === null && this._allowNull) return value;

            if (this.multiSelect) {
                if (!Array.isArray(value)) return value;

                return value.map(val => this._convertSingleValue(val));
            }

            return this._convertSingleValue(value);
        }

        // toggle dropdown list
        _onValueClick() {
            if (!this.enabled || this.readOnly) return;

            this.toggle();
        }

        // Update our value with the specified selected option
        _onSelectValue(value) {
            value = this._convertSingleValue(value);

            if (!this.multiSelect) {
                this.value = value;
                return;
            }

            if (this._values) {
                let dirty = false;
                this._values.forEach((arr) => {
                    if (!arr) {
                        arr = [value];
                        dirty = true;
                    } else {
                        if (arr.indexOf(value) === -1) {
                            arr.push(value);
                            dirty = true;
                        }
                    }
                });

                if (dirty) {
                    this._onMultipleValuesChange(this._values);

                    this.emit('change', this.value);

                    if (this._binding) {
                        this._binding.addValues([value]);
                    }
                }
            } else {
                if (!this._value || !Array.isArray(this._value)) {
                    this.value = [value];
                } else {
                    if (this._value.indexOf(value) === -1) {
                        this._value.push(value);

                        this._addTag(value);

                        this.emit('change', this.value);

                        if (this._binding) {
                            this._binding.addValues([value]);
                        }
                    }
                }
            }
        }

        _highlightLabel(label) {
            if (this._labelHighlighted === label) return;

            if (this._labelHighlighted) {
                this._labelHighlighted.class.remove(CLASS_HIGHLIGHTED);
            }

            this._labelHighlighted = label;

            if (this._labelHighlighted) {
                this._labelHighlighted.class.add(CLASS_HIGHLIGHTED);

                    // scroll into view if necessary
                const labelTop = this._labelHighlighted.dom.offsetTop;
                const scrollTop = this._containerOptions.dom.scrollTop;
                if (labelTop < scrollTop) {
                    this._containerOptions.dom.scrollTop = labelTop;
                } else if (labelTop + this._labelHighlighted.height > this._containerOptions.height + scrollTop) {
                    this._containerOptions.dom.scrollTop = labelTop + this._labelHighlighted.height - this._containerOptions.height;
                }
            }
        }

        // when the value is changed show the correct title
        _onValueChange(value) {
            if (!this.multiSelect) {
                this._labelValue.value = this._optionsIndex[value] || '';

                value = '' + value;
                for (var key in this._labelsIndex) {
                    if (key === value) {
                        this._labelsIndex[key].class.add(CLASS_SELECTED$2);
                    } else {
                        this._labelsIndex[key].class.remove(CLASS_SELECTED$2);
                    }
                }
            } else {
                this._labelValue.value = '';
                this._containerTags.clear();
                this._containerTags.class.add(CLASS_TAGS_EMPTY);

                if (value && Array.isArray(value)) {
                    value.forEach((val) => {
                        this._addTag(val);
                        if (this._labelsIndex[val]) {
                            this._labelsIndex[val].class.add(CLASS_SELECTED$2);
                        }
                    });

                    for (const key in this._labelsIndex) {
                        if (value.indexOf(this._convertSingleValue(key)) !== -1) {
                            this._labelsIndex[key].class.add(CLASS_SELECTED$2);
                        } else {
                            this._labelsIndex[key].class.remove(CLASS_SELECTED$2);
                        }
                    }
                }
            }
        }

        _onMultipleValuesChange(values) {
            this._labelValue.value = '';
            this._containerTags.clear();
            this._containerTags.class.add(CLASS_TAGS_EMPTY);

            const tags = {};
            const valueCounts = {};
            values.forEach((arr) => {
                if (!arr) return;
                arr.forEach((val) => {
                    if (!tags[val]) {
                        tags[val] = this._addTag(val);
                        valueCounts[val] = 1;
                    } else {
                        valueCounts[val]++;
                    }
                });
            });

            // add special class to tags that do not exist everywhere
            for (var val in valueCounts) {
                if (valueCounts[val] !== values.length) {
                    tags[val].class.add(CLASS_TAG_NOT_EVERYWHERE);
                    if (this._labelsIndex[val]) {
                        this._labelsIndex[val].class.remove(CLASS_SELECTED$2);
                    }
                }
            }
        }

        _addTag(value) {
            const container = new Container({
                flex: true,
                flexDirection: 'row',
                class: CLASS_TAG
            });

            container.append(new Label({
                text: this._optionsIndex[value] || value
            }));

            const btnRemove = new Button({
                size: 'small',
                icon: 'E132',
                tabIndex: -1
            });

            container.append(btnRemove);

            btnRemove.on('click', () => this._removeTag(container, value));

            this._containerTags.append(container);
            this._containerTags.class.remove(CLASS_TAGS_EMPTY);

            if (this._labelsIndex[value]) {
                this._labelsIndex[value].class.add(CLASS_SELECTED$2);
            }

            container.value = value;

            return container;
        }

        _removeTag(tagElement, value) {
            tagElement.destroy();

            if (this._labelsIndex[value]) {
                this._labelsIndex[value].class.remove(CLASS_SELECTED$2);
            }

            if (this._values) {
                this._values.forEach((arr) => {
                    if (!arr) return;
                    const idx = arr.indexOf(value);
                    if (idx !== -1) {
                        arr.splice(idx, 1);
                    }
                });
            } else if (this._value && Array.isArray(this._value)) {
                const idx = this._value.indexOf(value);
                if (idx !== -1) {
                    this._value.splice(idx, 1);
                }
            }

            this.emit('change', this.value);

            if (this._binding) {
                this._binding.removeValues([value]);
            }
        }

        _onInputChange(value) {
            if (this._suspendInputChange) return;

            if (this._lastInputValue === value) return;

            this.open();

            this._lastInputValue = value;

            this._filterOptions(value);
        }

        _filterOptions(filter) {
            // first remove all options
            // then search the options for best matches
            // and add them back in best match order
            const containerDom = this._containerOptions.dom;
            while (containerDom.firstChild) {
                containerDom.removeChild(containerDom.lastChild);
            }

            if (filter) {
                const searchOptions = this.options.map((option) => {
                    return [option.t, option.v];
                });
                const searchResults = searchItems(searchOptions, filter);
                searchResults.forEach((value) => {
                    containerDom.appendChild(this._labelsIndex[value].dom);
                });

            } else {
                this.options.forEach((option) => {
                    containerDom.appendChild(this._labelsIndex[option.v].dom);
                });
            }

            // append create label in the end
            if (this._createLabelContainer) {
                containerDom.appendChild(this._createLabelContainer.dom);
            }

            if (containerDom.firstChild) {
                this._highlightLabel(containerDom.firstChild.ui);
            }

            this._resizeShadow();
        }

        _onInputKeyDown(evt) {
            if (evt.keyCode === 13 && this.enabled && !this.readOnly) {
                evt.stopPropagation();
                evt.preventDefault();

                // on enter
                let value;

                if (this._labelHighlighted && this._labelHighlighted._optionValue !== undefined) {
                    value = this._labelHighlighted._optionValue;
                } else {
                    value = this._input.value;
                }

                if (value !== undefined) {
                    this.focus();
                    this.close();

                    if (this._optionsIndex[value]) {
                        this._onSelectValue(value);
                    } else if (this._allowCreate) {
                        if (this._createFn) {
                            this._createFn(value);
                        } else {
                            this._onSelectValue(value);
                        }
                    }

                    return;
                }
            }

            this._onKeyDown(evt);
        }

        _onWindowMouseDown(evt) {
            if (this.dom.contains(evt.target)) return;
            this.close();
        }

        _onKeyDown(evt) {
            // close options on ESC and blur
            if (evt.keyCode === 27) {
                this.close();
                return;
            }

            // handle tab
            if (evt.keyCode === 9) {
                this.close();
                return;
            }

            if (!this.enabled || this.readOnly) return;

            if (evt.keyCode === 13 && !this._allowInput) {
                if (this._labelHighlighted && this._labelHighlighted._optionValue !== undefined) {
                    this._onSelectValue(this._labelHighlighted._optionValue);
                    this.close();
                }

                return;
            }

            if ([38, 40].indexOf(evt.keyCode) === -1) {
                return;
            }

            evt.stopPropagation();
            evt.preventDefault();

            if ((this._allowInput || this.multiSelect) && this._containerOptions.hidden) {
                this.open();
                return;
            }

            if (this._containerOptions.hidden) {
                if (!this._options.length) return;

                let index = -1;
                for (let i = 0; i < this._options.length; i++) {
                    if (this._options[i].v === this.value) {
                        index = i;
                        break;
                    }
                }

                if (evt.keyCode === 38) {
                    index--;
                } else if (evt.keyCode === 40) {
                    index++;
                }

                if (index >= 0 && index < this._options.length) {
                    this._onSelectValue(this._options[index].v);
                }
            } else {
                if (!this._containerOptions.dom.childNodes.length) return;

                if (!this._labelHighlighted) {
                    this._highlightLabel(this._containerOptions.dom.childNodes[0].ui);
                } else {
                    let highlightedLabelDom = this._labelHighlighted.dom;
                    do {
                        if (evt.keyCode === 38) {
                            highlightedLabelDom = highlightedLabelDom.previousSibling;
                        } else if (evt.keyCode === 40) {
                            highlightedLabelDom = highlightedLabelDom.nextSibling;
                        }
                    } while (highlightedLabelDom && highlightedLabelDom.ui.hidden);

                    if (highlightedLabelDom) {
                        this._highlightLabel(highlightedLabelDom.ui);
                    }
                }
            }
        }

        _resizeShadow() {
            this._domShadow.style.height = (this._containerValue.height + this._containerOptions.height) + 'px';
        }

        _onMouseDown() {
            if (!this._allowInput) {
                this.focus();
            }
        }

        _onFocus() {
            this.class.add(FOCUS);
            this.emit('focus');
            if (!this._input.hidden) {
                this.open();
            }
        }

        _onBlur() {
            this.class.remove(FOCUS);
            this.emit('blur');
        }

        _onWheel(evt) {
            // prevent scrolling on other stuff like the viewport
            // when we are scrolling on the select input
            evt.stopPropagation();
        }

        _updateInputFieldsVisibility(focused) {
            let showInput = false;
            let focusInput = false;

            if (this._allowInput) {
                if (focused) {
                    showInput = true;
                    focusInput = true;
                } else {
                    showInput = this.multiSelect || !this._labelsIndex[this.value];
                }
            }

            this._labelValue.hidden = showInput;
            this._labelIcon.hidden = showInput;
            this._input.hidden = !showInput;

            if (focusInput) {
                this._input.focus();
            }

            if (!this._labelValue.hidden) {
                // prevent label from being focused
                // right after input gets unfocused
                this._labelValue.tabIndex = -1;

                if (!this._timeoutLabelValueTabIndex) {
                    this._timeoutLabelValueTabIndex = requestAnimationFrame(() => {
                        this._timeoutLabelValueTabIndex = null;
                        this._labelValue.tabIndex = 0;
                    });
                }
            }

        }

        focus() {
            if (this._input.hidden) {
                this._labelValue.dom.focus();
            } else {
                this._input.focus();
            }
        }

        blur() {
            if (this._allowInput) {
                this._input.blur();
            } else {
                this._labelValue.dom.blur();
            }
        }

        /**
         * @name SelectInput#open
         * @description Opens the dropdown menu
         */
        open() {
            if (!this._containerOptions.hidden || !this.enabled || this.readOnly) return;

            this._updateInputFieldsVisibility(true);

            // auto-update options if necessary
            if (this._optionsFn) {
                this.options = this._optionsFn();
            }

            if (this._containerOptions.dom.childNodes.length === 0) return;

            // highlight label that displays current value
            this._containerOptions.forEachChild((label) => {
                label.hidden = false;
                if (label._optionValue === this.value) {
                    this._highlightLabel(label);
                }
            });
            if (!this._labelHighlighted) {
                this._highlightLabel(this._containerOptions.dom.childNodes[0].ui);
            }

            // show options
            this._containerOptions.hidden = false;
            this.class.add(CLASS_OPEN$1);

            // register keydown on entire window
            window.addEventListener('keydown', this._domEvtKeyDown);
            // register mousedown on entire window
            window.addEventListener('mousedown', this._domEvtWindowMouseDown);

            // if the dropdown list goes below the window show it above the field
            const startField = this._allowInput ? this._input.dom : this._labelValue.dom;
            const rect = startField.getBoundingClientRect();
            let fitHeight = (rect.bottom + this._containerOptions.height + DEFAULT_BOTTOM_OFFSET >= window.innerHeight);
            if (fitHeight && rect.top - this._containerOptions.height < 0) {
                // if showing it above the field means that some of it will not be visible
                // then show it below instead and adjust the max height to the maximum available space
                fitHeight = false;
                this._containerOptions.style.maxHeight = (window.innerHeight - rect.bottom - DEFAULT_BOTTOM_OFFSET) + 'px';
            }

            if (fitHeight) {
                this.class.add(CLASS_FIT_HEIGHT);
            } else {
                this.class.remove(CLASS_FIT_HEIGHT);
            }

            // resize the outer shadow to fit the element and the dropdown list
            // we need this because the dropdown list is position: absolute
            this._resizeShadow();
        }

        /**
         * @name SelectInput#close
         * @description Closes the dropdown menu
         */
        close() {
            // there is a potential bug here if the user has set a max height
            // themselves then this will be overriden
            this._containerOptions.style.maxHeight = '';

            this._highlightLabel(null);

            this._updateInputFieldsVisibility(false);

            this._suspendInputChange = true;
            this._input.value = '';
            if (this._lastInputValue) {
                this._lastInputValue = '';
                this._filterOptions(null);
            }
            this._suspendInputChange = false;

            if (this._containerOptions.hidden) return;

            this._containerOptions.hidden = true;

            this._domShadow.style.height = '';

            this.class.remove(CLASS_OPEN$1);
            window.removeEventListener('keydown', this._domEvtKeyDown);
            window.removeEventListener('mousedown', this._domEvtWindowMouseDown);
        }

        /**
         * @name SelectInput#toggle
         * @description Toggles the dropdown menu
         */
        toggle() {
            if (this._containerOptions.hidden) {
                this.open();
            } else {
                this.close();
            }
        }

        unlink() {
            super.unlink();

            if (!this._containerOptions.hidden) {
                this.close();
            }
        }

        destroy() {
            if (this._destroyed) return;

            this._labelValue.dom.removeEventListener('keydown', this._domEvtKeyDown);
            this._labelValue.dom.removeEventListener('mousedown', this._domEvtMouseDown);
            this._labelValue.dom.removeEventListener('focus', this._domEvtFocus);
            this._labelValue.dom.removeEventListener('blur', this._domEvtBlur);

            this._containerOptions.dom.removeEventListener('wheel', this._domEvtWheel);

            window.removeEventListener('keydown', this._domEvtKeyDown);
            window.removeEventListener('mousedown', this._domEvtWindowMouseDown);

            if (this._timeoutLabelValueTabIndex) {
                cancelAnimationFrame(this._timeoutLabelValueTabIndex);
                this._timeoutLabelValueTabIndex = null;
            }

            super.destroy();
        }

        get options() {
            return this._options.slice();
        }

        set options(value) {
            if (this._options && this._options === value) return;

            this._containerOptions.clear();
            this._labelHighlighted = null;
            this._optionsIndex = {};
            this._labelsIndex = {};
            this._options = value;

            // store each option value -> title pair in the optionsIndex
            this._options.forEach((option) => {
                this._optionsIndex[option.v] = option.t;
                if (option.v === '') return;

                const label = new Label({
                    text: option.t,
                    tabIndex: -1
                });

                label._optionValue = option.v;

                // store labels in an index too
                this._labelsIndex[option.v] = label;

                // on clicking an option set it as the value and close the dropdown list
                label.on('click', (e) => {
                    e.stopPropagation();
                    this._onSelectValue(option.v);
                    this.close();
                });
                this._containerOptions.append(label);
            });

            this._createLabelContainer = null;
            if (this._createLabelText) {
                this._createLabelContainer = this._initializeCreateLabel();
            }

            if (this.multiSelect && this._values) {
                this._onMultipleValuesChange(this._values);
            } else {
                this._onValueChange(this.value);
            }

            if (this._lastInputValue) {
                this._filterOptions(this._lastInputValue);
            }
        }

        get invalidOptions() {
            return this._invalidOptions;
        }

        set invalidOptions(value) {
            this._invalidOptions = value || null;
        }

        get multiSelect() {
            return this.class.contains(CLASS_MULTI_SELECT);
        }

        get value() {
            if (!this.multiSelect) {
                return this._value;
            }

            // if multi-select then construct an array
            // value from the tags that are currently visible
            const result = [];
            this._containerTags.dom.childNodes.forEach((dom) => {
                result.push(dom.ui.value);
            });

            return result;
        }

        set value(value) {
            this._values = null;

            this._suspendInputChange = true;
            this._input.value = '';
            if (this._lastInputValue) {
                this._lastInputValue = '';
                this._filterOptions(null);
            }
            this._suspendInputChange = false;

            this.class.remove(MULTIPLE_VALUES);

            value = this._convertValue(value);

            if (this._value === value || this.multiSelect && this._value && this._value.equals(value)) {
                // if the value is null because we are showing multiple values
                // but someone wants to actually set the value of all observers to null
                // then make sure we do not return early
                if (value !== null || !this._allowNull || !this.class.contains(MULTIPLE_VALUES)) {
                    return;
                }
            }

            this._value = value;
            this._onValueChange(value);

            this.emit('change', value);

            if (this._binding) {
                this._binding.setValue(value);
            }
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            values = values.map(this._convertValue.bind(this));

            let different = false;
            const value = values[0];
            const multiSelect = this.multiSelect;

            this._values = null;

            for (let i = 1; i < values.length; i++) {
                if (values[i] !== value && (!multiSelect || !values[i] || !values[i].equals(value))) {
                    different = true;
                    break;
                }
            }

            if (different) {
                this._labelValue.values = values;

                // show all different tags
                if (multiSelect) {
                    this._values = values;
                    this._value = null;
                    this._onMultipleValuesChange(this._values);
                    this.emit('change', this.value);
                } else {
                    if (this._value !== null) {
                        this._value = null;
                        this.emit('change', null);
                    }
                }

                this.class.add(MULTIPLE_VALUES);
            } else {
                this.value = values[0];
            }
        }

        get placeholder() {
            return this._input.placeholder;
        }

        set placeholder(value) {
            this._input.placeholder = value;
        }
    }

    Element.register('select', SelectInput, { renderChanges: true });
    Element.register('multiselect', SelectInput, { multiSelect: true, renderChanges: true });
    Element.register('tags', SelectInput, { allowInput: true, allowCreate: true, multiSelect: true, renderChanges: true });

    ___$insertStyle("@keyframes animation-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.pcui-spinner {\n  display: inline-block;\n  margin: 6px;\n  vertical-align: middle;\n}\n.pcui-spinner > path {\n  animation-name: animation-spin;\n  animation-duration: 750ms;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n  transform-origin: center;\n}\n.pcui-spinner.pcui-error > path {\n  animation: none;\n  fill: #ff2020;\n}\n.pcui-spinner.pcui-error > path.pcui-spinner-highlight {\n  fill: #ff7777;\n}");

    const CLASS_ROOT$5 = 'pcui-spinner';

    function createSmallThick(size, dom) {
        const spinner = dom || document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        spinner.classList.add('spin');
        spinner.setAttribute('width', size);
        spinner.setAttribute('height', size);
        spinner.setAttribute('viewBox', '0 0 14 14');
        spinner.setAttribute('fill', 'none');
        spinner.innerHTML = '<path d="M7 14C3.13871 14 0 10.8613 0 7C0 3.13871 3.13871 0 7 0C10.8613 0 14 3.13871 14 7C14 10.8613 10.8613 14 7 14ZM7 2.25806C4.38064 2.25806 2.25806 4.38064 2.25806 7C2.25806 9.61935 4.38064 11.7419 7 11.7419C9.61935 11.7419 11.7419 9.61935 11.7419 7C11.7419 4.38064 9.61935 2.25806 7 2.25806Z" fill="#773417"/><path class="pcui-spinner-highlight" d="M7 14V11.7419C9.61935 11.7419 11.7419 9.61935 11.7419 7H14C14 10.8613 10.8613 14 7 14Z" fill="#FF6600"/>';
        return spinner;
    }
    /**
     * @name Spinner
     * @augments Element
     * @class
     * @classdesc Represents a spinning icon
     */
    class Spinner extends Element {
        /**
         * Creates a new spinner.
         *
         * @param {object} [args] - The arguments
         * @param {number} [args.size=12] - The pixel size of the spinner
         */
        constructor(args) {
            args = Object.assign({
                type: Spinner.TYPE_SMALL_THICK
            }, args);

            let dom = null;

            if (args.type === Spinner.TYPE_SMALL_THICK) {
                dom = createSmallThick(args.size || 12, args.dom);
            }

            super(dom, args);

            this.class.add(CLASS_ROOT$5);
        }
    }

    Spinner.TYPE_SMALL_THICK = 'small-thick';

    ___$insertStyle(".pcui-progress {\n  height: 4px;\n  background-color: #20292b;\n  transition: opacity 100ms;\n  width: 100%;\n}\n.pcui-progress .pcui-progress-inner {\n  width: 0%;\n  height: inherit;\n  background: #f60;\n  background: -webkit-gradient(left top, right bottom, color-stop(0%, #ff6600), color-stop(25%, #ff6600), color-stop(26%, #a84300), color-stop(50%, #a84300), color-stop(51%, #ff6600), color-stop(75%, #ff6600), color-stop(76%, #a84300), color-stop(100%, #a84300));\n  background: -webkit-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);\n  background: -moz-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);\n  background: -ms-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);\n  background: -o-linear-gradient(-45deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);\n  background: linear-gradient(135deg, #ff6600 0%, #ff6600 25%, #a84300 26%, #a84300 50%, #ff6600 51%, #ff6600 75%, #a84300 76%, #a84300 100%);\n  background-position: 0px 0px;\n  background-size: 24px 24px;\n  background-repeat: repeat;\n  -webkit-animation: pcui-progress-background 1000ms linear infinite;\n  animation: pcui-progress-background 1000ms linear infinite;\n}\n\n.pcui-progress.pcui-error .pcui-progress-inner {\n  background: #f60;\n  background: -webkit-gradient(left top, right bottom, color-stop(0%, #ff7777), color-stop(25%, #ff7777), color-stop(26%, #ff2020), color-stop(50%, #ff2020), color-stop(51%, #ff7777), color-stop(75%, #ff7777), color-stop(76%, #ff2020), color-stop(100%, #ff2020));\n  background: -webkit-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);\n  background: -moz-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);\n  background: -ms-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);\n  background: -o-linear-gradient(-45deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);\n  background: linear-gradient(135deg, #ff7777 0%, #ff7777 25%, #ff2020 26%, #ff2020 50%, #ff7777 51%, #ff7777 75%, #ff2020 76%, #ff2020 100%);\n  background-position: 0px 0px;\n  background-size: 24px 24px;\n  background-repeat: repeat;\n  -webkit-animation: none;\n  animation: none;\n}\n\n@-webkit-keyframes pcui-progress-background {\n  from {\n    background-position: 0px 0;\n  }\n  to {\n    background-position: 24px 0;\n  }\n}\n@keyframes pcui-progress-background {\n  from {\n    background-position: 0px 0;\n  }\n  to {\n    background-position: 24px 0;\n  }\n}");

    const CLASS_ROOT$4 = 'pcui-progress';
    const CLASS_INNER = CLASS_ROOT$4 + '-inner';
    /**
     * @name Progress
     * @class
     * @classdesc Represents a bar that can highlight progress of an activity.
     * @augments Container
     * @property {number} value Gets / sets the value of the progress bar (between 0 and 100).
     */
    class Progress extends Container {
        constructor(args) {
            if (!args) args = {};
            super(args);
            this.class.add(CLASS_ROOT$4);

            this._inner = new Element();
            this.append(this._inner);
            this._inner.class.add(CLASS_INNER);

            if (args.value !== undefined) {
                this.value = args.value;
            }
        }

        set value(val) {
            if (this._value === val) return;

            this._value = val;
            this._inner.width = `${this._value}%`;
            this.emit('change', val);
        }

        get value() {
            return this._value;
        }
    }

    Element.register('progress', Progress);

    ___$insertStyle(".pcui-contextmenu {\n  box-sizing: border-box;\n  border: 1px solid #293538;\n  border-radius: 2px;\n  background-color: #2c393c;\n  color: #b1b8ba;\n  font-size: 12px;\n  font-weight: 400;\n  display: none;\n  position: fixed;\n  z-index: 9999;\n}\n\n.pcui-contextmenu-active {\n  display: block;\n}\n\n.pcui-contextmenu div {\n  background-color: #2c393c;\n  width: 150px;\n  position: absolute;\n}\n.pcui-contextmenu div:before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: -1;\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);\n}\n\n.pcui-contextmenu-parent {\n  cursor: auto !important;\n}\n.pcui-contextmenu-parent div {\n  display: none;\n}\n\n.pcui-contextmenu-parent:hover div {\n  display: block;\n}\n\n.pcui-contextmenu-parent-active div {\n  display: block;\n}\n\n.pcui-contextmenu {\n  div-font-weight: bold;\n}\n.pcui-contextmenu div:hover {\n  background-color: #364346;\n  cursor: pointer;\n}\n.pcui-contextmenu div.pcui-contextmenu-parent:after {\n  content: \"\\e160\";\n  font-family: \"pc-icon\";\n  font-size: 14px;\n  text-align: center;\n  background-color: transparent;\n  color: #9ba1a3;\n  line-height: 14px;\n  position: absolute;\n  right: 4px;\n  top: 50%;\n  transform: translateY(-50%);\n}");

    const CLASS_ContextMenu = 'pcui-contextmenu';
    const CLASS_ContextMenu_active = CLASS_ContextMenu + '-active';
    const CLASS_ContextMenu_parent = CLASS_ContextMenu + '-parent';
    const CLASS_ContextMenu_child = CLASS_ContextMenu + '-child';
    const CLASS_ContextMenu_parent_active = CLASS_ContextMenu_parent + '-active';

    /**
     * @name ContextMenu
     * @class
     * @classdesc Represents a context menu.
     */
    class ContextMenu {
        /**
         * Creates a new ContextMenu.
         *
         * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
         * @param {object[]} [args.items] - The array of items used to populate the array. Example item: { 'text': 'Hello World', 'onClick': () => console.log('Hello World') }.
         * @param {object} [args.dom] - The dom element to attach this context menu to.
         * @param {object} [args.triggerElement] - The dom element that will trigger the context menu to open when right clicked. If undefined args.dom will be used.
         */
        constructor(args) {
            if (!args) args = {};

            this._menu = new Container({ dom: args.dom });
            this._menu.contextMenu = this;
            this.args = args;
            this._menu.class.add(CLASS_ContextMenu);
            var menu = this._menu;

            var removeMenu = () => {
                this._menu.class.remove(CLASS_ContextMenu_active);
                document.removeEventListener('click', removeMenu);
            };

            var triggerElement = args.triggerElement || args.dom.parentElement;
            if (triggerElement) {
                this._contextMenuEvent = triggerElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    menu.class.add(CLASS_ContextMenu_active);
                    var maxMenuHeight = args.items.length * 27.0;
                    var maxMenuWidth = 150.0;
                    var left = e.clientX;
                    var top = e.clientY;
                    if (maxMenuHeight + top > window.innerHeight) {
                        var topDiff = (maxMenuHeight + top) - window.innerHeight;
                        top -= topDiff;
                    }
                    if (maxMenuWidth + left > window.innerWidth) {
                        var leftDiff = (maxMenuWidth + left) - window.innerWidth;
                        left -= leftDiff;
                    }
                    menu.dom.setAttribute("style", `left: ${left}px; top: ${top}px`);
                    document.addEventListener('click', removeMenu);
                });

                var mouseLeaveTimeout;
                menu.dom.addEventListener('mouseleave', () => {
                    mouseLeaveTimeout = setTimeout(() => {
                        removeMenu();
                    }, 500);
                });
                menu.dom.addEventListener('mouseenter', () => {
                    if (mouseLeaveTimeout) {
                        clearTimeout(mouseLeaveTimeout);

                    }
                });
            }

            if (!args.items) return;

            args.items.forEach((menuItem, i) => {
                var menuItemElement = new Container();
                menuItemElement.dom.setAttribute("style", `top: ${i * 27.0}px`);
                if (menuItem.onClick) {
                    menuItemElement.on('click', (e) => {
                        e.stopPropagation();
                        removeMenu();
                        menuItem.onClick(e);
                    });
                }
                var menuItemLabel = new Label({ text: menuItem.text });
                menuItemElement.append(menuItemLabel);
                this._menu.dom.append(menuItemElement.dom);
                if (menuItem.items) {
                    menuItem.items.forEach((childItem, j) => {
                        var childMenuItemElement = new Container({ class: CLASS_ContextMenu_child });
                        childMenuItemElement.dom.setAttribute("style", `top: ${j * 27.0}px; left: 150px;`);
                        childMenuItemElement.on('click', (e) => {
                            e.stopPropagation();
                            removeMenu();
                            childItem.onClick(e);
                        });
                        var childMenuItemLabel = new Label({ text: childItem.text });
                        childMenuItemElement.append(childMenuItemLabel);
                        menuItemElement.append(childMenuItemElement);
                    });
                    menuItemElement.class.add(CLASS_ContextMenu_parent);
                }
                menuItemElement.dom.addEventListener('mouseover', (e) => {
                    // if (!e.fromElement.classList.contains('pcui-contextmenu-parent')) return;
                    this._menu.forEachChild(node => node.class.remove(CLASS_ContextMenu_parent_active));
                    menuItemElement.class.add(CLASS_ContextMenu_parent_active);

                    var maxMenuHeight = menuItem.items ? menuItem.items.length * 27.0 : 0.0;
                    var maxMenuWidth = 150.0;
                    var left = e.clientX + maxMenuWidth > window.innerWidth ? -maxMenuWidth + 2.0 : maxMenuWidth;
                    var top = 0;
                    if (e.clientY + maxMenuHeight > window.innerHeight) {
                        top = -maxMenuHeight + 27.0;
                    }
                    menuItemElement.forEachChild((node, j) => {
                        if (j === 0) return;
                        node.dom.setAttribute("style", `top: ${top + (j - 1) * 27.0}px; left: ${left}px;`);
                    });
                });
            });
        }
    }

    Element.register('contextmenu', ContextMenu);

    const CLASS_ROOT$3 = 'pcui-treeview-item';
    const CLASS_ICON = CLASS_ROOT$3 + '-icon';
    const CLASS_TEXT$1 = CLASS_ROOT$3 + '-text';
    const CLASS_SELECTED$1 = CLASS_ROOT$3 + '-selected';
    const CLASS_OPEN = CLASS_ROOT$3 + '-open';
    const CLASS_CONTENTS = CLASS_ROOT$3 + '-contents';
    const CLASS_EMPTY = CLASS_ROOT$3 + '-empty';
    const CLASS_RENAME = CLASS_ROOT$3 + '-rename';

    /**
     * @event
     * @name TreeViewItem#select
     * @description Fired when we select the TreeViewItem.
     * @param {TreeViewItem} item - The item
     */

    /**
     * @event
     * @name TreeViewItem#deselect
     * @description Fired when we deselect the TreeViewItem.
     * @param {TreeViewItem} item - The item
     */

    /**
     * @event
     * @name TreeViewItem#open
     * @description Fired when we open a TreeViewItem
     * @param {TreeViewItem} item - The item
     */

    /**
     * @event
     * @name TreeViewItem#close
     * @description Fired when we close the TreeViewItem.
     * @param {TreeViewItem} item - The item
     */

    /**
     * @name TreeViewItem
     * @class
     * @classdesc Represents a Tree View Item to be added to a pcui.TreeView.
     * @mixes IFocusable
     * @property {boolean} selected Whether the item is selected.
     * @property {boolean} allowSelect=true Whether the item can be selected.
     * @property {boolean} open Whether the item is open meaning showing its children.
     * @property {boolean} parentsOpen Whether the parents of the item are open or closed.
     * @property {boolean} allowDrag=true Whether this tree item can be dragged. Only considered if the parent treeview has allowDrag true.
     * @property {boolean} allowDrop=true Whether dropping is allowed on the tree item.
     * @property {string} text The text shown by the TreeViewItem.
     * @property {number} The number of direct children.
     * @property {Label} textLabel Gets the internal label that shows the text.
     * @property {Label} iconLabel Gets the internal label that shows the icon.
     * @property {TreeView} treeView Gets / sets the parent TreeView.
     * @property {TreeViewItem} firstChild Gets the first child item.
     * @property {TreeViewItem} lastChild Gets the last child item.
     * @property {TreeViewItem} nextSibling Gets the first sibling item.
     * @property {TreeViewItem} previousSibling Gets the last sibling item.
     */
    class TreeViewItem extends Container {
        /**
         * Creates a new TreeViewItem.
         *
         * @param {object} [args] - The arguments.
         */
        constructor(args) {
            if (!args) {
                args = {};
            }

            args.flex = true;

            super(args);

            this.class.add(CLASS_ROOT$3, CLASS_EMPTY);

            this._containerContents = new Container({
                class: CLASS_CONTENTS,
                flex: true,
                flexDirection: 'row',
                tabIndex: 0
            });
            this.append(this._containerContents);

            this._containerContents.dom.draggable = true;

            this._labelIcon = new Label({
                class: CLASS_ICON
            });
            this._containerContents.append(this._labelIcon);

            this._labelText = new Label({
                class: CLASS_TEXT$1
            });
            this._containerContents.append(this._labelText);

            this.allowSelect = (args.allowSelect !== undefined ? args.allowSelect : true);
            this.allowDrop = (args.allowDrop !== undefined ? args.allowDrop : true);
            this.allowDrag = (args.allowDrag !== undefined ? args.allowDrag : true);
            if (args.text) {
                this.text = args.text;
            }

            this._numChildren = 0;

            // used the the parent treeview
            this._treeOrder = -1;

            this._domEvtFocus = this._onContentFocus.bind(this);
            this._domEvtBlur = this._onContentBlur.bind(this);
            this._domEvtKeyDown = this._onContentKeyDown.bind(this);
            this._domEvtDragStart = this._onContentDragStart.bind(this);
            this._domEvtMouseDown = this._onContentMouseDown.bind(this);
            this._domEvtMouseUp = this._onContentMouseUp.bind(this);
            this._domEvtMouseOver = this._onContentMouseOver.bind(this);
            this._domEvtClick = this._onContentClick.bind(this);
            this._domEvtDblClick = this._onContentDblClick.bind(this);
            this._domEvtContextMenu = this._onContentContextMenu.bind(this);

            this._containerContents.dom.addEventListener('focus', this._domEvtFocus);
            this._containerContents.dom.addEventListener('blur', this._domEvtBlur);
            this._containerContents.dom.addEventListener('keydown', this._domEvtKeyDown);
            this._containerContents.dom.addEventListener('dragstart', this._domEvtDragStart);
            this._containerContents.dom.addEventListener('mousedown', this._domEvtMouseDown);
            this._containerContents.dom.addEventListener('mouseover', this._domEvtMouseOver);
            this._containerContents.dom.addEventListener('click', this._domEvtClick);
            this._containerContents.dom.addEventListener('dblclick', this._domEvtDblClick);
            this._containerContents.dom.addEventListener('contextmenu', this._domEvtContextMenu);
        }

        _onAppendChild(element) {
            super._onAppendChild(element);

            if (!(element instanceof TreeViewItem)) return;

            this._numChildren++;
            if (this._parent !== this._treeView) this.classRemove(CLASS_EMPTY);

            if (this._treeView) {
                this._treeView._onAppendTreeViewItem(element);
            }
        }

        _onRemoveChild(element) {
            if (element instanceof TreeViewItem) {
                this._numChildren--;
                if (this._numChildren === 0) {
                    this.classAdd(CLASS_EMPTY);
                }

                if (this._treeView) {
                    this._treeView._onRemoveTreeViewItem(element);
                }
            }

            super._onRemoveChild(element);
        }

        _onContentKeyDown(evt) {
            if (evt.target.tagName.toLowerCase() === 'input') return;

            if (!this.allowSelect) return;

            if (this._treeView) {
                this._treeView._onChildKeyDown(evt, this);
            }
        }

        _onContentMouseDown(evt) {
            if (!this._treeView || !this._treeView.allowDrag || !this._allowDrag) return;

            this._treeView._updateModifierKeys(evt);
            evt.stopPropagation();
        }

        _onContentMouseUp(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            window.removeEventListener('mouseup', this._domEvtMouseUp);
            if (this._treeView) {
                this._treeView._onChildDragEnd(evt, this);
            }
        }

        _onContentMouseOver(evt) {
            evt.stopPropagation();

            if (this._treeView) {
                this._treeView._onChildDragOver(evt, this);
            }

            // allow hover event
            super._onMouseOver(evt);
        }

        _onContentDragStart(evt) {
            evt.stopPropagation();
            evt.preventDefault();

            if (!this._treeView || !this._treeView.allowDrag) return;

            if (this.class.contains(CLASS_RENAME)) return;

            this._treeView._onChildDragStart(evt, this);

            window.addEventListener('mouseup', this._domEvtMouseUp);
        }

        _onContentClick(evt) {
            if (!this.allowSelect || evt.button !== 0) return;
            if (evt.target.tagName.toLowerCase() === 'input') return;

            evt.stopPropagation();

            const rect = this._containerContents.dom.getBoundingClientRect();
            if (this._numChildren > 0 && evt.clientX - rect.left < 0) {
                this.open = !this.open;
                if (evt.altKey) {
                    // apply to all children as well
                    this._dfs((node) => {
                        node.open = this.open;
                    });
                }
                this.focus();
            } else if (this._treeView) {
                this._treeView._onChildClick(evt, this);
            }
        }

        _dfs(fn) {
            fn(this);
            let child = this.firstChild;
            while (child) {
                child._dfs(fn);
                child = child.nextSibling;
            }
        }

        _onContentDblClick(evt) {
            if (!this._treeView || !this._treeView.allowRenaming || evt.button !== 0) return;
            if (evt.target.tagName.toLowerCase() === 'input') return;

            evt.stopPropagation();
            const rect = this._containerContents.dom.getBoundingClientRect();
            if (this.numChildren && evt.clientX - rect.left < 0) {
                return;
            }

            if (this.allowSelect) {
                this._treeView.deselect();
                this._treeView._onChildClick(evt, this);
            }

            this.rename();
        }

        _onContentContextMenu(evt) {
            if (this._treeView && this._treeView._onContextMenu) {
                this._treeView._onContextMenu(evt, this);
            }
        }

        _onContentFocus(evt) {
            this.emit('focus');
        }

        _onContentBlur(evt) {
            this.emit('blur');
        }

        rename() {
            this.classAdd(CLASS_RENAME);

            // show text input to enter new text
            const textInput = new TextInput({
                renderChanges: false,
                value: this.text,
                class: FONT_REGULAR
            });

            textInput.on('blur', () => {
                textInput.destroy();
            });

            textInput.on('destroy', () => {
                this.classRemove(CLASS_RENAME);
                this.focus();
            });

            textInput.on('change', (value) => {
                value = value.trim();
                if (value) {
                    this.text = value;
                    textInput.destroy();
                }
            });

            textInput.on('disable', () => {
                // make sure text input is editable even if this
                // tree item is disabled
                textInput.input.removeAttribute('readonly');
            });

            this._containerContents.append(textInput);

            textInput.focus(true);
        }

        focus() {
            this._containerContents.dom.focus();
        }

        blur() {
            this._containerContents.dom.blur();
        }

        destroy() {
            if (this._destroyed) return;

            this._containerContents.dom.removeEventListener('focus', this._domEvtFocus);
            this._containerContents.dom.removeEventListener('blur', this._domEvtBlur);
            this._containerContents.dom.removeEventListener('keydown', this._domEvtKeyDown);
            this._containerContents.dom.removeEventListener('mousedown', this._domEvtMouseDown);
            this._containerContents.dom.removeEventListener('dragstart', this._domEvtDragStart);
            this._containerContents.dom.removeEventListener('mouseover', this._domEvtMouseOver);
            this._containerContents.dom.removeEventListener('click', this._domEvtClick);
            this._containerContents.dom.removeEventListener('dblclick', this._domEvtDblClick);
            this._containerContents.dom.removeEventListener('contextmenu', this._domEvtContextMenu);

            window.removeEventListener('mouseup', this._domEvtMouseUp);

            super.destroy();
        }

        get selected() {
            return this._containerContents.class.contains(CLASS_SELECTED$1);
        }

        set selected(value) {
            if (value === this.selected) {
                if (value) {
                    this.focus();
                }

                return;
            }

            if (value) {
                this._containerContents.classAdd(CLASS_SELECTED$1);
                this.emit('select', this);
                if (this._treeView) {
                    this._treeView._onChildSelected(this);
                }

                this.focus();
            } else {
                this._containerContents.classRemove(CLASS_SELECTED$1);
                this.blur();
                this.emit('deselect', this);
                if (this._treeView) {
                    this._treeView._onChildDeselected(this);
                }
            }
        }

        get text() {
            return this._labelText.value;
        }

        set text(value) {
            if (this._labelText.value !== value) {
                this._labelText.value = value;
                if (this._treeView) {
                    this._treeView._onChildRename(this, value);
                }
            }
        }

        get textLabel() {
            return this._labelText;
        }

        get iconLabel() {
            return this._labelIcon;
        }

        get open() {
            return this.class.contains(CLASS_OPEN) || this.parent === this._treeView;
        }

        set open(value) {
            if (this.open === value) return;
            if (value) {
                if (!this.numChildren) return;

                this.classAdd(CLASS_OPEN);
                this.emit('open', this);
            } else {
                this.classRemove(CLASS_OPEN);
                this.emit('close', this);
            }
        }

        get parentsOpen() {
            let parent = this.parent;
            while (parent && parent instanceof TreeViewItem) {
                if (!parent.open) return false;
                parent = parent.parent;
            }

            return true;
        }

        set parentsOpen(value) {
            let parent = this.parent;
            while (parent && parent instanceof TreeViewItem) {
                parent.open = value;
                parent = parent.parent;
            }
        }

        get allowDrop() {
            return this._allowDrop;
        }

        set allowDrop(value) {
            this._allowDrop = value;
        }

        get allowDrag() {
            return this._allowDrag;
        }

        set allowDrag(value) {
            this._allowDrag = value;
        }

        get allowSelect() {
            return this._allowSelect;
        }

        set allowSelect(value) {
            this._allowSelect = value;
        }

        get treeView() {
            return this._treeView;
        }

        set treeView(value) {
            this._treeView = value;
        }

        get numChildren() {
            return this._numChildren;
        }

        get firstChild() {
            if (this._numChildren) {
                for (let i = 0; i < this.dom.childNodes.length; i++) {
                    if (this.dom.childNodes[i].ui instanceof TreeViewItem) {
                        return this.dom.childNodes[i].ui;
                    }
                }
            }

            return null;
        }

        get lastChild() {
            if (this._numChildren) {
                for (let i = this.dom.childNodes.length - 1; i >= 0; i--) {
                    if (this.dom.childNodes[i].ui instanceof TreeViewItem) {
                        return this.dom.childNodes[i].ui;
                    }
                }
            }

            return null;
        }

        get nextSibling() {
            let sibling = this.dom.nextSibling;
            while (sibling && !(sibling.ui instanceof TreeViewItem)) {
                sibling = sibling.nextSibling;
            }

            return sibling && sibling.ui;
        }

        get previousSibling() {
            let sibling = this.dom.previousSibling;
            while (sibling && !(sibling.ui instanceof TreeViewItem)) {
                sibling = sibling.previousSibling;
            }

            return sibling && sibling.ui;
        }
    }

    ___$insertStyle("@charset \"UTF-8\";\n@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-treeview-item:not(.pcui-treeview-item-empty) > .pcui-treeview-item-contents:before, .pcui-treeview-item-icon:after {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-treeview-item:not(.pcui-treeview-item-empty) > .pcui-treeview-item-contents:before, .pcui-treeview-item-icon:after {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect, .pcui-treeview {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-treeview {\n  min-width: max-content;\n}\n\n.pcui-treeview-item {\n  position: relative;\n  padding-left: 24px;\n}\n.pcui-treeview-item:before {\n  content: \" \";\n  position: absolute;\n  background-color: #313e41;\n  width: 2px;\n  left: 14px;\n  top: -12px;\n  bottom: 12px;\n}\n.pcui-treeview-item:last-child:before {\n  height: 25px;\n  bottom: auto;\n}\n\n.pcui-treeview-item.pcui-disabled > .pcui-treeview-item-contents > .pcui-treeview-item-text {\n  opacity: 0.4;\n}\n\n.pcui-treeview-item-contents {\n  position: relative;\n  color: #b1b8ba;\n  margin-left: 3px;\n  border: 1px solid transparent;\n  align-items: center;\n  height: 24px;\n  box-sizing: border-box;\n}\n.pcui-treeview-item-contents:hover {\n  cursor: pointer;\n  color: #ffffff;\n  background-color: #2c393c;\n}\n.pcui-treeview-item-contents:hover > .pcui-treeview-item-icon {\n  color: #ffffff;\n}\n\n.pcui-treeview-item-icon {\n  color: #5b7073;\n  margin: 0 2px 0 0;\n  flex-shrink: 0;\n}\n.pcui-treeview-item-icon:before {\n  content: \" \";\n  position: absolute;\n  background-color: #313e41;\n  left: -12px;\n  top: 10px;\n  width: 24px;\n  height: 2px;\n}\n.pcui-treeview-item-icon:after {\n  content: \"\\e360\";\n  display: inline-block;\n  vertical-align: sub;\n  width: 22px;\n  height: 22px;\n  position: relative;\n  z-index: 1;\n  text-align: center;\n}\n\n.pcui-treeview-item-text {\n  margin: 0;\n  flex-shrink: 0;\n  position: relative;\n  z-index: 1;\n  transition: opacity 100ms;\n  padding-right: 8px;\n  color: inherit;\n}\n\n.pcui-treeview-item-contents.pcui-treeview-item-selected {\n  background-color: #20292b;\n  color: #ffffff;\n}\n.pcui-treeview-item-contents.pcui-treeview-item-selected > .pcui-treeview-item-icon {\n  color: #ffffff;\n}\n\n.pcui-treeview-item:not(.pcui-treeview-item-empty) > .pcui-treeview-item-contents:before {\n  content: \"\\e120\";\n  position: absolute;\n  font-size: 10px;\n  font-weight: bold;\n  text-align: center;\n  color: #b1b8ba;\n  background-color: #2c393c;\n  top: 0;\n  left: -24px;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n  margin: 3px;\n  cursor: pointer;\n  z-index: 1;\n}\n.pcui-treeview-item:not(.pcui-treeview-item-empty).pcui-treeview-item-open > .pcui-treeview-item-contents:before {\n  content: \"\\e121\";\n}\n\n.pcui-treeview > .pcui-treeview-item {\n  padding-left: 0;\n}\n.pcui-treeview > .pcui-treeview-item:before {\n  content: none;\n}\n.pcui-treeview > .pcui-treeview-item > .pcui-treeview-item-contents {\n  margin-left: 0;\n}\n.pcui-treeview > .pcui-treeview-item > .pcui-treeview-item-contents > .pcui-treeview-item-icon:before {\n  content: none;\n}\n.pcui-treeview > .pcui-treeview-item > .pcui-treeview-item-contents > .pcui-treeview-item-icon:after {\n  margin-left: 0;\n}\n.pcui-treeview > .pcui-treeview-item > .pcui-treeview-item {\n  padding-left: 21px;\n}\n.pcui-treeview > .pcui-treeview-item > .pcui-treeview-item:before {\n  left: 11px;\n}\n\n.pcui-treeview:not(.pcui-treeview-filtering) > .pcui-treeview-item .pcui-treeview-item:not(.pcui-treeview-item-open):not(.pcui-treeview-item-empty) > .pcui-treeview-item {\n  display: none;\n}\n\n.pcui-treeview-item-dragged > .pcui-treeview-item-contents {\n  background-color: rgba(44, 57, 60, 0.5);\n  color: #ffffff;\n}\n\n.pcui-treeview-drag-handle {\n  position: fixed;\n  width: 32px;\n  height: 20px;\n  top: 0;\n  bottom: 0;\n  z-index: 4;\n  margin-top: -1px;\n  margin-left: -1px;\n}\n.pcui-treeview-drag-handle.before {\n  border-top: 4px solid #f60;\n  padding-right: 8px;\n  height: 24px;\n}\n.pcui-treeview-drag-handle.inside {\n  border: 4px solid #f60;\n}\n.pcui-treeview-drag-handle.after {\n  border-bottom: 4px solid #f60;\n  padding-right: 8px;\n  height: 24px;\n}\n\n.pcui-treeview-item-contents:after {\n  content: \" \";\n  display: block;\n  clear: both;\n}\n\n.pcui-treeview-item.pcui-treeview-item-rename > .pcui-treeview-item-contents > .pcui-treeview-item-text {\n  display: none;\n}\n.pcui-treeview-item.pcui-treeview-item-rename > .pcui-treeview-item-contents > .pcui-text-input {\n  margin: 0;\n  flex-grow: 1;\n  box-shadow: none !important;\n  border: 0;\n  background-color: transparent;\n}\n.pcui-treeview-item.pcui-treeview-item-rename > .pcui-treeview-item-contents > .pcui-text-input > input {\n  font-family: inherit;\n  font-size: 14px;\n  padding: 0;\n}\n\n.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item {\n  padding-left: 0;\n}\n.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item::before {\n  display: none;\n}\n.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item:not(.pcui-treeview-filtering-result) > .pcui-treeview-item-contents {\n  display: none;\n}\n.pcui-treeview.pcui-treeview-filtering .pcui-treeview-item-contents {\n  margin-left: 0;\n}\n\n.pcui-treeview-filtering-result .pcui-treeview-item-contents:before,\n.pcui-treeview-filtering-result .pcui-treeview-item-icon:before {\n  display: none;\n}");

    const CLASS_ROOT$2 = 'pcui-treeview';
    const CLASS_DRAGGED_ITEM = CLASS_ROOT$2 + '-item-dragged';
    const CLASS_DRAGGED_HANDLE = CLASS_ROOT$2 + '-drag-handle';
    const CLASS_FILTERING = CLASS_ROOT$2 + '-filtering';
    const CLASS_FILTER_RESULT = CLASS_FILTERING + '-result';

    const DRAG_AREA_INSIDE = 'inside';
    const DRAG_AREA_BEFORE = 'before';
    const DRAG_AREA_AFTER = 'after';

    /**
     * @event
     * @name TreeView#dragstart
     * @param {TreeViewItem[]} items - The dragged items
     * @description Fired when we start dragging a TreeViewItem
     */

    /**
     * @event
     * @name TreeView#dragend
     * @description Fired when we stop dragging a TreeViewItem
     */

    /**
     * @event
     * @name TreeView#reparent
     * @description Fired when we reparent TreeViewItems
     * @param {object[]} items - An array of items we reparented. Each array element contains an object like so: {item, newParent, newChildIndex, oldParent}.
     */

    /**
     * @event
     * @name TreeView#select
     * @description Fired when we select a TreeViewItem
     * @param {TreeViewItem} item - The item
     */

    /**
     * @event
     * @name TreeView#deselect
     * @description Fired when we deselect a TreeViewItem
     * @param {TreeViewItem} item - The item
     */

    /**
     * @event
     * @name TreeView#rename
     * @description Fired when we rename a TreeViewItem
     * @param {TreeViewItem} item - The item
     * @param {string} name - The new name
     */

    /**
     * @name TreeView
     * @class
     * @classdesc A container that can show a treeview like a hierarchy. The treeview contains
     * pcui.TreeViewItems.
     * @augments Container
     * @property {boolean} allowDrag=true Whether dragging a TreeViewItem is allowed.
     * @property {boolean} allowReordering=true Whether reordering TreeViewItems is allowed.
     * @property {boolean} allowRenaming Whether renaming TreeViewItems is allowed by double clicking on them.
     * @property {boolean} isDragging Whether we are currently dragging a TreeViewItem.
     * @property {string} filter Gets / sets a filter that searches TreeViewItems and only shows the ones that are relevant to the filter.
     * @property {TreeViewItem[]} selected Gets the selected TreeViewItems.
     */
    class TreeView extends Container {
        /**
         * Creates a new TreeView.
         *
         * @param {object} [args] - The arguments. All properties can be set through the arguments as well.
         * @param {Function} [args.onContextMenu] - A function to be called when we right click on a TreeViewItem.
         * @param {Function} [args.onReparent] - A function to be called when we try to reparent tree items. If a function is provided then the
         * @param {Element} [args.dragScrollElement] - An element (usually a container of the tree view) that will be scrolled when the user
         * drags towards the edges of the treeview. Defaults to the TreeView itself.
         * tree items will not be reparented by the TreeView but instead will rely on the function to reparent them as it sees fit.
         */
        constructor(args) {
            if (!args) args = {};

            super(args);

            this.class.add(CLASS_ROOT$2);

            this._selectedItems = [];
            this._dragItems = [];
            this._allowDrag = (args.allowDrag !== undefined ? args.allowDrag : true);
            this._allowReordering = (args.allowReordering !== undefined ? args.allowReordering : true);
            this._allowRenaming = (args.allowRenaming !== undefined ? args.allowRenaming : false);
            this._dragging = false;
            this._dragOverItem = null;
            this._dragArea = DRAG_AREA_INSIDE;
            this._dragScroll = 0;
            this._dragScrollInterval = null;
            this._dragHandle = new Element(document.createElement('div'), {
                class: CLASS_DRAGGED_HANDLE
            });
            this._dragScrollElement = args.dragScrollElement || this;
            this.append(this._dragHandle);

            this._onContextMenu = args.onContextMenu;
            this._onReparentFn = args.onReparent;

            this._pressedCtrl = false;
            this._pressedShift = false;

            this._filter = null;
            this._filterResults = [];
            this._wasDraggingAllowedBeforeFiltering = this._allowDrag;

            this._domEvtModifierKeys = this._updateModifierKeys.bind(this);
            this._domEvtMouseLeave = this._onMouseLeave.bind(this);
            this._domEvtDragMove = this._onDragMove.bind(this);
            this._domEvtMouseMove = this._onMouseMove.bind(this);

            window.addEventListener('keydown', this._domEvtModifierKeys);
            window.addEventListener('keyup', this._domEvtModifierKeys);
            window.addEventListener('mousedown', this._domEvtModifierKeys);

            this.dom.addEventListener('mouseleave', this._domEvtMouseLeave);

            this._dragHandle.dom.addEventListener('mousemove', this._domEvtDragMove);
            this._dragHandle.on('destroy', (dom) => {
                dom.removeEventListener('mousemove', this._domEvtDragMove);
            });
        }

        _updateModifierKeys(evt) {
            this._pressedCtrl = evt.ctrlKey || evt.metaKey;
            this._pressedShift = evt.shiftKey;
        }

        /**
         * Finds the next tree item that is not currently hidden
         *
         * @param {TreeViewItem} currentItem - The current tree item
         * @returns {TreeViewItem} The next tree item.
         */
        _findNextVisibleTreeItem(currentItem) {
            if (currentItem.numChildren > 0 && currentItem.open) {
                return currentItem.firstChild;
            }

            const sibling = currentItem.nextSibling;
            if (sibling) return sibling;

            let parent = currentItem.parent;
            if (!(parent instanceof TreeViewItem)) return null;

            let parentSibling = parent.nextSibling;
            while (!parentSibling) {
                parent = parent.parent;
                if (!(parent instanceof TreeViewItem)) {
                    break;
                }

                parentSibling = parent.nextSibling;
            }

            return parentSibling;
        }

        /**
         * Finds the last visible child tree item of the specified tree item.
         *
         * @param {TreeViewItem} currentItem - The current item.
         * @returns {TreeViewItem} The last child item.
         */
        _findLastVisibleChildTreeItem(currentItem) {
            if (!currentItem.numChildren || !currentItem.open) return null;

            let lastChild = currentItem.lastChild;
            while (lastChild && lastChild.numChildren && lastChild.open) {
                lastChild = lastChild.lastChild;
            }

            return lastChild;
        }

        /**
         * Finds the previous visible tree item of the specified tree item.
         *
         * @param {TreeViewItem} currentItem - The current tree item.
         * @returns {TreeViewItem} The previous item.
         */
        _findPreviousVisibleTreeItem(currentItem) {
            const sibling = currentItem.previousSibling;
            if (sibling) {
                if (sibling.numChildren > 0 && sibling.open)  {
                    return this._findLastVisibleChildTreeItem(sibling);
                }

                return sibling;
            }

            const parent = currentItem.parent;
            if (!(parent instanceof TreeViewItem)) return null;

            return parent;
        }

        /**
         * Gets the visible tree items between the specified start and end tree items.
         *
         * @param {TreeViewItem} startChild - The start tree item.
         * @param {TreeViewItem} endChild - The end tree item.
         * @returns {TreeViewItem[]} The tree items.
         */
        _getChildrenRange(startChild, endChild) {
            const result = [];

            // select search results if we are currently filtering tree view items
            if (this._filterResults.length) {
                const filterResults = this.dom.querySelectorAll(`.${CLASS_ROOT$2}-item.${CLASS_FILTER_RESULT}`);

                let startIndex = -1;
                let endIndex = -1;

                for (let i = 0; i < filterResults.length; i++) {
                    const item = filterResults[i].ui;

                    if (item === startChild) {
                        startIndex = i;
                    } else if (item === endChild) {
                        endIndex = i;
                    }

                    if (startIndex !== -1 && endIndex !== -1) {
                        const start = (startIndex < endIndex ? startIndex : endIndex);
                        const end = (startIndex < endIndex ? endIndex : startIndex);
                        for (let j = start; j <= end; j++) {
                            result.push(filterResults[j].ui);
                        }

                        break;
                    }
                }
            } else {
                // if we are not filtering the tree view then find the next visible tree item
                let current = startChild;

                const rectStart = startChild.dom.getBoundingClientRect();
                const rectEnd = endChild.dom.getBoundingClientRect();

                if (rectStart.top < rectEnd.top) {
                    while (current && current !== endChild) {
                        current = this._findNextVisibleTreeItem(current);
                        if (current && current !== endChild) {
                            result.push(current);
                        }
                    }
                } else {
                    while (current && current !== endChild) {
                        current = this._findPreviousVisibleTreeItem(current);
                        if (current && current !== endChild) {
                            result.push(current);
                        }
                    }
                }

                result.push(endChild);

            }

            return result;
        }

        _onAppendChild(element) {
            super._onAppendChild(element);

            if (element instanceof TreeViewItem) {
                this._onAppendTreeViewItem(element);
            }
        }

        _onRemoveChild(element) {
            if (element instanceof TreeViewItem) {
                this._onRemoveTreeViewItem(element);
            }

            super._onRemoveChild(element);
        }

        _onAppendTreeViewItem(element) {
            element.treeView = this;

            if (this._filter) {
                // add new item to filtered results if it
                // satisfies the current filter
                this._searchItems([[element.text, element]], this._filter);
            }

            // do the same for all children of the element
            element.forEachChild((child) => {
                if (child instanceof TreeViewItem) {
                    this._onAppendTreeViewItem(child);
                }
            });
        }

        _onRemoveTreeViewItem(element) {
            element.selected = false;

            // do the same for all children of the element
            element.forEachChild((child) => {
                if (child instanceof TreeViewItem) {
                    this._onRemoveTreeViewItem(child);
                }
            });
        }

        // Called when a key is down on a child TreeViewItem.
        _onChildKeyDown(evt, element) {
            if ([9, 37, 38, 39, 40].indexOf(evt.keyCode) === -1) return;

            evt.preventDefault();
            evt.stopPropagation();

            if (evt.keyCode === 40) {
                // down - select next tree item
                if (this._selectedItems.length) {
                    const next = this._findNextVisibleTreeItem(element);
                    if (next) {
                        if (this._pressedShift || this._pressedCtrl) {
                            next.selected = true;
                        } else {
                            this._selectSingleItem(next);
                        }
                    }
                }
            } else if (evt.keyCode === 38) {
                // up - select previous tree item
                if (this._selectedItems.length) {
                    const prev = this._findPreviousVisibleTreeItem(element);
                    if (prev) {
                        if (this._pressedShift || this._pressedCtrl) {
                            prev.selected = true;
                        } else {
                            this._selectSingleItem(prev);
                        }
                    }
                }

            } else if (evt.keyCode === 37) {
                // left (close)
                if (element.parent !== this) {
                    element.open = false;
                }
            } else if (evt.keyCode === 39) {
                // right (open)
                element.open = true;
            } else if (evt.keyCode === 9) ;
        }

        // Called when we click on a child TreeViewItem
        _onChildClick(evt, element) {
            if (evt.button !== 0) return;
            if (!element.allowSelect) return;

            if (this._pressedCtrl) {
                // toggle selection when Ctrl is pressed
                element.selected = !element.selected;
            } else if (this._pressedShift) {
                // on shift add to selection
                if (!this._selectedItems.length || this._selectedItems.length === 1 && this._selectedItems[0] === element) {
                    element.selected = true;
                    return;
                }

                const selected = this._selectedItems[this._selectedItems.length - 1];
                this._openHierarchy(selected);

                const children = this._getChildrenRange(selected, element);
                children.forEach((child) => {
                    if (child.allowSelect) {
                        child.selected = true;
                    }
                });

            } else {
                // deselect other items
                this._selectSingleItem(element);
            }
        }

        /**
         * Call specified function on every child TreeViewItem by traversing the hierarchy depth first.
         *
         * @param {Function} fn - The function to call. The function takes the TreeViewItem as an argument.
         */
        _traverseDepthFirst(fn) {
            function traverse(item) {
                if (!item || !(item instanceof TreeViewItem)) return;

                fn(item);

                if (item.numChildren) {
                    for (let i = 0; i < item.dom.childNodes.length; i++) {
                        traverse(item.dom.childNodes[i].ui);
                    }
                }
            }

            for (let i = 0; i < this.dom.childNodes.length; i++) {
                traverse(this.dom.childNodes[i].ui);
            }
        }

        /**
         * Do a depth first traversal of all tree items
         * and assign an order to them so that we know which one
         * is above the other. Performance wise this means it traverses
         * all tree items every time however seems to be pretty fast even with 15 - 20 K entities.
         */
        _updateTreeOrder() {
            let order = 0;

            this._traverseDepthFirst((item) => {
                item._treeOrder = order++;
            });
        }

        _getChildIndex(item, parent) {
            return Array.prototype.indexOf.call(parent.dom.childNodes, item.dom) - 1;
        }

        // Called when we start dragging a TreeViewItem.
        _onChildDragStart(evt, element) {
            if (!this.allowDrag || this._dragging) return;

            this._dragItems = [];

            if (this._selectedItems.indexOf(element) !== -1) {
                const dragged = [];

                // check that all selected items to be dragged are
                // at the same depth from the root
                let desiredDepth = -1;
                for (let i = 0; i < this._selectedItems.length; i++) {
                    let parent = this._selectedItems[i].parent;
                    let depth = 0;
                    let isChild = false;
                    while (parent && parent instanceof TreeViewItem) {
                        // if parent is already in dragged items then skip
                        // depth calculation for this item
                        if (this._selectedItems.indexOf(parent) !== -1) {
                            isChild = true;
                            break;
                        }

                        depth++;
                        parent = parent.parent;
                    }

                    if (!isChild) {
                        if (desiredDepth === -1) {
                            desiredDepth = depth;
                        } else if (desiredDepth !== depth) {
                            return;
                        }

                        dragged.push(this._selectedItems[i]);
                    }
                }

                // add dragged class to each item
                this._dragItems = dragged;
            } else {
                element.class.add(CLASS_DRAGGED_ITEM);
                this._dragItems.push(element);
            }

            if (this._dragItems.length) {
                this._dragItems.forEach((item) => {
                    item.class.add(CLASS_DRAGGED_ITEM);
                });

                this.isDragging = true;

                this.emit('dragstart', this._dragItems.slice());
            }
        }

        // Called when we stop dragging a TreeViewItem.
        _onChildDragEnd(evt, element) {
            if (!this.allowDrag || !this._dragging) return;

            this._dragItems.forEach(item => item.class.remove(CLASS_DRAGGED_ITEM));

            // if the root is being dragged then
            // do not allow reparenting because we do not
            // want to reparent the root
            let isRootDragged = false;
            for (let i = 0; i < this._dragItems.length; i++) {
                if (this._dragItems[i].parent === this)  {
                    isRootDragged = true;
                    break;
                }
            }

            if (!isRootDragged && this._dragOverItem) {
                if (this._dragItems.length > 1) {
                    // sort items based on order in the hierarchy
                    this._updateTreeOrder();
                    this._dragItems.sort((a, b) => {
                        return a._treeOrder - b._treeOrder;
                    });
                }

                if (this._dragItems.length) {
                    // reparent items
                    const reparented = [];

                    // if we do not have _onReparentFn then reparent all the dragged items
                    // in the DOM
                    if (!this._onReparentFn) {
                        // first remove all items from their parent
                        this._dragItems.forEach((item) => {
                            if (item.parent === this._dragOverItem && this._dragArea === DRAG_AREA_INSIDE) return;

                            reparented.push({
                                item: item,
                                oldParent: item.parent
                            });
                            item.parent.remove(item);
                        });

                        // now reparent items
                        reparented.forEach((r, i) => {
                            if (this._dragArea === DRAG_AREA_BEFORE) {
                                // If dragged before a TreeViewItem...
                                r.newParent = this._dragOverItem.parent;
                                this._dragOverItem.parent.appendBefore(r.item, this._dragOverItem);
                                r.newChildIndex = this._getChildIndex(r.item, r.newParent);
                            } else if (this._dragArea === DRAG_AREA_INSIDE) {
                                // If dragged inside a TreeViewItem...
                                r.newParent = this._dragOverItem;
                                this._dragOverItem.append(r.item);
                                this._dragOverItem.open = true;
                                r.newChildIndex = this._getChildIndex(r.item, r.newParent);
                            } else if (this._dragArea === DRAG_AREA_AFTER) {
                                // If dragged after a TreeViewItem...
                                r.newParent = this._dragOverItem.parent;
                                this._dragOverItem.parent.appendAfter(r.item, i > 0 ? reparented[i - 1].item : this._dragOverItem);
                                r.newChildIndex = this._getChildIndex(r.item, r.newParent);
                            }
                        });

                    } else {
                        // if we have an _onReparentFn then we will not perform the reparenting here
                        // but will instead calculate the new indexes and pass that data to the reparent function
                        // to perform the reparenting

                        const fakeDom = [];

                        const getChildren = (treeviewItem) => {
                            let idx = fakeDom.findIndex(entry => entry.parent === treeviewItem);
                            if (idx === -1) {
                                fakeDom.push({ parent: treeviewItem, children: [...treeviewItem.dom.childNodes] });
                                idx = fakeDom.length - 1;
                            }

                            return fakeDom[idx].children;
                        };

                        this._dragItems.forEach((item) => {
                            if (item.parent === this._dragOverItem && this._dragArea === DRAG_AREA_INSIDE) return;

                            reparented.push({
                                item: item,
                                oldParent: item.parent
                            });

                            // add array of parent's child nodes to fakeDom array
                            const parentChildren = getChildren(item.parent);

                            // remove this item from the children array in fakeDom
                            const childIdx = parentChildren.indexOf(item.dom);
                            parentChildren.splice(childIdx, 1);
                        });

                        // now reparent items
                        reparented.forEach((r, i) => {
                            if (this._dragArea === DRAG_AREA_BEFORE) {
                                // If dragged before a TreeViewItem...
                                r.newParent = this._dragOverItem.parent;
                                const parentChildren = getChildren(this._dragOverItem.parent);
                                const index = parentChildren.indexOf(this._dragOverItem.dom);
                                parentChildren.splice(index, 0, r.item.dom);
                                r.newChildIndex = index;
                            } else if (this._dragArea === DRAG_AREA_INSIDE) {
                                // If dragged inside a TreeViewItem...
                                r.newParent = this._dragOverItem;
                                const parentChildren = getChildren(this._dragOverItem);
                                parentChildren.push(r.item.dom);
                                r.newChildIndex = parentChildren.length - 1;
                            } else if (this._dragArea === DRAG_AREA_AFTER) {
                                // If dragged after a TreeViewItem...
                                r.newParent = this._dragOverItem.parent;
                                const parentChildren = getChildren(this._dragOverItem.parent);
                                const after = i > 0 ? reparented[i - 1].item : this._dragOverItem;
                                const index = parentChildren.indexOf(after.dom);
                                parentChildren.splice(index + 1, 0, r.item.dom);
                                r.newChildIndex = index + 1;
                            }

                            // substract 1 from new child index to account for the extra node that
                            // each tree view item has inside
                            r.newChildIndex--;
                        });
                    }

                    if (reparented.length) {
                        if (this._onReparentFn) {
                            this._onReparentFn(reparented);
                        }

                        this.emit('reparent', reparented);
                    }
                }
            }

            this._dragItems = [];

            this.isDragging = false;

            this.emit('dragend');
        }

        // Called when we drag over a TreeViewItem.
        _onChildDragOver(evt, element) {
            if (!this._allowDrag || !this._dragging) return;

            if (element.allowDrop && this._dragItems.indexOf(element) === -1) {
                this._dragOverItem = element;
            } else {
                this._dragOverItem = null;
            }

            this._updateDragHandle();
            this._onDragMove(evt);
        }

        // Called when the mouse cursor leaves the tree view.
        _onMouseLeave(evt) {
            if (!this._allowDrag || !this._dragging) return;

            this._dragOverItem = null;
            this._updateDragHandle();
        }

        // Called when the mouse moves while dragging
        _onMouseMove(evt) {
            if (!this._dragging) return;

            // Determine if we need to scroll the treeview if we are dragging towards the edges
            const rect = this.dom.getBoundingClientRect();
            this._dragScroll = 0;
            let top = rect.top;

            let bottom = rect.bottom;
            if (this._dragScrollElement !== this) {
                const dragScrollRect = this._dragScrollElement.dom.getBoundingClientRect();
                top = Math.max(top + this._dragScrollElement.dom.scrollTop, dragScrollRect.top);
                bottom = Math.min(bottom + this._dragScrollElement.dom.scrollTop, dragScrollRect.bottom);
            }

            top = Math.max(0, top);
            bottom = Math.min(bottom, document.body.clientHeight);

            if (evt.pageY < top + 32 && this._dragScrollElement.dom.scrollTop > 0) {
                this._dragScroll = -1;
            } else if (evt.pageY > bottom - 32 && this._dragScrollElement.dom.scrollHeight > this._dragScrollElement.height + this._dragScrollElement.dom.scrollTop) {
                this._dragScroll = 1;
            }
        }

        // Scroll treeview if we are dragging towards the edges
        _scrollWhileDragging() {
            if (!this._dragging) return;
            if (this._dragScroll === 0) return;

            this._dragScrollElement.dom.scrollTop += this._dragScroll * 8;
            this._dragOverItem = null;
            this._updateDragHandle();
        }

        // Called while we drag the drag handle
        _onDragMove(evt) {
            evt.preventDefault();
            evt.stopPropagation();

            if (!this._allowDrag || !this._dragOverItem) return;

            const rect = this._dragHandle.dom.getBoundingClientRect();
            const area = Math.floor((evt.clientY - rect.top) / rect.height * 5);

            const oldArea = this._dragArea;
            const oldDragOver = this._dragOverItem;

            if (this._dragOverItem.parent === this) {
                let parent = false;
                for (let i = 0; i < this._dragItems.length; i++) {
                    if (this._dragItems[i].parent === this._dragOverItem) {
                        parent = true;
                        this._dragOverItem = null;
                        break;
                    }
                }

                if (!parent) {
                    this._dragArea = DRAG_AREA_INSIDE;
                }
            } else {
                // check if we are trying to drag item inside any of its children
                let invalid = false;
                for (let i = 0; i < this._dragItems.length; i++) {
                    if (this._dragItems[i].dom.contains(this._dragOverItem.dom)) {
                        invalid = true;
                        break;
                    }
                }

                if (invalid) {
                    this._dragOverItem = null;
                } else if (this._allowReordering && area <= 1 && this._dragItems.indexOf(this._dragOverItem.previousSibling) === -1) {
                    this._dragArea = DRAG_AREA_BEFORE;
                } else if (this._allowReordering && area >= 4 && this._dragItems.indexOf(this._dragOverItem.nextSibling) === -1 && (this._dragOverItem.numChildren === 0 || !this._dragOverItem.open)) {
                    this._dragArea = DRAG_AREA_AFTER;
                } else {
                    let parent = false;
                    if (this._allowReordering && this._dragOverItem.open) {
                        for (var i = 0; i < this._dragItems.length; i++) {
                            if (this._dragItems[i].parent === this._dragOverItem) {
                                parent = true;
                                this._dragArea = DRAG_AREA_BEFORE;
                                break;
                            }
                        }
                    }
                    if (!parent)
                        this._dragArea = DRAG_AREA_INSIDE;
                }
            }

            if (oldArea !== this._dragArea || oldDragOver !== this._dragOverItem) {
                this._updateDragHandle();
            }
        }

        // Updates the drag handle position and size
        _updateDragHandle(dragOverItem, force) {
            if (!force && (!this._allowDrag || !this._dragging)) return;

            if (!dragOverItem) {
                dragOverItem = this._dragOverItem;
            }

            if (!dragOverItem || dragOverItem.hidden || !dragOverItem.parentsOpen) {
                this._dragHandle.hidden = true;
            } else {
                const rect = dragOverItem._containerContents.dom.getBoundingClientRect();

                this._dragHandle.hidden = false;
                this._dragHandle.class.remove(DRAG_AREA_AFTER, DRAG_AREA_BEFORE, DRAG_AREA_INSIDE);
                this._dragHandle.class.add(this._dragArea);

                const top = rect.top;
                let left = rect.left;
                let width = rect.width;
                if (this.dom.parentElement) {
                    const parentRect = this.dom.parentElement.getBoundingClientRect();
                    left = Math.max(left, parentRect.left);
                    width = Math.min(width, this.dom.parentElement.clientWidth - left + parentRect.left);
                }

                this._dragHandle.style.top = top  + 'px';
                this._dragHandle.style.left = left + 'px';
                this._dragHandle.style.width = (width - 7) + 'px';
            }
        }

        /**
         * Opens all the parents of the specified item
         *
         * @param {TreeViewItem} endItem - The end tree view item
         */
        _openHierarchy(endItem) {
            endItem.parentsOpen = true;
        }

        /**
         * Selects a tree view item
         *
         * @param {TreeViewItem} item - The tree view item
         */
        _selectSingleItem(item) {
            let i = this._selectedItems.length;
            let othersSelected = false;
            while (i--) {
                if (this._selectedItems[i] && this._selectedItems[i] !== item) {
                    this._selectedItems[i].selected = false;
                    othersSelected = true;
                }
            }

            if (othersSelected) {
                item.selected = true;
            } else {
                item.selected = !item.selected;
            }
        }

        /**
         * Called when a child tree view item is selected.
         *
         * @param {TreeViewItem} item - The tree view item.
         */
        _onChildSelected(item) {
            this._selectedItems.push(item);
            this._openHierarchy(item);
            this.emit('select', item);
        }

        /**
         * Called when a child tree view item is deselected.
         *
         * @param {TreeViewItem} item - The tree view item.
         * @param {Element} element - The element.
         */
        _onChildDeselected(element) {
            const index = this._selectedItems.indexOf(element);
            if (index !== -1) {
                this._selectedItems.splice(index, 1);
                this.emit('deselect', element);
            }
        }

        /**
         * Called when a child tree view item is renamed.
         *
         * @param {TreeViewItem} item - The tree view item.
         * @param {string} newName - The new name.
         */
        _onChildRename(item, newName) {
            if (this._filter) {
                // unfilter this item
                item.class.remove(CLASS_FILTER_RESULT);
                const index = this._filterResults.indexOf(item);
                if (index !== -1) {
                    this._filterResults.splice(index, 1);
                }

                // see if we can include it in the current filter
                this._searchItems([[item.text, item]], this._filter);
            }
            this.emit('rename', item, newName);
        }

        _searchItems(searchArr, filter) {
            const results = searchItems(searchArr, filter);
            if (!results.length) return;

            results.forEach((item) => {
                this._filterResults.push(item);
                item.class.add(CLASS_FILTER_RESULT);
            });

        }

        /**
         * Searches treeview
         *
         * @param {string} filter - The search filter
         */
        _applyFilter(filter) {
            this._clearFilter();

            this._wasDraggingAllowedBeforeFiltering = this._allowDrag;
            this._allowDrag = false;

            this.class.add(CLASS_FILTERING);

            const search = [];
            this._traverseDepthFirst((item) => {
                search.push([item.text, item]);
            });

            this._searchItems(search, filter);
        }

        /**
         * Clears search filter.
         */
        _clearFilter() {
            this._filterResults.forEach((item) => {
                if (item.destroyed) return;
                item.class.remove(CLASS_FILTER_RESULT);
            });
            this._filterResults.length = 0;

            this.class.remove(CLASS_FILTERING);

            this._allowDrag = this._wasDraggingAllowedBeforeFiltering;
        }

        showDragHandle(treeItem) {
            this._updateDragHandle(treeItem, true);
        }

        /**
         * @name TreeView#deselect
         * @description Deselects all selected tree view items.
         */
        deselect() {
            let i = this._selectedItems.length;
            while (i--) {
                if (this._selectedItems[i]) {
                    this._selectedItems[i].selected = false;
                }
            }
        }

        /**
         * @name TreeView#clearTreeItems
         * @description Removes all child tree view items
         */
        clearTreeItems() {
            let i = this.dom.childNodes.length;
            while (i--) {
                const dom = this.dom.childNodes[i];
                if (!dom) continue;
                const ui = dom.ui;
                if (ui instanceof TreeViewItem) {
                    ui.destroy();
                }
            }

            this._selectedItems = [];
            this._dragItems = [];
            this._allowDrag = this._wasDraggingAllowedBeforeFiltering;
        }

        destroy() {
            if (this._destroyed) return;

            window.removeEventListener('keydown', this._domEvtModifierKeys);
            window.removeEventListener('keyup', this._domEvtModifierKeys);
            window.removeEventListener('mousedown', this._domEvtModifierKeys);
            window.removeEventListener('mousemove', this._domEvtMouseMove);

            this.dom.removeEventListener('mouseleave', this._domEvtMouseLeave);

            if (this._dragScrollInterval) {
                clearInterval(this._dragScrollInterval);
                this._dragScrollInterval = null;
            }

            super.destroy();
        }

        get allowDrag() {
            return this._allowDrag;
        }

        set allowDrag(value) {
            this._allowDrag = value;
            if (this._filter) {
                this._wasDraggingAllowedBeforeFiltering = value;
            }
        }

        get allowReordering() {
            return this._allowReordering;
        }

        set allowReordering(value) {
            this._allowReordering = value;
        }

        get allowRenaming() {
            return this._allowRenaming;
        }

        set allowRenaming(value) {
            this._allowRenaming = value;
        }

        get isDragging() {
            return this._dragging;
        }

        set isDragging(value) {
            if (this._dragging === value) return;

            if (value) {
                this._dragging = true;
                this._updateDragHandle();

                // handle mouse move to scroll when dragging if necessary
                if (this.scrollable || this._dragScrollElement !== this) {
                    window.removeEventListener('mousemove', this._domEvtMouseMove);
                    window.addEventListener('mousemove', this._domEvtMouseMove);
                    if (!this._dragScrollInterval) {
                        this._dragScrollInterval = setInterval(this._scrollWhileDragging.bind(this), 1000 / 60);
                    }
                }
            } else {
                this._dragOverItem = null;
                this._updateDragHandle();

                this._dragging = false;

                window.removeEventListener('mousemove', this._domEvtMouseMove);
                if (this._dragScrollInterval) {
                    clearInterval(this._dragScrollInterval);
                    this._dragScrollInterval = null;
                }
            }
        }

        get selected() {
            return this._selectedItems.slice();
        }

        get filter() {
            return this._filter;
        }

        set filter(value) {
            if (this._filter === value) return;

            this._filter = value;

            if (value) {
                this._applyFilter(value);
            } else {
                this._clearFilter();
            }
        }

        get pressedCtrl() {
            return this._pressedCtrl;
        }

        get pressedShift() {
            return this._pressedShift;
        }
    }

    ___$insertStyle(".noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-label-group {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-label-group:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-label-group {\n  align-items: center;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  margin: 6px;\n}\n.pcui-label-group > .pcui-label:first-child {\n  width: 100px;\n  flex-shrink: 0;\n  margin: 0;\n}\n.pcui-label-group > .pcui-element:not(:first-child) {\n  margin: 0 0 0 6px;\n}\n.pcui-label-group > .pcui-element:nth-child(2):not(.pcui-not-flexible) {\n  flex: 1;\n}\n.pcui-label-group > .pcui-vector-input > .pcui-numeric-input {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n\n.pcui-label-group-align-top > .pcui-label:first-child {\n  align-self: flex-start;\n  margin-top: 4px;\n}\n\n.pcui-label-group.pcui-disabled > .pcui-label:first-child {\n  opacity: 0.4;\n}");

    const CLASS_LABEL_GROUP = 'pcui-label-group';
    const CLASS_LABEL_TOP = CLASS_LABEL_GROUP + '-align-top';

    /**
     * @name LabelGroup
     * @class
     * @classdesc Represents a group of a Label and a Element. Useful for rows of labeled fields.
     * @augments Container
     * @property {string} text - Gets / sets the label text.
     * @property {Element} field - Gets the field. This can only be set through the constructor by passing it in the arguments.
     * @property {Element} label - Gets the label element.
     * @property {boolean} labelAlignTop - Whether to align the label at the top of the group. Defaults to false which aligns it at the center.
     */
    class LabelGroup extends Container {
        /**
         * Creates a new LabelGroup.
         *
         * @param {object} args - The arguments. Extends the Element arguments. Any settable property can also be set through the constructor.
         * @param {boolean} [args.nativeTooltip] - If true then use the text as the HTML tooltip of the label.
         */
        constructor(args) {
            if (!args) args = {};

            super(args);

            this.class.add(CLASS_LABEL_GROUP);

            this._label = new Label({
                text: args.text || 'Label',
                nativeTooltip: args.nativeTooltip
            });
            this.append(this._label);

            this._field = args.field;
            if (this._field) {
                this.append(this._field);
            }

            this.labelAlignTop = args.labelAlignTop || false;
        }

        get label() {
            return this._label;
        }

        get field() {
            return this._field;
        }

        get text() {
            return this._label.text;
        }

        set text(value) {
            this._label.text = value;
        }

        get labelAlignTop() {
            return this.class.contains(CLASS_LABEL_TOP);
        }

        set labelAlignTop(value) {
            if (value) {
                this.class.add(CLASS_LABEL_TOP);
            } else {
                this.class.remove(CLASS_LABEL_TOP);
            }
        }
    }

    Element.register('labelgroup', LabelGroup);

    /**
     * @name BindingBase
     * @class
     * @classdesc Base class for data binding between IBindable Elements and Observers.
     * @property {Element} element The element
     * @property {Observer[]} observers The linked observers
     * @property {string[]} paths The linked paths
     * @property {boolean} applyingChange Whether the binding is currently applying a change either to the observers or the element.
     * @property {boolean} linked Whether the binding is linked to observers.
     * @property {boolean} historyEnabled Whether history is enabled for the binding. A valid history object must have been provided first.
     * @property {boolean} historyCombine If a history module is used whether to combine history actions when applying changes to observers.
     * @property {string} historyName The name of the history action when applying changes to observers.
     * @property {string} historyPrefix A string to prefix the historyName with.
     * @property {string} historyPostfix A string to postfix the historyName with.
     */
    class BindingBase extends observer.Events {
        /**
         * Creates a new binding.
         *
         * @param {object} args - The arguments.
         * @param {IBindable} [args.element] - The IBindable element.
         * @param {History} [args.history] - The history object which will be used to record undo / redo actions.
         * If none is provided then no history will be recorded.
         * @param {string} [args.historyPrefix] - A prefix that will be used for the name of every history action.
         * @param {string} [args.historyPostfix] - A postfix that will be used for the name of every history action.
         * @param {string} [args.historyName] - The name of each history action.
         * @param {boolean} [args.historyCombine] - Whether to combine history actions.
         */
        constructor(args) {
            super();

            if (!args) args = {};

            // the observers we are binding to
            this._observers = null;
            // the paths to use for the observers
            this._paths = null;

            this._applyingChange = false;
            this._element = args.element || null;

            this._history = args.history || null;
            this._historyPrefix = args.historyPrefix || null;
            this._historyPostfix = args.historyPostfix || null;
            this._historyName = args.historyName || null;
            this._historyCombine = args.historyCombine || false;

            this._linked = false;
        }

        // Returns the path at the specified index
        // or the path at the first index if it doesn't exist.
        _pathAt(paths, index) {
            return paths[index] || paths[0];
        }

        /**
         * @name BindingBase#link
         * @description Links the specified observers to the specified paths.
         * @param {Observer[]|Observer} observers - The observer(s).
         * @param {string[]|string} paths - The path(s). The behaviour of the binding depends on how many paths are passed.
         * If an equal amount of paths and observers are passed then the binding will map each path to each observer at each index.
         * If more observers than paths are passed then the path at index 0 will be used for all observers.
         * If one observer and multiple paths are passed then all of the paths will be used for the observer (e.g. for curves).
         */
        link(observers, paths) {
            if (this._observers) {
                this.unlink();
            }

            this._observers = Array.isArray(observers) ? observers : [observers];
            this._paths = Array.isArray(paths) ? paths : [paths];

            this._linked = true;
        }

        /**
         * @name BindingBase#unlink
         * @description Unlinks the observers and paths.
         */
        unlink() {
            this._observers = null;
            this._paths = null;
            this._linked = false;
        }

        /**
         * @name BindingBase#clone
         * @description Clones the binding. To be implemented by derived classes.
         */
        clone() {
            throw new Error('pcui.BindingBase#clone: Not implemented');
        }

        /**
         * @name BindingBase#setValue
         * @description Sets a value to the linked observers at the linked paths.
         * @param {*} value - The value
         */
        setValue(value) {
        }

        /**
         * @name BindingBase#setValues
         * @description Sets an array of values to the linked observers at the linked paths.
         * @param {Array<*>} values - The values
         */
        setValues(values) {
        }

        /**
         * @name BindingBase#addValue
         * @description Adds (inserts) a value to the linked observers at the linked paths.
         * @param {*} value - The value
         */
        addValue(value) {
        }

        /**
         * @name BindingBase#addValues
         * @description Adds (inserts) multiple values to the linked observers at the linked paths.
         * @param {Array<*>} values - The values
         */
        addValues(values) {
        }

        /**
         * @name BindingBase#removeValue
         * @description Removes a value from the linked observers at the linked paths.
         * @param {*} value - The value
         */
        removeValue(value) {
        }

        /**
         * @name BindingBase#removeValues
         * @description Removes multiple values from the linked observers from the linked paths.
         * @param {Array<*>} values - The values
         */
        removeValues(values) {
        }

        get element() {
            return this._element;
        }

        set element(value) {
            this._element = value;
        }

        get applyingChange() {
            return this._applyingChange;
        }

        set applyingChange(value) {
            if (this._applyingChange === value) return;

            this._applyingChange = value;
            this.emit('applyingChange', value);
        }

        get linked() {
            return this._linked;
        }

        get historyCombine() {
            return this._historyCombine;
        }

        set historyCombine(value) {
            this._historyCombine = value;
        }

        get historyName() {
            return this._historyName;
        }

        set historyName(value) {
            this._historyName = value;
        }

        get historyPrefix() {
            return this._historyPrefix;
        }

        set historyPrefix(value) {
            this._historyPrefix = value;
        }

        get historyPostfix() {
            return this._historyPostfix;
        }

        set historyPostfix(value) {
            this._historyPostfix = value;
        }

        get historyEnabled() {
            return this._history && this._history.enabled;
        }

        set historyEnabled(value) {
            if (this._history) {
                this._history.enabled = value;
            }
        }

        get observers() {
            return this._observers;
        }

        get paths() {
            return this._paths;
        }
    }

    /**
     * @name BindingObserversToElement
     * @class
     * @classdesc Provides one way binding between Observers and an IBindable element and Observers. Any changes from the observers
     * will be propagated to the element.
     * @augments BindingBase
     */
    class BindingObserversToElement extends BindingBase {
        /**
         * Creates a new BindingObserversToElement instance.
         *
         * @param {object} args - The arguments.
         * @param {Function} args.customUpdate - Custom update function
         */
        constructor({ customUpdate, ...args } = {}) {
            super(args);

            this._customUpdate = customUpdate;
            this._events = [];
            this._updateElementHandler = this._updateElement.bind(this);
            this._updateTimeout = null;
        }

        _linkObserver(observer, path) {
            this._events.push(observer.on(path + ':set', this._deferUpdateElement.bind(this)));
            this._events.push(observer.on(path + ':unset', this._deferUpdateElement.bind(this)));
            this._events.push(observer.on(path + ':insert', this._deferUpdateElement.bind(this)));
            this._events.push(observer.on(path + ':remove', this._deferUpdateElement.bind(this)));
        }

        _deferUpdateElement() {
            if (this.applyingChange) return;
            this.applyingChange = true;

            this._updateTimeout = setTimeout(this._updateElementHandler);
        }

        _updateElement() {
            if (this._updateTimeout) {
                clearTimeout(this._updateTimeout);
                this._updateTimeout = null;
            }

            this._updateTimeout = null;
            this.applyingChange = true;

            if (typeof this._customUpdate === 'function') {
                this._customUpdate(this._element, this._observers, this._paths);
            } else if (this._observers.length === 1) {
                if (this._paths.length > 1) {
                    // if using multiple paths for the single observer (e.g. curves)
                    // then return an array of values for each path
                    this._element.value = this._paths.map((path) => {
                        return this._observers[0].has(path) ? this._observers[0].get(path) : undefined;
                    });
                } else {
                    this._element.value = (this._observers[0].has(this._paths[0]) ? this._observers[0].get(this._paths[0]) : undefined);
                }
            } else {
                this._element.values = this._observers.map((observer, i) => {
                    const path = this._pathAt(this._paths, i);
                    return observer.has(path) ? observer.get(path) : undefined;
                });
            }

            this.applyingChange = false;
        }

        link(observers, paths) {
            super.link(observers, paths);

            // don't render changes when we link
            const renderChanges = this._element.renderChanges;
            if (renderChanges) {
                this._element.renderChanges = false;
            }

            this._updateElement();

            if (renderChanges) {
                this._element.renderChanges = renderChanges;
            }

            if (this._observers.length === 1) {
                if (this._paths.length > 1) {
                    for (let i = 0; i < this._paths.length; i++) {
                        this._linkObserver(this._observers[0], this._paths[i]);
                    }
                    return;
                }
            }

            for (let i = 0; i < this._observers.length; i++) {
                this._linkObserver(this._observers[i], this._pathAt(this._paths, i));
            }
        }

        unlink() {
            for (let i = 0; i < this._events.length; i++) {
                this._events[i].unbind();
            }
            this._events.length = 0;

            if (this._updateTimeout) {
                clearTimeout(this._updateTimeout);
                this._updateTimeout = null;
            }

            super.unlink();
        }

        clone() {
            return new BindingObserversToElement({
                customUpdate: this._customUpdate
            });
        }
    }

    ___$insertStyle(".noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-gridview-item {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-gridview-item:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-gridview-item {\n  box-sizing: border-box;\n  justify-content: center;\n  align-items: center;\n  flex-shrink: 0;\n  width: 104px;\n}\n.pcui-gridview-item:not(.pcui-disabled) {\n  cursor: pointer;\n}\n.pcui-gridview-item:not(.pcui-disabled):not(.pcui-gridview-item-selected):hover {\n  background-color: #293538;\n}\n\n.pcui-gridview-item-selected {\n  background-color: #20292b;\n}\n\n.pcui-gridview-item-text {\n  max-width: 100px;\n  font-size: 12px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin: 0;\n  padding: 0 2px;\n}");

    const CLASS_ROOT$1 = 'pcui-gridview-item';
    const CLASS_SELECTED = CLASS_ROOT$1 + '-selected';
    const CLASS_TEXT = CLASS_ROOT$1 + '-text';

    /**
     * @name GridViewItem
     * @augments Container
     * @mixes IFocusable
     * @class
     * @classdesc Represents a grid view item used in GridView.
     * @property {boolean} allowSelect - If true allow selecting the item. Defaults to true.
     * @property {boolean} selected - Whether the item is selected.
     * @property {string} text - The text of the item.
     * @property {GridViewItem} previousSibling - Returns the previous visible sibling grid view item.
     * @property {GridViewItem} nextSibling - Returns the next visible sibling grid view item.
     */
    class GridViewItem extends Container {
        constructor(args) {
            args = Object.assign({
                tabIndex: 0
            }, args);

            super(args);

            this.class.add(CLASS_ROOT$1);

            this.allowSelect = args.allowSelect !== undefined ? args.allowSelect : true;
            this._selected = false;

            this._labelText = new Label({
                class: CLASS_TEXT,
                binding: new BindingObserversToElement()
            });
            this.append(this._labelText);

            this.text = args.text;

            this._domEvtFocus = this._onFocus.bind(this);
            this._domEvtBlur = this._onBlur.bind(this);

            this.dom.addEventListener('focus', this._domEvtFocus);
            this.dom.addEventListener('blur', this._domEvtBlur);
        }

        _onFocus() {
            this.emit('focus');
        }

        _onBlur() {
            this.emit('blur');
        }

        focus() {
            this.dom.focus();
        }

        blur() {
            this.dom.blur();
        }

        link(observers, paths) {
            this._labelText.link(observers, paths);
        }

        unlink() {
            this._labelText.unlink();
        }

        destroy() {
            if (this._destroyed) return;

            this.dom.removeEventListener('focus', this._domEvtFocus);
            this.dom.removeEventListener('blur', this._domEvtBlur);

            super.destroy();
        }

        get allowSelect() {
            return this._allowSelect;
        }

        set allowSelect(value) {
            this._allowSelect = value;
        }

        get selected() {
            return this._selected;
        }

        set selected(value) {
            if (value) {
                this.focus();
            }

            if (this._selected === value) return;

            this._selected = value;

            if (value) {
                this.classAdd(CLASS_SELECTED);
                this.emit('select', this);
            } else {
                this.classRemove(CLASS_SELECTED);
                this.emit('deselect', this);
            }
        }

        get text() {
            return this._labelText.text;
        }

        set text(value) {
            this._labelText.text = value;
        }

        get nextSibling() {
            let sibling = this.dom.nextSibling;
            while (sibling) {
                if (sibling.ui instanceof GridViewItem && !sibling.ui.hidden) {
                    return sibling.ui;
                }

                sibling = sibling.nextSibling;
            }

            return null;
        }

        get previousSibling() {
            let sibling = this.dom.previousSibling;
            while (sibling) {
                if (sibling.ui instanceof GridViewItem && !sibling.ui.hidden) {
                    return sibling.ui;
                }

                sibling = sibling.previousSibling;
            }

            return null;
        }
    }

    ___$insertStyle(".noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex, .pcui-gridview {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden), .pcui-gridview:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-gridview {\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-content: flex-start;\n}");

    const CLASS_ROOT = 'pcui-gridview';

    /**
     * @name GridView
     * @augments Container
     * @class
     * @classdesc Represents a container that shows a flexible wrappable
     * list of items that looks like a grid. Contains GridViewItem's.
     * @property {GridViewItem[]} selected Gets the selected grid view items.
     */
    class GridView extends Container {
        /**
         * Creates new GridView.
         *
         * @param {object} [args] - The arguments
         * @param {Function} [args.filterFn] - A filter function to filter gridview items with signature (GridViewItem) => boolean.
         */
        constructor(args) {
            if (!args) args = {};

            super(args);

            this.class.add(CLASS_ROOT);

            this.on('append', this._onAppendGridViewItem.bind(this));
            this.on('remove', this._onRemoveGridViewItem.bind(this));

            this._filterFn = args.filterFn;
            this._filterAnimationFrame = null;
            this._filterCanceled = false;

            this._selected = [];
        }

        _onAppendGridViewItem(item) {
            if (!(item instanceof GridViewItem)) return;

            let evtClick = item.on('click', evt => this._onClickItem(evt, item));
            let evtSelect = item.on('select', () => this._onSelectItem(item));
            let evtDeselect = item.on('deselect', () => this._onDeselectItem(item));

            if (this._filterFn && !this._filterFn(item)) {
                item.hidden = true;
            }

            item.once('griditem:remove', () => {
                evtClick.unbind();
                evtClick = null;

                evtSelect.unbind();
                evtSelect = null;

                evtDeselect.unbind();
                evtDeselect = null;
            });
        }

        _onRemoveGridViewItem(item) {
            if (!(item instanceof GridViewItem)) return;

            item.selected = false;

            item.emit('griditem:remove');
            item.unbind('griditem:remove');
        }

        _onClickItem(evt, item) {
            if (evt.ctrlKey || evt.metaKey) {
                item.selected = !item.selected;
            } else if (evt.shiftKey) {
                const lastSelected = this._selected[this._selected.length - 1];
                if (lastSelected) {
                    const comparePosition = lastSelected.dom.compareDocumentPosition(item.dom);
                    if (comparePosition & Node.DOCUMENT_POSITION_FOLLOWING) {
                        let sibling = lastSelected.nextSibling;
                        while (sibling) {
                            sibling.selected = true;
                            if (sibling === item) break;

                            sibling = sibling.nextSibling;
                        }
                    } else {
                        let sibling = lastSelected.previousSibling;
                        while (sibling) {
                            sibling.selected = true;
                            if (sibling === item) break;

                            sibling = sibling.previousSibling;
                        }
                    }
                } else {
                    item.selected = true;
                }
            } else {
                let othersSelected = false;
                let i = this._selected.length;
                while (i--) {
                    if (this._selected[i] && this._selected[i] !== item) {
                        this._selected[i].selected = false;
                        othersSelected = true;
                    }
                }

                if (othersSelected) {
                    item.selected = true;
                } else {
                    item.selected = !item.selected;
                }
            }
        }

        _onSelectItem(item) {
            this._selected.push(item);
            this.emit('select', item);
        }

        _onDeselectItem(item) {
            const index = this._selected.indexOf(item);
            if (index !== -1) {
                this._selected.splice(index, 1);
                this.emit('deselect', item);
            }
        }

        /**
         * @name GridView#deselect
         * @description Deselects all selected grid view items.
         */
        deselect() {
            let i = this._selected.length;
            while (i--) {
                if (this._selected[i]) {
                    this._selected[i].selected = false;
                }
            }
        }

        /**
         * @name GridView#filter
         * @description Filters grid view items with the filter function provided in the constructor.
         */
        filter() {
            this.forEachChild((child) => {
                if (child instanceof GridViewItem) {
                    child.hidden = this._filterFn && !this._filterFn(child);
                }
            });
        }

        /**
         * @name GridView#filterAsync
         * @description Filters grid view items asynchronously by only allowing up to the specified
         * number of grid view item operations. Fires following events:
         * filter:start - When filtering starts
         * filter:end - When filtering ends
         * filter:delay - When an animation frame is requested to process another batch.
         * filter:cancel - When filtering is canceled.
         * @param {number} batchLimit - The maximum number of items to show
         * before requesting another animation frame.
         */
        filterAsync(batchLimit) {
            let i = 0;
            batchLimit = batchLimit || 100;
            const children = this.dom.childNodes;
            const len = children.length;

            this.emit('filter:start');

            this._filterCanceled = false;

            const next = () => {
                this._filterAnimationFrame = null;
                let visible = 0;
                for (; i < len && visible < batchLimit; i++) {
                    if (this._filterCanceled) {
                        this._filterCanceled = false;
                        this.emit('filter:cancel');
                        return;
                    }

                    const child = children[i].ui;
                    if (child instanceof GridViewItem) {
                        if (this._filterFn && !this._filterFn(child)) {
                            child.hidden = true;
                        } else {
                            child.hidden = false;
                            visible++;
                        }
                    }
                }

                if (i < len) {
                    this.emit('filter:delay');
                    this._filterAnimationFrame = requestAnimationFrame(next);
                } else {
                    this.emit('filter:end');
                }
            };

            next();
        }

        /**
         * @name GridView#filterAsyncCancel
         * @description Cancels asynchronous filtering.
         */
        filterAsyncCancel() {
            if (this._filterAnimationFrame) {
                cancelAnimationFrame(this._filterAnimationFrame);
                this._filterAnimationFrame = null;
            } else {
                this._filterCanceled = true;
            }
        }

        destroy() {
            if (this._destroyed) return;

            if (this._filterAnimationFrame) {
                cancelAnimationFrame(this._filterAnimationFrame);
                this._filterAnimationFrame = null;
            }

            super.destroy();
        }

        get selected() {
            return this._selected.slice();
        }
    }

    ___$insertStyle(".pcui-array-input {\n  margin: 6px;\n  min-width: 0;\n}\n.pcui-array-input > .pcui-numeric-input {\n  margin: 0 0 6px 0;\n}\n\n.pcui-array-input.pcui-array-empty > .pcui-numeric-input {\n  margin: 0;\n}\n\n.pcui-array-input-item > * {\n  margin-top: 1px;\n  margin-bottom: 1px;\n}\n.pcui-array-input-item > *:first-child:not(.pcui-not-flexible):not(.pcui-panel-header) {\n  flex: 1;\n}\n.pcui-array-input-item > .pcui-button {\n  margin-left: -3px;\n  margin-right: 0;\n  background-color: transparent;\n  border: 0;\n}\n\n.pcui-array-input-item-asset > .pcui-button {\n  margin-top: 36px;\n}\n\n.pcui-array-input.pcui-readonly .pcui-array-input-item-delete {\n  display: none;\n}");

    const CLASS_ARRAY_INPUT = 'pcui-array-input';
    const CLASS_ARRAY_EMPTY = 'pcui-array-empty';
    const CLASS_ARRAY_SIZE = CLASS_ARRAY_INPUT + '-size';
    const CLASS_ARRAY_CONTAINER = CLASS_ARRAY_INPUT + '-items';
    const CLASS_ARRAY_ELEMENT = CLASS_ARRAY_INPUT + '-item';
    const CLASS_ARRAY_DELETE = CLASS_ARRAY_ELEMENT + '-delete';

    /**
     * @event
     * @name ArrayInput#linkElement
     * @param {Element} element - The array element
     * @param {number} index - The index of the array element
     * @param {string} path - The path linked
     * @description Fired when an array element is linked to observers
     */

    /**
     * @event
     * @name ArrayInput#unlinkElement
     * @param {Element} element - The array element
     * @param {number} index - The index of the array element
     * @description Fired when an array element is unlinked from observers
     */

    /**
     * @name ArrayInput
     * @class
     * @classdesc Element that allows editing an array of values.
     * @property {boolean} renderChanges - If true the input will flash when changed.
     * @augments Element
     * @mixes IBindable
     * @mixes IFocusable
     */
    class ArrayInput extends Element {
        /**
         * Creates a new ArrayInput.
         *
         * @param {object} args - The arguments.
         * @param {string} [args.type] - The type of values that the array can hold.
         * @param {boolean} [args.fixedSize] - If true then editing the number of elements that the array has will not be allowed.
         * @param {object} [args.elementArgs] - Arguments for each array Element.
         */
        constructor(args) {
            args = Object.assign({}, args);

            // remove binding because we want to set it later
            const binding = args.binding;
            delete args.binding;

            const container = new Container({
                dom: args.dom,
                flex: true
            });

            super(container.dom, args);

            this._container = container;
            this._container.parent = this;

            this.class.add(CLASS_ARRAY_INPUT, CLASS_ARRAY_EMPTY);

            this._usePanels = args.usePanels || false;

            this._fixedSize = !!args.fixedSize;

            this._inputSize = new NumericInput({
                class: [CLASS_ARRAY_SIZE],
                placeholder: 'Array Size',
                value: 0,
                hideSlider: true,
                step: 1,
                precision: 0,
                min: 0,
                readOnly: this._fixedSize
            });
            this._inputSize.on('change', this._onSizeChange.bind(this));
            this._inputSize.on('focus', this._onFocus.bind(this));
            this._inputSize.on('blur', this._onBlur.bind(this));
            this._suspendSizeChangeEvt = false;
            this._container.append(this._inputSize);

            this._containerArray = new Container({
                class: CLASS_ARRAY_CONTAINER,
                hidden: true
            });
            this._containerArray.on('append', () => {
                this._containerArray.hidden = false;
            });
            this._containerArray.on('remove', () => {
                this._containerArray.hidden = this._arrayElements.length == 0;
            });
            this._container.append(this._containerArray);
            this._suspendArrayElementEvts = false;
            this._arrayElementChangeTimeout = null;

            this._getDefaultFn = args.getDefaultFn || null;

            let valueType = args.elementArgs && args.elementArgs.type || args.type;
            if (!ArrayInput.DEFAULTS.hasOwnProperty(valueType)) {
                valueType = 'string';
            }

            delete args.dom;

            this._valueType = valueType;
            this._elementType = args.type;
            this._elementArgs = args.elementArgs || args;

            this._arrayElements = [];

            // set binding now
            this.binding = binding;

            this._values = [];

            if (args.value) {
                this.value = args.value;
            }

            this.renderChanges = args.renderChanges || false;
        }

        _onSizeChange(size) {
            // if size is explicitely 0 then add empty class
            // size can also be null with multi-select so do not
            // check just !size
            if (size === 0) {
                this.class.add(CLASS_ARRAY_EMPTY);
            } else {
                this.class.remove(CLASS_ARRAY_EMPTY);
            }

            if (size === null) return;
            if (this._suspendSizeChangeEvt) return;

            // initialize default value for each new array element
            let defaultValue;
            const initDefaultValue = () => {
                if (this._getDefaultFn) {
                    defaultValue = this._getDefaultFn();
                } else {
                    defaultValue = ArrayInput.DEFAULTS[this._valueType];
                    if (this._valueType === 'curveset') {
                        defaultValue = utils.deepCopy(defaultValue);
                        if (Array.isArray(this._elementArgs.curves)) {
                            for (let i = 0; i < this._elementArgs.curves.length; i++) {
                                defaultValue.keys.push([0, 0]);
                            }
                        }
                    } else if (this._valueType === 'gradient') {
                        defaultValue = utils.deepCopy(defaultValue);
                        if (this._elementArgs.channels) {
                            for (let i = 0; i < this._elementArgs.channels; i++) {
                                defaultValue.keys.push([0, 1]);
                            }
                        }
                    }
                }
            };

            // resize array
            const values = this._values.map((array) => {
                if (!array) {
                    array = new Array(size);
                    for (let i = 0; i < size; i++) {
                        array[i] = utils.deepCopy(ArrayInput.DEFAULTS[this._valueType]);
                        if (defaultValue === undefined) initDefaultValue();
                        array[i] = utils.deepCopy(defaultValue);
                    }
                } else if (array.length < size) {
                    const newArray = new Array(size - array.length);
                    for (let i = 0; i < newArray.length; i++) {
                        newArray[i] = utils.deepCopy(ArrayInput.DEFAULTS[this._valueType]);
                        if (defaultValue === undefined) initDefaultValue();
                        newArray[i] = utils.deepCopy(defaultValue);
                    }
                    array = array.concat(newArray);
                } else {
                    const newArray = new Array(size);
                    for (let i = 0; i < size; i++) {
                        newArray[i] = utils.deepCopy(array[i]);
                    }
                    array = newArray;
                }

                return array;
            });

            if (!values.length) {
                const array = new Array(size);
                for (let i = 0; i < size; i++) {
                    array[i] = utils.deepCopy(ArrayInput.DEFAULTS[this._valueType]);
                    if (defaultValue === undefined) initDefaultValue();
                    array[i] = utils.deepCopy(defaultValue);
                }
                values.push(array);
            }

            this._updateValues(values, true);
        }

        _onFocus() {
            this.emit('focus');
        }

        _onBlur() {
            this.emit('blur');
        }

        _createArrayElement() {
            const args = Object.assign({}, this._elementArgs);
            if (args.binding) {
                args.binding = args.binding.clone();
            } else if (this._binding) {
                args.binding = this._binding.clone();
            }

            // set renderChanges after value is set
            // to prevent flashing on initial value set
            args.renderChanges = false;

            let container;
            if (this._usePanels) {
                container = new Panel({
                    headerText: `[${this._arrayElements.length}]`,
                    removable: !this._fixedSize,
                    collapsible: true,
                    class: [CLASS_ARRAY_ELEMENT, CLASS_ARRAY_ELEMENT + '-' + this._elementType]
                });
            } else {
                container = new Container({
                    flex: true,
                    flexDirection: 'row',
                    alignItems: 'center',
                    class: [CLASS_ARRAY_ELEMENT, CLASS_ARRAY_ELEMENT + '-' + this._elementType]
                });
            }

            if (this._elementType === 'json' && args.attributes) {
                args.attributes = args.attributes.map((attr) => {
                    if (!attr.path) return attr;

                    // fix paths to include array element index
                    attr = Object.assign({}, attr);
                    const parts = attr.path.split('.');
                    parts.splice(parts.length - 1, 0, this._arrayElements.length);
                    attr.path = parts.join('.');

                    return attr;
                });
            }

            const element = Element.create(this._elementType, args);
            container.append(element);

            element.renderChanges = this.renderChanges;

            const entry = {
                container: container,
                element: element
            };

            this._arrayElements.push(entry);

            if (!this._usePanels) {
                if (!this._fixedSize) {
                    const btnDelete = new Button({
                        icon: 'E289',
                        size: 'small',
                        class: CLASS_ARRAY_DELETE,
                        tabIndex: -1 // skip buttons on tab
                    });
                    btnDelete.on('click', () => {
                        this._removeArrayElement(entry);
                    });

                    container.append(btnDelete);
                }
            } else {
                container.on('click:remove', () => {
                    this._removeArrayElement(entry);
                });
            }

            element.on('change', (value) => {
                this._onArrayElementChange(entry, value);
            });

            this._containerArray.append(container);

            return entry;
        }

        _removeArrayElement(entry) {
            const index = this._arrayElements.indexOf(entry);
            if (index === -1) return;

            // remove row from every array in values
            const values = this._values.map((array) => {
                if (!array) return null;
                array.splice(index, 1);
                return array;
            });

            this._updateValues(values, true);
        }

        _onArrayElementChange(entry, value) {
            if (this._suspendArrayElementEvts) return;

            const index = this._arrayElements.indexOf(entry);
            if (index === -1) return;

            // Set the value to the same row of every array in values.
            this._values.forEach((array) => {
                if (array && array.length > index) {
                    array[index] = value;
                }
            });

            // use a timeout here because when our values change they will
            // first emit change events on each array element. However since the
            // whole array changed we are going to fire a 'change' event later from
            // our '_updateValues' function. We only want to emit a 'change' event
            // here when only the array element changed value and not the whole array so
            // wait a bit and fire the change event later otherwise the _updateValues function
            // will cancel this timeout and fire a change event for the whole array instead
            this._arrayElementChangeTimeout = setTimeout(() => {
                this._arrayElementChangeTimeout = null;
                this.emit('change', this.value);
            });
        }

        _linkArrayElement(element, index) {
            const observers = this._binding.observers;
            const paths = this._binding.paths;
            const useSinglePath = paths.length === 1 || observers.length !== paths.length;
            element.unlink();
            element.value = null;

            this.emit('unlinkElement', element, index);

            const path = (useSinglePath ? paths[0] + `.${index}` : paths.map(path => `${path}.${index}`));
            element.link(observers, path);

            this.emit('linkElement', element, index, path);
        }

        _updateValues(values, applyToBinding) {
            this._values = values || [];

            this._suspendArrayElementEvts = true;
            this._suspendSizeChangeEvt = true;

            // apply values to the binding
            if (applyToBinding && this._binding) {
                this._binding.setValues(values);
            }

            // each row of this array holds
            // all the values for that row
            const valuesPerRow = [];
            // holds the length of each array
            const arrayLengths = [];

            values.forEach((array) => {
                if (!array) return;

                arrayLengths.push(array.length);

                array.forEach((item, i) => {
                    if (!valuesPerRow[i]) {
                        valuesPerRow[i] = [];
                    }

                    valuesPerRow[i].push(item);
                });
            });

            let lastElementIndex = -1;
            for (let i = 0; i < valuesPerRow.length; i++) {
                // if the number of values on this row does not match
                // the number of arrays then stop adding rows
                if (valuesPerRow[i].length !== values.length) {
                    break;
                }

                // create row if it doesn't exist
                if (!this._arrayElements[i]) {
                    this._createArrayElement();
                }

                // bind to observers for that row or just display the values
                if (this._binding && this._binding.observers) {
                    this._linkArrayElement(this._arrayElements[i].element, i);
                } else {
                    if (valuesPerRow[i].length > 1) {
                        this._arrayElements[i].element.values = valuesPerRow[i];
                    } else {
                        this._arrayElements[i].element.value = valuesPerRow[i][0];
                    }
                }

                lastElementIndex = i;
            }

            // destory elements that are no longer in our values
            for (let i = this._arrayElements.length - 1; i > lastElementIndex; i--) {
                this._arrayElements[i].container.destroy();
                this._arrayElements.splice(i, 1);
            }


            this._inputSize.values = arrayLengths;

            this._suspendSizeChangeEvt = false;
            this._suspendArrayElementEvts = false;

            if (this._arrayElementChangeTimeout) {
                clearTimeout(this._arrayElementChangeTimeout);
                this._arrayElementChangeTimeout = null;
            }

            this.emit('change', this.value);
        }

        focus() {
            this._inputSize.focus();
        }

        blur() {
            this._inputSize.blur();
        }

        /**
         * @name ArrayInput#forEachArrayElement
         * @description Executes the specified function for each array element.
         * @param {Function} fn - The function with signature (element, index) => bool to execute. If the function returns
         * false then the iteration will early out.
         */
        forEachArrayElement(fn) {
            this._containerArray.forEachChild((container, i) => {
                return fn(container.dom.firstChild.ui, i);
            });
        }

        destroy() {
            if (this._destroyed) return;
            this._arrayElements.length = 0;
            super.destroy();
        }

        get binding() {
            return super.binding;
        }

        // override binding setter to create
        // the same type of binding on each array element too
        set binding(value) {
            super.binding = value;

            this._arrayElements.forEach((entry) => {
                entry.element.binding = value ? value.clone() : null;
            });
        }

        get value() {
            // construct value from values of array elements
            return this._arrayElements.map(entry => entry.element.value);
        }

        set value(value) {
            if (!Array.isArray(value)) {
                value = [];
            }

            const current = this.value || [];
            if (utils.arrayEquals(current, value)) return;

            // update values and binding
            this._updateValues(new Array(this._values.length || 1).fill(value), true);
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            if (utils.arrayEquals(this._values, values)) return;
            // update values but do not update binding
            this._updateValues(values, false);
        }

        get renderChanges() {
            return this._renderChanges;
        }

        set renderChanges(value) {
            this._renderChanges = value;
            this._arrayElements.forEach((entry) => {
                entry.element.renderChanges = value;
            });
        }
    }

    ArrayInput.DEFAULTS = {
        boolean: false,
        number: 0,
        string: '',
        vec2: [0, 0],
        vec3: [0, 0, 0],
        vec4: [0, 0, 0, 0]
    };

    for (const type in ArrayInput.DEFAULTS) {
        Element.register(`array:${type}`, ArrayInput, { type: type, renderChanges: true });
    }
    Element.register('array:select', ArrayInput, { type: 'select', renderChanges: true });

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon, .pcui-menu-item-content > .pcui-label[data-icon]:before, .pcui-menu-item-has-children > .pcui-menu-item-content > .pcui-label:after {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon, .pcui-menu-item-content > .pcui-label[data-icon]:before, .pcui-menu-item-has-children > .pcui-menu-item-content > .pcui-label:after {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-menu-item {\n  position: relative;\n  background-color: #20292b;\n  width: auto;\n}\n\n.pcui-menu-item-children {\n  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);\n  position: absolute;\n  z-index: 1;\n  left: 100%;\n  top: 0;\n  opacity: 0;\n  transition: opacity 100ms, visibility 100ms;\n  visibility: hidden;\n}\n\n.pcui-menu-item:hover > .pcui-menu-item-children {\n  opacity: 1;\n  visibility: visible;\n}\n\n.pcui-menu-item-has-children > .pcui-menu-item-content > .pcui-label {\n  padding-right: 32px;\n}\n.pcui-menu-item-has-children > .pcui-menu-item-content > .pcui-label:after {\n  content: \"\\e160\";\n  position: absolute;\n  right: 6px;\n}\n\n.pcui-menu-item-content {\n  min-width: 158px;\n  color: #9ba1a3;\n  border-bottom: 1px solid #263134;\n  cursor: pointer;\n}\n.pcui-menu-item-content:hover {\n  color: #ffffff;\n  background-color: #5b7073;\n}\n.pcui-menu-item-content > .pcui-label {\n  transition: none;\n}\n\n.pcui-menu-item:last-child > .pcui-menu-item-content {\n  border-bottom: none;\n}\n\n.pcui-menu-item-content > .pcui-label {\n  color: inherit;\n}\n.pcui-menu-item-content > .pcui-label[data-icon]:before {\n  content: attr(data-icon);\n  font-weight: 100;\n  font-size: inherit;\n  margin-right: 6px;\n  vertical-align: middle;\n}\n\n.pcui-menu-item.pcui-disabled .pcui-menu-item-content {\n  cursor: default;\n}\n.pcui-menu-item.pcui-disabled .pcui-menu-item-content:hover {\n  color: #9ba1a3;\n  background-color: transparent;\n}\n.pcui-menu-item.pcui-disabled .pcui-menu-item-content > .pcui-label {\n  cursor: default;\n  opacity: 0.4;\n}");

    const CLASS_MENU_ITEM = 'pcui-menu-item';
    const CLASS_MENU_ITEM_CONTENT = CLASS_MENU_ITEM + '-content';
    const CLASS_MENU_ITEM_CHILDREN = CLASS_MENU_ITEM + '-children';
    const CLASS_MENU_ITEM_HAS_CHILDREN = CLASS_MENU_ITEM + '-has-children';

    /**
     * @name MenuItem
     * @class
     * @classdesc The MenuItem is a selectable option that is appended to a Menu.
     * A MenuItem can also contain child MenuItems (by appending them to the MenuItem). This
     * can be useful to show nested Menus.
     * @augments Container
     * @mixes IBindable
     *
     * @property {boolean} hasChildren - Whether the MenuItem has any child MenuItems.
     * @property {string} text - Gets / sets the text shown on the MenuItem.
     * @property {string} icon - Gets / sets the CSS code for an icon for the MenuItem. e.g. E401 (notice we omit the '\' character).
     * @property {Menu} menu Gets / sets the parent Menu Element.
     * @property {Function} onSelect Gets / sets the function called when we select the MenuItem.
     * @property {Function} onIsEnabled Gets / sets the function that determines whether the MenuItem should be enabled when the Menu is shown.
     * @property {Function} onIsVisible Gets / sets the function that determines whether the MenuItem should be visible when the Menu is shown.
     */
    class MenuItem extends Container {
        /**
         * Creates new MenuItem.
         *
         * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
         * @param {object[]} args.items - An array of MenuItem constructor data. If defined then child MenuItems will be created and added to the MenuItem.
         */
        constructor(args) {
            if (!args) args = {};

            super(args);

            this.class.add(CLASS_MENU_ITEM);

            this._containerContent = new Container({
                class: CLASS_MENU_ITEM_CONTENT,
                flex: true,
                flexDirection: 'row'
            });
            this.append(this._containerContent);

            this._numChildren = 0;

            this._icon = null;

            this._labelText = new Label();
            this._containerContent.append(this._labelText);

            this._containerItems = new Container({
                class: CLASS_MENU_ITEM_CHILDREN
            });
            this.append(this._containerItems);
            this.domContent = this._containerItems.dom;

            this.text = args.text || 'Untitled';

            this._domEvtMenuItemClick = this._onClickMenuItem.bind(this);
            this.dom.addEventListener('click', this._domEvtMenuItemClick);

            if (args.value) {
                this.value = args.value;
            }
            if (args.icon) {
                this.icon = args.icon;
            }
            if (args.binding) {
                this.binding = args.binding;
            }

            this.onIsEnabled = args.onIsEnabled;
            this.onSelect = args.onSelect;
            this.onIsVisible = args.onIsVisible;

            this._menu = null;

            if (args.items) {
                args.items.forEach((item) => {
                    const menuItem = new MenuItem(item);
                    this.append(menuItem);
                });
            }
        }

        _onAppendChild(element) {
            super._onAppendChild(element);

            this._numChildren++;
            if (element instanceof MenuItem) {
                this.class.add(CLASS_MENU_ITEM_HAS_CHILDREN);
                element.menu = this.menu;
            }
        }

        _onRemoveChild(element) {
            if (element instanceof MenuItem) {
                this._numChildren--;
                if (this._numChildren === 0) {
                    this.class.remove(CLASS_MENU_ITEM_HAS_CHILDREN);
                }
                element.menu = null;
            }
            super._onRemoveChild(element);
        }

        _onClickMenuItem(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!this.disabled) {
                this.select();
            }
        }

        link(observers, paths) {
            super.link(observers, paths);
            this._labelText.link(observers, paths);
        }

        unlink() {
            super.unlink();
            this._labelText.unlink();
        }

        /**
         * Selects the MenuItem which also happens automatically
         * when the user clicks on the MenuItem.
         */
        select() {
            if (!this.enabled) return;
            if (this._onSelect) {
                this._onSelect();
            }
            this.emit('select');

            if (this.menu) {
                this.menu.hidden = true;
            }
        }

        destroy() {
            if (this.destroyed) return;

            this.dom.removeEventListener('click', this._domEvtMenuItemClick);

            super.destroy();
        }

        get text() {
            return this._labelText.text;
        }

        set text(value) {
            this._labelText.text = value;
        }

        get value() {
            return this.text;
        }

        set value(value) {
            this.text = value;
        }

        /* eslint accessor-pairs: 0 */
        set values(values) {
            this._labelText.values = values;
        }

        get icon() {
            return this._icon;
        }

        set icon(value) {
            if (this._icon === value | !value.match(/^E[0-9]{0,4}$/)) return;
            this._icon = value;
            if (value) {
                // set data-icon attribute but first convert the value to a code point
                this._labelText.dom.setAttribute('data-icon', String.fromCodePoint(parseInt(value, 16)));
            } else {
                this._labelText.dom.removeAttribute('data-icon');
            }
        }

        get binding() {
            return this._labelText.binding;
        }

        set binding(value) {
            this._labelText.binding = value;
        }

        get menu() {
            return this._menu;
        }

        set menu(value) {
            this._menu = value;

            // set menu on child menu items
            if (!this._containerItems.destroyed) {
                this._containerItems.dom.childNodes.forEach((child) => {
                    if (child.ui instanceof MenuItem) {
                        child.ui.menu = value;
                    }
                });
            }
        }

        get onSelect() {
            return this._onSelect;
        }

        set onSelect(value) {
            this._onSelect = value;
        }

        get onIsEnabled() {
            return this._onIsEnabled;
        }

        set onIsEnabled(value) {
            this._onIsEnabled = value;
        }

        get onIsVisible() {
            return this._onIsVisible;
        }

        set onIsVisible(value) {
            this._onIsVisible = value;
        }

        get hasChildren() {
            return this._numChildren > 0;
        }
    }

    ___$insertStyle("@font-face {\n  font-family: \"pc-icon\";\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot\");\n  src: url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.eot?#iefix\") format(\"embedded-opentype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff2\") format(\"woff2\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.woff\") format(\"woff\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.ttf\") format(\"truetype\"), url(\"https://playcanvas.com/static-assets/fonts/PlayIcons-Regular.svg\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n}\n.font-smooth, .font-icon {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: antialiased;\n}\n\n.font-thin {\n  font-weight: 100;\n  font-style: normal;\n}\n\n.font-light {\n  font-weight: 200;\n  font-style: normal;\n}\n\n.font-regular {\n  font-weight: normal;\n  font-style: normal;\n}\n\n.font-bold {\n  font-weight: bold;\n  font-style: normal;\n}\n\n.font-icon {\n  font-family: \"pc-icon\";\n}\n\n.fixedFont {\n  font-family: inconsolatamedium, Monaco, Menlo, \"Ubuntu Mono\", Consolas, source-code-pro, monospace;\n  font-weight: normal;\n  font-size: 12px;\n}\n\n.noSelect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.pcui-flex {\n  flex-direction: column;\n}\n.pcui-flex:not(.pcui-hidden) {\n  display: -webkit-flex;\n  display: flex;\n}\n\n.pcui-grid {\n  display: -ms-grid;\n  display: grid;\n}\n\n.pcui-scrollable {\n  overflow: auto;\n}\n\n.pcui-menu {\n  position: absolute;\n  z-index: 401;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  width: auto;\n  height: auto;\n}\n\n.pcui-menu-items {\n  position: fixed;\n  top: 0;\n  left: 0;\n}");

    const CLASS_MENU = 'pcui-menu';
    const CLASS_MENU_ITEMS = CLASS_MENU + '-items';

    /**
     * @name Menu
     * @class
     * @classdesc A Menu is a list of MenuItems which can contain child MenuItems. Useful
     * to show context menus and nested menus. Note that a Menu must be appended to the root Element
     * and then positioned accordingly.
     * @augments Container
     * @mixes IFocusable
     */
    class Menu extends Container {
        /**
         * Creates a new Menu.
         *
         * @param {object} args - The arguments. Extends the pcui.Container constructor arguments. All settable properties can also be set through the constructor.
         * @param {object[]} args.items - An optional array of MenuItem data. If these are passed then new MenuItems will be created and appended to the menu.
         */
        constructor(args) {
            if (!args) args = {};

            if (args.hidden === undefined) {
                args.hidden = true;
            }

            if (args.tabIndex === undefined) {
                args.tabIndex = 1;
            }

            super(args);

            this.class.add(CLASS_MENU);

            this._containerMenuItems = new Container({
                class: CLASS_MENU_ITEMS,
                flex: true,
                flexDirection: 'column'
            });
            this.append(this._containerMenuItems);

            this.domContent = this._containerMenuItems.dom;

            this._domEvtContextMenu = this._onClickMenu.bind(this);
            this._domEvtKeyDown = this._onKeyDown.bind(this);
            this._domEvtFocus = this._onFocus.bind(this);
            this._domEvtBlur = this._onBlur.bind(this);

            this.on('click', this._onClickMenu.bind(this));
            this.on('show', this._onShowMenu.bind(this));
            this.dom.addEventListener('contextmenu', this._domEvtContextMenu);
            this.dom.addEventListener('keydown', this._domEvtKeyDown);

            if (args.items) {
                args.items.forEach((item) => {
                    const menuItem = new MenuItem(item);
                    this.append(menuItem);
                });
            }
        }

        _onAppendChild(element) {
            if (element instanceof MenuItem) {
                element.menu = this;
            }
        }

        _onRemoveChild(element) {
            if (element instanceof MenuItem) {
                element.menu = null;
            }
        }

        _onClickMenu(evt) {
            if (!this._containerMenuItems.dom.contains(evt.target)) {
                this.hidden = true;
            }
        }

        _onFocus(evt) {
            this.emit('focus');
        }

        _onBlur(evt) {
            this.emit('blur');
        }

        _onShowMenu() {
            this.focus();

            // filter child menu items
            this._containerMenuItems.dom.childNodes.forEach((child) => {
                this._filterMenuItems(child.ui);
            });
        }

        _filterMenuItems(item) {
            if (!(item instanceof MenuItem)) return;

            if (item.onIsEnabled) {
                item.enabled = item.onIsEnabled();
            }
            if (item.onIsVisible) {
                item.hidden = !item.onIsVisible();
            }

            item._containerItems.dom.childNodes.forEach((child) => {
                this._filterMenuItems(child.ui);
            });
        }

        _onKeyDown(evt) {
            if (this.hidden) return;

            // hide on esc
            if (evt.keyCode === 27) {
                this.hidden = true;
            }
        }

        _limitSubmenuAtScreenEdges(item) {
            if (!(item instanceof MenuItem) || !item.hasChildren) return;

            item._containerItems.style.top = '';
            item._containerItems.style.left = '';
            item._containerItems.style.right = '';

            const rect = item._containerItems.dom.getBoundingClientRect();
            // limit to bottom / top of screen
            if (rect.bottom > window.innerHeight) {
                item._containerItems.style.top = -(rect.bottom - window.innerHeight) + 'px';
            }
            if (rect.right > window.innerWidth) {
                item._containerItems.style.left = 'auto';
                item._containerItems.style.right = '100%';
            }

            item._containerItems.dom.childNodes.forEach((child) => {
                this._limitSubmenuAtScreenEdges(child.ui);
            });
        }

        focus() {
            this.dom.focus();
        }

        blur() {
            this.dom.blur();
        }

        /**
         * Positions the menu at the specified coordinates.
         *
         * @param {number} x - The x coordinate.
         * @param {number} y - The y coordinate.
         */
        position(x, y) {
            const rect = this._containerMenuItems.dom.getBoundingClientRect();

            let left = (x || 0);
            let top = (y || 0);

            // limit to bottom / top of screen
            if (top + rect.height > window.innerHeight) {
                top = window.innerHeight - rect.height;
            } else if (top < 0) {
                top = 0;
            }
            if (left + rect.width > window.innerWidth) {
                left = window.innerWidth - rect.width;
            } else if (left < 0) {
                left = 0;
            }

            this._containerMenuItems.style.left = left + 'px';
            this._containerMenuItems.style.top = top + 'px';

            this._containerMenuItems.dom.childNodes.forEach((child) => {
                this._limitSubmenuAtScreenEdges(child.ui);
            });
        }

        destroy() {
            if (this.destroyed) return;

            this.dom.removeEventListener('keydown', this._domEvtKeyDown);
            this.dom.removeEventListener('contextmenu', this._domEvtContextMenu);
            this.dom.removeEventListener('focus', this._domEvtFocus);
            this.dom.removeEventListener('blur', this._domEvtBlur);

            super.destroy();
        }
    }

    /**
     * @name BindingElementToObservers
     * @class
     * @classdesc Provides one way binding between an IBindable element and Observers. Any changes from the element
     * will be propagated to the observers.
     * @augments BindingBase
     */
    class BindingElementToObservers extends BindingBase {
        clone() {
            return new BindingElementToObservers({
                history: this._history,
                historyPrefix: this._historyPrefix,
                historyPostfix: this._historyPostfix,
                historyName: this._historyName,
                historyCombine: this._historyCombine
            });
        }

        _getHistoryActionName(paths) {
            return `${this._historyPrefix || ''}${this._historyName || paths[0]}${this._historyPostfix || ''}`;
        }

        // Sets the value (or values of isArrayOfValues is true)
        // to the observers
        _setValue(value, isArrayOfValues) {
            if (this.applyingChange) return;
            if (!this._observers) return;

            this.applyingChange = true;

            // make copy of observers if we are using history
            // so that we can undo on the same observers in the future
            const observers = this._observers.slice();
            const paths = this._paths.slice();
            const context = {
                observers,
                paths
            };

            const execute = () => {
                this._setValueToObservers(observers, paths, value, isArrayOfValues);
                this.emit('history:redo', context);
            };

            if (this._history) {
                let previousValues = [];
                if (observers.length === 1 && paths.length > 1) {
                    previousValues = paths.map((path) => {
                        return observers[0].has(path) ? observers[0].get(path) : undefined;
                    });
                } else {
                    previousValues = observers.map((observer, i) => {
                        const path = this._pathAt(paths, i);
                        return observer.has(path) ? observer.get(path) : undefined;
                    });
                }

                this.emit('history:init', context);

                this._history.add({
                    name: this._getHistoryActionName(paths),
                    redo: execute,
                    combine: this._historyCombine,
                    undo: () => {
                        this._setValueToObservers(observers, paths, previousValues, true);
                        this.emit('history:undo', context);
                    }
                });

            }

            execute();

            this.applyingChange = false;
        }

        _setValueToObservers(observers, paths, value, isArrayOfValues) {
            // special case for 1 observer with multiple paths (like curves)
            // in that case set each value for each path
            if (observers.length === 1 && paths.length > 1) {
                for (let i = 0; i < paths.length; i++) {
                    const latest = observers[0].latest();
                    if (!latest) continue;

                    let history = false;
                    if (latest.history) {
                        history = latest.history.enabled;
                        latest.history.enabled = false;
                    }

                    const path = paths[i];
                    const val = value[i];
                    if (value !== undefined) {
                        this._observerSet(latest, path, val);
                    } else {
                        latest.unset(path);
                    }

                    if (history) {
                        latest.history.enabled = true;
                    }
                }
                return;
            }

            for (let i = 0; i < observers.length; i++) {
                const latest = observers[i].latest();
                if (!latest) continue;

                let history = false;
                if (latest.history) {
                    history = latest.history.enabled;
                    latest.history.enabled = false;
                }

                const path = this._pathAt(paths, i);
                const val = isArrayOfValues ? value[i] : value;
                if (value !== undefined) {
                    this._observerSet(latest, path, val);
                } else {
                    latest.unset(path);
                }

                if (history) {
                    latest.history.enabled = true;
                }
            }
        }

        // Handles setting a value to an observer
        // in case that value is an array
        _observerSet(observer, path, value) {
            // check if the parent of the last field in the path
            // exists in the observer because if it doesn't
            // an error is most likely going to be raised by C3
            const lastIndexDot = path.lastIndexOf('.');
            if (lastIndexDot > 0 && !observer.has(path.substring(0, lastIndexDot))) {
                return;
            }

            const isArray = Array.isArray(value);
            // we need to slice an array value before passing it to the 'set'
            // method otherwise there are cases where the Observer will be modifying
            // the same array instance
            observer.set(path, isArray && value ? value.slice() : value);
        }

        _addValues(values) {
            if (this.applyingChange) return;
            if (!this._observers) return;

            this.applyingChange = true;

            // make copy of observers if we are using history
            // so that we can undo on the same observers in the future
            const observers = this._observers.slice();
            const paths = this._paths.slice();

            const records = [];
            for (let i = 0; i < observers.length; i++) {
                const path = this._pathAt(paths, i);
                const observer = observers[i];

                values.forEach((value) => {
                    if (observer.get(path).indexOf(value) === -1)  {
                        records.push({
                            observer: observer,
                            path: path,
                            value: value
                        });
                    }
                });
            }

            const execute = () => {
                for (let i = 0; i < records.length; i++) {
                    const latest = records[i].observer.latest();
                    if (!latest) continue;

                    const path = records[i].path;

                    let history = false;
                    if (latest.history) {
                        history = latest.history.enabled;
                        latest.history.enabled = false;
                    }

                    latest.insert(path, records[i].value);

                    if (history) {
                        latest.history.enabled = true;
                    }
                }
            };

            if (this._history && records.length) {
                this._history.add({
                    name: this._getHistoryActionName(paths),
                    redo: execute,
                    combine: this._historyCombine,
                    undo: () => {
                        for (let i = 0; i < records.length; i++) {
                            const latest = records[i].observer.latest();
                            if (!latest) continue;

                            const path = records[i].path;

                            let history = false;
                            if (latest.history) {
                                history = latest.history.enabled;
                                latest.history.enabled = false;
                            }

                            latest.removeValue(path, records[i].value);

                            if (history) {
                                latest.history.enabled = true;
                            }
                        }
                    }
                });
            }

            execute();

            this.applyingChange = false;
        }

        _removeValues(values) {
            if (this.applyingChange) return;
            if (!this._observers) return;

            this.applyingChange = true;

            // make copy of observers if we are using history
            // so that we can undo on the same observers in the future
            const observers = this._observers.slice();
            const paths = this._paths.slice();

            const records = [];
            for (let i = 0; i < observers.length; i++) {
                const path = this._pathAt(paths, i);
                const observer = observers[i];

                values.forEach((value) => {
                    const ind = observer.get(path).indexOf(value);
                    if (ind !== -1)  {
                        records.push({
                            observer: observer,
                            path: path,
                            value: value,
                            index: ind
                        });
                    }
                });
            }

            const execute = () => {
                for (let i = 0; i < records.length; i++) {
                    const latest = records[i].observer.latest();
                    if (!latest) continue;

                    const path = records[i].path;

                    let history = false;
                    if (latest.history) {
                        history = latest.history.enabled;
                        latest.history.enabled = false;
                    }

                    latest.removeValue(path, records[i].value);

                    if (history) {
                        latest.history.enabled = true;
                    }
                }
            };

            if (this._history && records.length) {
                this._history.add({
                    name: this._getHistoryActionName(paths),
                    redo: execute,
                    combine: this._historyCombine,
                    undo: () => {
                        for (let i = 0; i < records.length; i++) {
                            const latest = records[i].observer.latest();
                            if (!latest) continue;

                            const path = records[i].path;

                            let history = false;
                            if (latest.history) {
                                history = latest.history.enabled;
                                latest.history.enabled = false;
                            }

                            if (latest.get(path).indexOf(records[i].value) === -1) {
                                latest.insert(path, records[i].value, records[i].index);
                            }

                            if (history) {
                                latest.history.enabled = true;
                            }
                        }
                    }
                });
            }

            execute();

            this.applyingChange = false;
        }

        setValue(value) {
            this._setValue(value, false);
        }

        setValues(values) {
            // make sure we deep copy arrays because they will not be cloned when set to the observers
            values = values.slice().map(val => (Array.isArray(val) ? val.slice() : val));
            this._setValue(values, true);
        }

        addValue(value) {
            this._addValues([value]);
        }

        addValues(values) {
            this._addValues(values);
        }

        removeValue(value) {
            this._removeValues([value]);
        }

        removeValues(values) {
            this._removeValues(values);
        }
    }

    /**
     * @name BindingTwoWay
     * @class
     * @classdesc Provides two way data binding between Observers and IBindable elements. This means
     * that when the value of the Observers changes the IBindable will be updated and vice versa.
     * @augments BindingBase
     */
    class BindingTwoWay extends BindingBase {
        /**
         * Creates a new BindingTwoWay instance.
         *
         * @param {object} args - The arguments.
         */
        constructor(args) {
            if (!args) args = {};

            super(args);

            this._bindingElementToObservers = args.bindingElementToObservers || new BindingElementToObservers(args);
            this._bindingObserversToElement = args.bindingObserversToElement || new BindingObserversToElement(args);

            this._applyingChange = false;
            this._bindingElementToObservers.on('applyingChange', (value) => {
                this.applyingChange = value;
            });
            this._bindingElementToObservers.on('history:init', (context) => {
                this.emit('history:init', context);
            });
            this._bindingElementToObservers.on('history:undo', (context) => {
                this.emit('history:undo', context);
            });
            this._bindingElementToObservers.on('history:redo', (context) => {
                this.emit('history:redo', context);
            });

            this._bindingObserversToElement.on('applyingChange', (value) => {
                this.applyingChange = value;
            });
        }

        link(observers, paths) {
            super.link(observers, paths);
            this._bindingElementToObservers.link(observers, paths);
            this._bindingObserversToElement.link(observers, paths);
        }


        unlink() {
            this._bindingElementToObservers.unlink();
            this._bindingObserversToElement.unlink();
            super.unlink();
        }

        clone() {
            return new BindingTwoWay({
                bindingElementToObservers: this._bindingElementToObservers.clone(),
                bindingObserversToElement: this._bindingObserversToElement.clone()
            });
        }

        setValue(value) {
            this._bindingElementToObservers.setValue(value);
        }

        setValues(values) {
            this._bindingElementToObservers.setValues(values);
        }

        addValue(value) {
            this._bindingElementToObservers.addValue(value);
        }

        addValues(values) {
            this._bindingElementToObservers.addValues(values);
        }

        removeValue(value) {
            this._bindingElementToObservers.removeValue(value);
        }

        removeValues(values) {
            this._bindingElementToObservers.removeValues(values);
        }

        get element() {
            return this._element;
        }

        set element(value) {
            this._element = value;
            this._bindingElementToObservers.element = value;
            this._bindingObserversToElement.element = value;
        }

        get applyingChange() {
            return super.applyingChange;
        }

        set applyingChange(value) {
            if (super.applyingChange === value) return;

            this._bindingElementToObservers.applyingChange = value;
            this._bindingObserversToElement.applyingChange = value;
            super.applyingChange = value;
        }

        get historyCombine() {
            return this._bindingElementToObservers.historyCombine;
        }

        set historyCombine(value) {
            this._bindingElementToObservers.historyCombine = value;
        }

        get historyPrefix() {
            return this._bindingElementToObservers.historyPrefix;
        }

        set historyPrefix(value) {
            this._bindingElementToObservers.historyPrefix = value;
        }

        get historyPostfix() {
            return this._bindingElementToObservers.historyPostfix;
        }

        set historyPostfix(value) {
            this._bindingElementToObservers.historyPostfix = value;
        }

        get historyEnabled() {
            return this._bindingElementToObservers.historyEnabled;
        }

        set historyEnabled(value) {
            this._bindingElementToObservers.historyEnabled = value;
        }
    }

    exports.ArrayInput = ArrayInput;
    exports.BindingBase = BindingBase;
    exports.BindingElementToObservers = BindingElementToObservers;
    exports.BindingObserversToElement = BindingObserversToElement;
    exports.BindingTwoWay = BindingTwoWay;
    exports.BooleanInput = BooleanInput;
    exports.Button = Button;
    exports.Code = Code;
    exports.Container = Container;
    exports.ContextMenu = ContextMenu;
    exports.Divider = Divider;
    exports.Element = Element;
    exports.GridView = GridView;
    exports.GridViewItem = GridViewItem;
    exports.IBindable = IBindable;
    exports.ICollapsible = ICollapsible;
    exports.IFlex = IFlex;
    exports.IFocusable = IFocusable;
    exports.IGrid = IGrid;
    exports.IResizable = IResizable;
    exports.IScrollable = IScrollable;
    exports.InfoBox = InfoBox;
    exports.Label = Label;
    exports.LabelGroup = LabelGroup;
    exports.Menu = Menu;
    exports.MenuItem = MenuItem;
    exports.NumericInput = NumericInput;
    exports.Overlay = Overlay;
    exports.Panel = Panel;
    exports.Progress = Progress;
    exports.SelectInput = SelectInput;
    exports.SliderInput = SliderInput;
    exports.Spinner = Spinner;
    exports.TextAreaInput = TextAreaInput;
    exports.TextInput = TextInput;
    exports.TreeView = TreeView;
    exports.TreeViewItem = TreeViewItem;
    exports.VectorInput = VectorInput;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
