var DebugGamepadFlyCamera = pc.createScript('__debugGamepadFlyCamera__');

DebugGamepadFlyCamera.attributes.add('moveSensitivity', {
    type: 'number',
    default: 5
});

DebugGamepadFlyCamera.attributes.add('lookSensitivity', {
    type: 'number',
    default: 75
});


DebugGamepadFlyCamera.prototype.initialize = function () {
    // Camera euler angle rotation around x and y axes
    var eulers = this.entity.getLocalEulerAngles().clone();
    this.ex = eulers.x;
    this.ey = eulers.y;
    
    this.position = this.entity.getPosition().clone();
    
    this.gamepadIndex = 0;
    this.invert = true;
    
    this._dt = 0;
    
    
    this.app.on('prerender', this._update, this);
    this.on('destroy', function() {
        this.app.off('prerender', this._update, this);
    }, this);
};

DebugGamepadFlyCamera.prototype.update = function (dt) {
    this._dt = dt;
};


DebugGamepadFlyCamera.__moveAmount = new pc.Vec3();
DebugGamepadFlyCamera.prototype._update = function () {
    var dt = this._dt;
    var app = this.app;
    
    var gamepads = this.app.gamepads;
    if (!gamepads) {
        return;
    }
        
    var moveStickX = gamepads.getAxis(this.gamepadIndex, pc.PAD_L_STICK_X);
    var moveStickY = gamepads.getAxis(this.gamepadIndex, pc.PAD_L_STICK_Y);
    
    var lookStickX = gamepads.getAxis(this.gamepadIndex, pc.PAD_R_STICK_X);
    var lookStickY = gamepads.getAxis(this.gamepadIndex, pc.PAD_R_STICK_Y);
    
    // Update look at direction
    this.ex += this.lookSensitivity * dt * lookStickY * (this.invert ? 1 : -1);
    this.ex = pc.math.clamp(this.ex, -90, 90);
    
    this.ey += this.lookSensitivity * dt * -lookStickX;
    
    this.entity.setLocalEulerAngles(this.ex, this.ey, 0);
    
    // Update the camera's position
    var moveAmount = DebugGamepadFlyCamera.__moveAmount;
    moveAmount.copy(this.entity.forward).mulScalar(this.moveSensitivity * dt * -moveStickY);
    this.position.add(moveAmount);
    
    moveAmount.copy(this.entity.right).mulScalar(this.moveSensitivity * dt * moveStickX);
    this.position.add(moveAmount);

    // Update panning
    if (gamepads.current[this.gamepadIndex]) {
        var pad = gamepads.current[this.gamepadIndex].pad;
        var leftTrigger = pad.buttons[6].value;
        var rightTrigger = pad.buttons[7].value;
        
        moveAmount.copy(this.entity.up).mulScalar(this.moveSensitivity * dt * (leftTrigger - rightTrigger));
        this.position.add(moveAmount);  
    }
    
    this.entity.setPosition(this.position);
};
