export default class Player {
    constructor(controller) {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.angle = 180.0;
        this.target = new THREE.Vector3(0, 2.0, 1.0);
        this.controller = controller;
        this.controller.handleKeyInput();
        this.controller.handleMouseMove(this);
    }

    update() {
        if (this.controller.moveKeys.get(37) || this.controller.moveKeys.get(65)) { // Left
            this.camera.translateX(-0.1);
        }
        if (this.controller.moveKeys.get(39) || this.controller.moveKeys.get(68)) { // Right
            this.camera.translateX(0.1);
        }
        if (this.controller.moveKeys.get(38) || this.controller.moveKeys.get(87)) { // Forward
            this.camera.translateZ(-0.1);
            this.camera.translateY(2.0 - this.camera.position.y);
        }
        if (this.controller.moveKeys.get(40) || this.controller.moveKeys.get(83)) { // Back
            this.camera.translateZ(0.1);
            this.camera.translateY(2.0 - this.camera.position.y);
        }

        this.camera.position.y = 2.0; // Prevent take-off...
    }
}