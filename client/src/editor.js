const MAX = 50;

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './jsm/postprocessing/UnrealBloomPass.js';

var params = {
    exposure: 1,
    bloomStrength: 0.5,
    bloomThreshold: 0,
    bloomRadius: 0
};


class GameApp {
    constructor(controller) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.controller = controller;

        this.socket = io('/', {path: '/ws/socket.io'});
        
        this.cubes = [];
        this.players = new Map();
        this.id = Math.floor(Math.random() * 10000);
    }

    init() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0x555555, 1.0);
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
        let f = 0x888888;
        // 平行光源
        this.directionalLight = new THREE.DirectionalLight(f);
        this.directionalLight.position.set(25, 1000, 25);
        this.scene.add(this.directionalLight);
        this.directionalLight1 = new THREE.DirectionalLight(f);
        this.directionalLight1.position.set(-2500, 100, 2500);
        this.scene.add(this.directionalLight1);
        this.directionalLight2 = new THREE.DirectionalLight(f);
        this.directionalLight2.position.set(2500, 100, -2500);
        this.scene.add(this.directionalLight2);
        this.directionalLight3 = new THREE.DirectionalLight(f);
        this.directionalLight3.position.set(2500, 100, 2500);
        this.scene.add(this.directionalLight3);
        this.directionalLight4 = new THREE.DirectionalLight(f);
        this.directionalLight4.position.set(-2500, 100, -2500);
        this.scene.add(this.directionalLight4);
        // スポットライト光源を作成
        // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
        this.spotLight = new THREE.SpotLight(0xffffff, 1, 40, Math.PI / 2, 1, 0.5);
        this.spotLight.position.set( 25.0, 35.0, 25.0 );
        this.scene.add(this.spotLight);

        this.renderScene = new RenderPass( this.scene, this.camera );

        this.bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        this.bloomPass.threshold = params.bloomThreshold;
        this.bloomPass.strength = params.bloomStrength;
        this.bloomPass.radius = params.bloomRadius;

        this.composer = new EffectComposer( this.renderer );
        this.composer.addPass( this.renderScene );
        this.composer.addPass( this.bloomPass );



        this.camera.position.set(50.0, 2.0, 50.0);
    }

    connect() {
        this.socket.emit('connected', {
            id: this.id,
            position: this.camera.position
        });
        
        this.socket.on('disconnect', () => {});

        this.socket.on('connected', data => {
            if (data.newUser.id !== this.id) {
                this.addUser(data.newUser);
            } else {
                data.currentUsers.forEach(user => {
                    this.addUser(user);
                }) 
            }
        });

        this.socket.on('disconnected', data => {
            let target = this.players.get(data);

            this.scene.remove(target.mesh);
            target.geometry.dispose();
            target.material.dispose();

            this.players.delete(data);
        });

        this.socket.on('updatePosition', data => {
            if (data.id !== this.id) {
                this.updatePosition(data);
            }
        });
    }

    addUser(data) {
        let player = new Cube();
        player.mesh.position.x = data.position.x;
        player.mesh.position.y = data.position.y;
        player.mesh.position.z = data.position.z;
        this.scene.add(player.mesh);
        this.players.set(data.id, player);
    }

    updatePosition(data) {
        let target = this.players.get(data.id);
        target.mesh.position.x = data.position.x;
        target.mesh.position.y = data.position.y;
        target.mesh.position.z = data.position.z;
    }

    render() {
        this.composer.render();
    }
}

class Controller {
    constructor() {
        this.moveKeys = new Map([[37, false], [38, false], [39, false], [40, false], [83, false], [32, false]]);
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
}

class Cube {
    constructor() {
        this.geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let ffffff = '#';

        let majorColor = 6;

        for (let l = 0; l < 6; ++l) {
            const hex = Math.floor(Math.random() * 15) + 1;
            let f1 = hex;
            if (hex == 15) {f1 = 'f';}
            if (hex == 14) {f1 = 'e';}
            if (hex == 13) {f1 = 'd';}
            if (hex == 12) {f1 = 'c';}
            if (hex == 11) {f1 = 'b';}
            if (hex == 10) {f1 = 'a';}


            if (majorColor == 0) {
                if (l >= 2) {
                    ffffff += '0';
                } else {
                    ffffff += f1 + '';
                }
            }
            if (majorColor == 1) {
                if (l >= 2 && l < 4) {
                    ffffff += f1 + '';
                } else {
                    ffffff += '0';
                }    
            }
            if (majorColor == 2) {
                if (l < 4) {
                    ffffff += '0';
                } else {
                    ffffff += f1 + '';
                }    
            }
            if (majorColor == 3) {
                if (l >= 4) {//黄色
                    ffffff += '0';
                } else {
                    ffffff += f1 + '';
                }    
            }
            if (majorColor == 4) {
                if (l < 2) {//水色
                    ffffff += '0';
                } else {
                    ffffff += f1 + '';
                }    
            }
            if (majorColor == 5) {
                if (l >= 2 && l < 4) {//紫色
                    ffffff += '0';
                } else {
                    ffffff += f1 + '';
                }    
            }
            if (majorColor == 6) {
                ffffff += f1 + '';
            }
        }

        let color = new THREE.Color( ffffff );
//        color.setHex( Math.random() );

        this.material = new THREE.MeshLambertMaterial({ color: color });        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

var angle = 0.0;
var target = new THREE.Vector3(0, 2.0, 1.0);
function main() {
    const controller = new Controller;
    const app = new GameApp(controller);
    app.init();
    app.connect();
    app.controller.handleKeyInput();

    loop();

    function loop() {
        let prevPos = Object.assign({}, app.camera.position);

        target.x = Math.cos(Math.PI * angle / 180.0) + app.camera.position.x;
        target.z = Math.sin(Math.PI * angle / 180.0) + app.camera.position.z;

        if (app.controller.moveKeys.get(37)) { // Left
            angle -= 1.0;
        }
        if (app.controller.moveKeys.get(39)) { // Right
            angle += 1.0;
        }
        if (app.controller.moveKeys.get(38)) { // Forward
            app.camera.position.x += (target.x - app.camera.position.x) / 10.0;
            app.camera.position.z += (target.z - app.camera.position.z) / 10.0;
        }
        if (app.controller.moveKeys.get(40)) { // Back
            app.camera.position.x -= (target.x - app.camera.position.x) / 10.0;
            app.camera.position.z -= (target.z - app.camera.position.z) / 10.0;
        }
        if (app.controller.moveKeys.get(83)) { // s key: create cube
            app.controller.moveKeys.set(83, false);
            const cube = new Cube();
            cube.mesh.position.x = (target.x + Math.cos(Math.PI * angle / 180.0) * 4.0);
            cube.mesh.position.y = 1.0;
            cube.mesh.position.z = (target.z + Math.sin(Math.PI * angle / 180.0) * 4.0);
            app.scene.add(cube.mesh);
        }
        app.camera.lookAt(target);
        
        if (JSON.stringify(app.camera.position) != JSON.stringify(prevPos)) {
            app.socket.emit('updatePosition', {
                id: app.id,
                position: app.camera.position
            })
        };

        app.render();
        
        requestAnimationFrame( loop );
    }
}

document.addEventListener('DOMContentLoaded', main);