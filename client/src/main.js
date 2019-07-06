const keyArray            = new Array(10);
const keyArrayUp          = new Array(10);

let key_repeat_x_plus   = false;
let key_repeat_x_minus  = false;
let key_repeat_z_plus   = false;
let key_repeat_z_minus  = false;

const KEY_LEFT  = 0;
const KEY_UP    = 1;
const KEY_RIGHT = 2;
const KEY_DOWN  = 3;

document.addEventListener("keydown", function(e) {
    switch(e.keyCode) {
    case 37: keyArray[0] = true; break;//left
    case 38: keyArray[1] = true; break;//up
    case 39: keyArray[2] = true; break;//right
    case 40: keyArray[3] = true; break;//down
    case 88: keyArray[4] = true; break;//x
    case 90: keyArray[5] = true; break;//z
    case 83: keyArray[6] = true; break;//s
    case 65: keyArray[7] = true; break;//a
    case 81: keyArray[8] = true; break;
    case 87: keyArray[9] = true; break;
    }
}, false);

document.addEventListener("keyup", function(e) {
    switch(e.keyCode) {
    case 37: keyArrayUp[0] = true; break;
    case 38: keyArrayUp[1] = true; break;   
    case 39: keyArrayUp[2] = true; break;
    case 40: keyArrayUp[3] = true; break;
    case 88: keyArrayUp[4] = true; break;
    case 90: keyArrayUp[5] = true; break;
    case 83: keyArrayUp[6] = true; break;
    case 65: keyArrayUp[7] = true; break;
    case 81: keyArrayUp[8] = true; break;
    case 67: keyArrayUp[9] = true; break;
    }
}, false);

const MAX = 50;
class GameApp {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        
        this.cubes = [];
    }

    init() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0x888888, 1.0);
        document.body.appendChild( this.renderer.domElement );

        for (let x = 0; x < MAX; ++x) {
            for (let z = 0; z < MAX; ++z) {
                this.cubes.push( new Cube() );
                this.cubes[this.cubes.length - 1].mesh.position.x = x * 1.2;
                this.cubes[this.cubes.length - 1].mesh.position.y = 0.0;
                this.cubes[this.cubes.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                this.scene.add( this.cubes[this.cubes.length - 1].mesh );
            }
        }
        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(25, 1000, 25);
        this.scene.add(directionalLight);
        // スポットライト光源を作成
        // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
        const spotLight = new THREE.SpotLight(0xffffff, 2, 40, Math.PI / 2, 1, 0.5);
        spotLight.position.set( 25.0, 35.0, 25.0 );
        this.scene.add(spotLight);

        this.camera.position.set(50.0, 2.0, 50.0);
    }

    render() {
        this.renderer.render( this.scene, this.camera );
    }
}

class Cube {
    constructor() {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
        this.mesh = new THREE.Mesh(geometry, material);
    }
}


function main() {
    const app = new GameApp;
    app.init();

    loop();

    function loop() {


        if (keyArray[KEY_LEFT]) {
            app.camera.position.x -= 0.1
        }
        if (keyArray[KEY_RIGHT]) {
            app.camera.position.x += 0.1
        }
        if (keyArray[KEY_UP]) {
            app.camera.position.z -= 0.1
        }
        if (keyArray[KEY_DOWN]) {
            app.camera.position.z += 0.1
        }

        for (let i = 0; i < 4; ++i) {
            if (keyArrayUp[i]) {// キーリピート OFF
                keyArray[i] = false;
                keyArrayUp[i] = false;            
            }
        }

        app.render();
        requestAnimationFrame( loop );
    }
}

document.addEventListener('DOMContentLoaded', main);