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
