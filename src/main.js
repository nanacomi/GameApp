class GameApp {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        
        this.cube
    }

    init() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );

        this.cube = new Cube;
        this.scene.add( this.cube.mesh );
        this.camera.position.z = 5;
    }

    render() {
        this.cube.mesh.rotation.x += 0.01;
        this.cube.mesh.rotation.y += 0.01;

        this.renderer.render( this.scene, this.camera );
    }
}

class Cube {
    constructor() {
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        this.material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh( this.geometry, this.material );
    }
}


function main() {
    const app = new GameApp;
    app.init();

    loop();

    function loop() {
        app.render();
        requestAnimationFrame( loop );
    }
}

document.addEventListener('DOMContentLoaded', main);