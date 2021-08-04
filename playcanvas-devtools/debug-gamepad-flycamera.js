(function() {
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

        this.gamepadIndex = 0;
        this.invert = false;

        this._lastFrameTimestamp = Date.now();
        this._dt = 0;
                
        this.position = this.entity.getPosition().clone();

        this._startLocalPosition = this.entity.getLocalPosition().clone();
        this._startLocalRotation = this.entity.getLocalRotation().clone();
        
        this._mouseTargetElement = this.app.mouse._target;
        this._keyboardTargetElement = this.app.mouse._target;

        this.app.mouse.disableContextMenu();
        this.app.mouse.detach();
        
        this.app.keyboard.detach();
        
        this._defaultTimeScale = this.app.timeScale;
                
        // The keyboard and mouse controllers for the camera
        this._keyboard = new pc.Keyboard(this._keyboardTargetElement);
        this._mouse = new pc.Mouse(this._mouseTargetElement);
        
        // Use your own PlayCanvas mouse and keyboard instances?
        this._mouse.on('mousemove', this._onMouseMove, this);

        this.app.on('framerender', this._update, this);
        this.on('destroy', function() {
            this.app.off('framerender', this._update, this);

            this.entity.setLocalPosition(this._startLocalPosition);
            this.entity.setLocalRotation(this._startLocalRotation);
            
            // Remove the fly camera specific handlers
            this._mouse.detach();
            this._keyboard.detach();
            
            // Re-add the engine's default handlers
            this.app.mouse.attach(this._mouseTargetElement);
            this.app.keyboard.attach(this._keyboardTargetElement);
            
            this.app.timeScale = this._defaultTimeScale;
        }, this);
    };


    DebugGamepadFlyCamera.prototype.update = function () {
        var timeStamp = Date.now();
        this._dt = (timeStamp - this._lastFrameTimestamp)/1000;

        this._lastFrameTimestamp = timeStamp;
        
        this._mouse.update();
    };


    DebugGamepadFlyCamera.__moveAmount = new pc.Vec3();
    DebugGamepadFlyCamera.prototype._update = function () {
        var app = this.app;
        var dt = this._dt;

        var gamepads = this.app.gamepads;
        if (!gamepads) {
            return;
        }

        var moveStickX = 0;
        var moveStickY = 0;

        var lookStickX = 0;
        var lookStickY = 0;

        var leftTrigger = 0;
        var rightTrigger = 0;
        
        var pausePressed = false;

        if (gamepads) {
            moveStickX = gamepads.getAxis(this.gamepadIndex, pc.PAD_L_STICK_X);
            moveStickY = gamepads.getAxis(this.gamepadIndex, pc.PAD_L_STICK_Y);

            lookStickX = gamepads.getAxis(this.gamepadIndex, pc.PAD_R_STICK_X);
            lookStickY = gamepads.getAxis(this.gamepadIndex, pc.PAD_R_STICK_Y);

            if (gamepads.current[this.gamepadIndex]) {
                pad = gamepads.current[this.gamepadIndex].pad;
                leftTrigger = pad.buttons[6].value;
                rightTrigger = pad.buttons[7].value;
            }
            
            // Update settings from controller
            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_UP)) {
                this.moveSensitivity += 5;
            }

            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_DOWN)) {
                this.moveSensitivity -= 5;
            }

            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_LEFT)) {
                this.lookSensitivity -= 25;
            }

            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_RIGHT)) {
                this.lookSensitivity += 25;
            }

            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_FACE_1)) {
                this.invert = !this.invert;
            }
            
            if (gamepads.wasPressed(this.gamepadIndex, pc.PAD_START)) {
                pausePressed = true;
            }
        }
        
        // Check for keyboard controls
        if (this._keyboard.isPressed(pc.KEY_W)) {
            moveStickY -= 1;
        }
        
        if (this._keyboard.isPressed(pc.KEY_S)) {
            moveStickY += 1;
        }
        
        if (this._keyboard.isPressed(pc.KEY_A)) {
            moveStickX -= 1;
        }
        
        if (this._keyboard.isPressed(pc.KEY_D)) {
            moveStickX += 1;
        }
        
        if (this._keyboard.isPressed(pc.KEY_Q)) {
            leftTrigger += 1;
        }
        
        if (this._keyboard.isPressed(pc.KEY_E)) {
            rightTrigger += 1;
        }
        
        if (this._keyboard.wasPressed(pc.KEY_UP)) {
            this.moveSensitivity += 5;
        }

        if (this._keyboard.wasPressed(pc.KEY_DOWN)) { 
            this.moveSensitivity -= 5;
        }

        if (this._keyboard.wasPressed(pc.KEY_LEFT)) {
            this.lookSensitivity -= 25;
        }

        if (this._keyboard.wasPressed(pc.KEY_RIGHT)) {
            this.lookSensitivity += 25;
        }

        if (this._keyboard.wasPressed(pc.KEY_I)) {
            this.invert = !this.invert;
        }
        
        if (this._keyboard.wasPressed(pc.KEY_P)) {
            pausePressed = true; 
        }
        
        // Toggle timeScale 
        if (pausePressed) {
            if (this.app.timeScale > 0) {
                this.app.timeScale = 0;
            } else {
                this.app.timeScale = this._defaultTimeScale;
            }
        }

        // Update look at direction
        this._updateLook(lookStickX, lookStickY);

        this.entity.setLocalEulerAngles(this.ex, this.ey, 0);

        // Update the camera's position
        var moveAmount = DebugGamepadFlyCamera.__moveAmount;
        moveAmount.copy(this.entity.forward).scale(this.moveSensitivity * dt * -moveStickY);
        this.position.add(moveAmount);

        moveAmount.copy(this.entity.right).scale(this.moveSensitivity * dt * moveStickX);
        this.position.add(moveAmount);

        // Update panning
        moveAmount.copy(this.entity.up).scale(this.moveSensitivity * dt * (leftTrigger - rightTrigger));
        this.position.add(moveAmount);  
        
        this.entity.setPosition(this.position);

        // Force render
        this.app.renderNextFrame = true;
        
        // Mirror the order of the engine updates
        this._keyboard.update();
    };


    DebugGamepadFlyCamera.prototype._onMouseMove = function (e) {
        if (!!this._lastFrameMouseX) {
            var dx = e.x - this._lastFrameMouseX;
            var dy = e.y - this._lastFrameMouseY;

            if (e.buttons[pc.MOUSEBUTTON_RIGHT]) {
                this._updateLook(dx / 10, dy / 10);
            }
        }

        this._lastFrameMouseX = e.x;
        this._lastFrameMouseY = e.y;
    };


    DebugGamepadFlyCamera.prototype._updateLook = function (x, y) {
        this.ex += this.lookSensitivity * this._dt * y * (this.invert ? 1 : -1);
        this.ex = pc.math.clamp(this.ex, -90, 90);

        this.ey += this.lookSensitivity * this._dt * -x;    
    };
})();
