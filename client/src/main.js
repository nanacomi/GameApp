import Stage from './stage';
import Player from './player';
import Cube from './cube';
import Controller from './controller';

class GameApp {
    constructor(player) {
        this.scene = new THREE.Scene();
        this.stage = new Stage();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.socket = io('/', {path: '/ws/socket.io'});
        this.player = player;
        this.players = new Map();
        this.id = Math.floor(Math.random() * 10000);
    }

    init() {
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0x888888, 1.0);
        document.body.appendChild( this.renderer.domElement );

        this.stage.init(this.scene);

        // 平行光源
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(25, 1000, 25);
        this.scene.add(directionalLight);
        // スポットライト光源を作成
        // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
        const spotLight = new THREE.SpotLight(0xffffff, 2, 40, Math.PI / 2, 1, 0.5);
        spotLight.position.set( 25.0, 35.0, 25.0 );
        this.scene.add(spotLight);

        this.player.camera.position.set(50.0, 2.0, 50.0);
    }

    connect() {
        this.socket.emit('connected', {
            id: this.id,
            position: this.player.camera.position
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
        this.renderer.render( this.scene, this.player.camera );
    }
}

function main() {
    const app = new GameApp(new Player(new Controller));
    app.init();
    app.scene.add(app.player.camera);
    app.connect();

    loop();

    function loop() {
        app.player.prevPos = Object.assign({}, app.player.camera.position);
        app.player.update();
        if (JSON.stringify(app.player.camera.position) != JSON.stringify(app.player.prevPos)) {
            app.socket.emit('updatePosition', {
                id: app.id,
                position: app.player.camera.position
            })
        };

        app.render();
        
        requestAnimationFrame( loop );
    }
}

document.addEventListener('DOMContentLoaded', main);