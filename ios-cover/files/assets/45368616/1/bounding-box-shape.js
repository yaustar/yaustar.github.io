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
