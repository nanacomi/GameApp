export default class Cube {
    constructor() {
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
