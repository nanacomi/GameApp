const MAX = 50;

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
        this.renderer.render( this.scene, this.camera );
    }
}

class Controller {
    constructor() {
        this.moveKeys = new Map([[37, false], [38, false], [39, false], [40, false]]);
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
        this.material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
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