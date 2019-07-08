export default class Player {
    constructor(controller) {
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.angle = 180.0;
        this.target = new THREE.Vector3(0, 2.0, 1.0);
        this.controller = controller;
        this.controller.handleKeyInput();
    }

    update() {
        this.prevPos = Object.assign({}, this.camera.position);

        this.target.x = Math.cos(Math.PI * this.angle / 180.0) + this.camera.position.x;
        this.target.z = Math.sin(Math.PI * this.angle / 180.0) + this.camera.position.z;

        if (this.controller.moveKeys.get(37)) { // Left
            this.angle -= 1.0;
        }
        if (this.controller.moveKeys.get(39)) { // Right
            this.angle += 1.0;
        }
        if (this.controller.moveKeys.get(38)) { // Forward
            this.camera.position.x += (this.target.x - this.camera.position.x) / 10.0;
            this.camera.position.z += (this.target.z - this.camera.position.z) / 10.0;
        }
        if (this.controller.moveKeys.get(40)) { // Back
            this.camera.position.x -= (this.target.x - this.camera.position.x) / 10.0;
            this.camera.position.z -= (this.target.z - this.camera.position.z) / 10.0;
        }
        this.camera.lookAt(this.target);
        
    }
}