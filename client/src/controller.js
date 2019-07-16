const PI_2 = Math.PI / 2;

export default class Controller {
    constructor() {
        this.moveKeys = new Map([
            [37, false], [38, false], [39, false], [40, false], // Left, Up, Right, Down
            [87, false], [65, false], [83, false], [68, false],  // W, A, S, D
            [32, false]
        ]);
    }

    handleKeyInput() {
        document.addEventListener('keydown', e => {
            e.preventDefault();
            if (this.moveKeys.has(e.keyCode) && !this.moveKeys.get(e.keyCode)) {
                this.moveKeys.set(e.keyCode, true);
            }
        });
        document.addEventListener('keyup', e => {
            e.preventDefault();
            if (this.moveKeys.has(e.keyCode) && this.moveKeys.get(e.keyCode)) {
                this.moveKeys.set(e.keyCode, false);
            }
        });
    }

    handleMouseMove(player) {
        let euler = new THREE.Euler(0, 0, 0, 'YXZ');

        document.addEventListener('mousemove', e => {
            euler.setFromQuaternion(player.camera.quaternion);
            euler.y -= e.movementX * 0.004;
            euler.x -= e.movementY * 0.004;
            euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));
            player.camera.quaternion.setFromEuler(euler);
        });
    }
}