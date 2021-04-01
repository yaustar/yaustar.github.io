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