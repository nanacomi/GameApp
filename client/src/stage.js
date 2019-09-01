import Cube from './cube';

const MAX = 50;

export default class Stage {
    init(scene) {
        this.cubes = [];
        for (let x = 0; x < MAX; ++x) {
            for (let z = 0; z < MAX; ++z) {
                this.cubes.push( new Cube() );
                this.cubes[this.cubes.length - 1].mesh.position.x = x * 1.2;
                this.cubes[this.cubes.length - 1].mesh.position.y = 0.0;
                this.cubes[this.cubes.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.cubes[this.cubes.length - 1].mesh );
            }
        }

        // 2階
        for (let x = 0; x < MAX; ++x) {
            for (let z = 0; z < MAX; ++z) {
                this.cubes.push( new Cube() );
                this.cubes[this.cubes.length - 1].mesh.position.x = x * 1.2;
                this.cubes[this.cubes.length - 1].mesh.position.y = 10.0;
                this.cubes[this.cubes.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.cubes[this.cubes.length - 1].mesh );
            }
        }

        // 3階
        for (let x = 0; x < MAX; ++x) {
            for (let z = 0; z < MAX; ++z) {
                this.cubes.push( new Cube() );
                this.cubes[this.cubes.length - 1].mesh.position.x = x * 1.2;
                this.cubes[this.cubes.length - 1].mesh.position.y = 20.0;
                this.cubes[this.cubes.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.cubes[this.cubes.length - 1].mesh );
            }
        }

        // 4階
        for (let x = 0; x < MAX; ++x) {
            for (let z = 0; z < MAX; ++z) {
                this.cubes.push( new Cube() );
                this.cubes[this.cubes.length - 1].mesh.position.x = x * 1.2;
                this.cubes[this.cubes.length - 1].mesh.position.y = 30.0;
                this.cubes[this.cubes.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.cubes[this.cubes.length - 1].mesh );
            }
        }

        this.stairs = [];
        // 1階から2階
        for (let x = 30; x < 32; ++x) {
            for (let z = 30; z < 32; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 2.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 28; x < 30; ++x) {
            for (let z = 28; z < 30; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 5.0;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 26; x < 28; ++x) {
            for (let z = 26; z < 28; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 7.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }

        // 2階から3階
        for (let x = 30; x < 32; ++x) {
            for (let z = 30; z < 32; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 12.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 28; x < 30; ++x) {
            for (let z = 28; z < 30; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 15.0;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 26; x < 28; ++x) {
            for (let z = 26; z < 28; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 17.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }

        // 3階から4階
        for (let x = 30; x < 32; ++x) {
            for (let z = 30; z < 32; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 22.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 28; x < 30; ++x) {
            for (let z = 28; z < 30; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 25.0;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
        for (let x = 26; x < 28; ++x) {
            for (let z = 26; z < 28; ++z) {
                this.stairs.push( new Cube() );
                this.stairs[this.stairs.length - 1].mesh.position.x = x * 1.2;
                this.stairs[this.stairs.length - 1].mesh.position.y = 27.5;
                this.stairs[this.stairs.length - 1].mesh.position.z = z * 1.2;
                // 3D空間にメッシュを追加
                scene.add( this.stairs[this.stairs.length - 1].mesh );
            }
        }
    }
}