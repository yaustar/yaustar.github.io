// toggle-dpr.js
var ToggleDpr = pc.createScript('toggleDpr');

// initialize code called once per entity
ToggleDpr.prototype.initialize = function() {
    this._on = false;
    this.entity.button.on('click', function () {
        this._on = !this._on;
        this.app.graphicsDevice.maxPixelRatio = this._on ? window.devicePixelRatio : 1;
    }, this);
};

// swap method called for script hot-reloading
// inherit your script state here
// ToggleDpr.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

// bounding-box-shape.js
// More information here: http://developer.playcanvas.com/en/api/pc.BoundingBox.html
var BoundingBoxShape = pc.createScript('boundingBoxShape');

BoundingBoxShape.attributes.add("halfExtents", {type: "vec3", title: "Half Extents"});

// initialize code called once per entity
BoundingBoxShape.prototype.initialize = function() {
    // Create the AABB and move the position of the box by the offset
    this.aabb = new pc.BoundingBox(this.entity.getPosition(), this.halfExtents);
};

BoundingBoxShape.prototype.postInitialize = function() {
    this.app.fire("shapepicker:add", this.entity, this.aabb);    
};

BoundingBoxShape.prototype.update = function(dt) {  
    // Update the position of the AABB so it matches the position of the entity
    this.aabb.center.copy(this.entity.getPosition());
};


// bounding-sphere-shape.js
// More information here: http://developer.playcanvas.com/en/api/pc.BoundingSphere.html
var BoundingSphereShape = pc.createScript('boundingSphereShape');

BoundingSphereShape.attributes.add("radius", {type: "number", title: "Radius"});

// initialize code called once per entity
BoundingSphereShape.prototype.initialize = function() {
    // Create the bounding sphere and move the position of the sphere by the offset
    this.boundingSphere = new pc.BoundingSphere(this.entity.getPosition(), this.radius);
};

BoundingSphereShape.prototype.postInitialize = function() {
    this.app.fire("shapepicker:add", this.entity, this.boundingSphere);    
};

BoundingSphereShape.prototype.update = function(dt) {  
    // Update the position of the boudning sphere so it matches the position of the entity
    this.boundingSphere.center.copy(this.entity.getPosition());
};


// shape-picker.js
var ShapePicker = pc.createScript('shapePicker');

ShapePicker.attributes.add("cameraEntity", {type: "entity", title: "Camera Entity"});
ShapePicker.attributes.add("hitMarkerEntity", {type: "entity", title: "Hit Marker Entity"});

// initialize code called once per entity
ShapePicker.prototype.initialize = function() {
    // More information about pc.ray: http://developer.playcanvas.com/en/api/pc.Ray.html
    this.ray = new pc.Ray();
    
    // Keep an array of all the entities we can pick at
    this.pickableEntities = [];
    this.pickableShapes = [];
    
    // Register events for when pickable entities are created
    this.app.on("shapepicker:add", this.addItem, this);
    this.app.on("shapepicker:remove", this.removeItem, this);
    
    // Register the mouse down and touch start event so we know when the user has clicked
    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    
    if (this.app.touch) {
        this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
    }
    
    this.hitPosition = new pc.Vec3();
};

ShapePicker.prototype.doRayCast = function (screenPosition) {
    // Initialise the ray and work out the direction of the ray from the a screen position
    this.cameraEntity.camera.screenToWorld(screenPosition.x, screenPosition.y, this.cameraEntity.camera.farClip, this.ray.direction); 
    this.ray.origin.copy(this.cameraEntity.getPosition());
    this.ray.direction.sub(this.ray.origin).normalize();
    
    // Test the ray against all the objects registered to this picker
    for (var i = 0; i < this.pickableShapes.length; ++i) {
        var pickableShape = this.pickableShapes[i];
        var result = pickableShape.intersectsRay(this.ray, this.hitPosition);
        
        if (result) {
            this.hitMarkerEntity.setPosition(this.hitPosition);
        }
    }    
};

ShapePicker.prototype.onMouseDown = function(event) {
    if (event.button == pc.MOUSEBUTTON_LEFT) {
        this.doRayCast(event);
    }
};

ShapePicker.prototype.onTouchStart = function (event) {
    // On perform the raycast logic if the user has one finger on the screen
    if (event.touches.length == 1) {
        this.doRayCast(event.touches[0]);
        
        // Android registers the first touch as a mouse event so it is possible for 
        // the touch event and mouse event to be triggered at the same time
        // Doing the following line will prevent the mouse down event from triggering
        event.event.preventDefault();
    }    
};

ShapePicker.prototype.addItem = function (entity, shape) {
    if (entity) {
        this.pickableEntities.push(entity);
        this.pickableShapes.push(shape);
    }
};
        
ShapePicker.prototype.removeItem = function (entity) {
    var i = this._items.indexOf(entity);
    if (i >= 0) {
        this.pickableEntities.splice(i, 1);
        this.pickableShapes.splice(i, 1);
    }
};

// ui.js
var Ui = pc.createScript('ui');

Ui.attributes.add('css', {type: 'asset', assetType:'css', title: 'CSS Asset'});
Ui.attributes.add('html', {type: 'asset', assetType:'html', title: 'HTML Asset'});

Ui.prototype.initialize = function () {
    // create STYLE element
    var style = document.createElement('style');

    // append to head
    document.head.appendChild(style);
    style.innerHTML = this.css.resource || '';
    
    // Add the HTML
    this.div = document.createElement('div');
    this.div.classList.add('container');
    this.div.innerHTML = this.html.resource || '';
    
    // append to body
    // can be appended somewhere else
    // it is recommended to have some container element
    // to prevent iOS problems of overfloating elements off the screen
    document.body.appendChild(this.div);
    
    this.counter = 0;
    
    this.bindEvents();
};

Ui.prototype.bindEvents = function() {
    var self = this;
    // example
    //
    // get button element by class
    var button = this.div.querySelector('.button');
    var counter = this.div.querySelector('.counter');
    // if found
    if (button) {
        // add event listener on `click`
        button.addEventListener('click', function() {
            ++self.counter;
            if (counter)
                counter.textContent = self.counter;
            
            console.log('button clicked');

            // try to find object and change its material diffuse color
            // just for fun purposes
            var obj = pc.app.root.findByName('chamferbox');
            if (obj && obj.model && obj.model.model) {
                var material = obj.model.model.meshInstances[0].material;
                if (material) {
                    material.diffuse.set(Math.random(), Math.random(), Math.random());
                    material.update();
                }
            }
        }, false);
    }

    if (counter)
        counter.textContent = self.counter;
};

// full-screen.js
var FullScreen = pc.createScript('fullScreen');

// initialize code called once per entity
FullScreen.prototype.initialize = function() {
    this.entity.button.on('click', function() {
        this.app.graphicsDevice.fullscreen = !this.app.graphicsDevice.fullscreen;
    }, this);
};


// swap method called for script hot-reloading
// inherit your script state here
// FullScreen.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

