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
    }
}