!function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){function t(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(){t(this,e),this.scene=new THREE.Scene,this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),this.renderer=new THREE.WebGLRenderer,this.cube}var n,i,a;return n=e,(i=[{key:"init",value:function(){this.renderer.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(this.renderer.domElement),this.cube=new o,this.scene.add(this.cube.mesh),this.camera.position.z=5}},{key:"render",value:function(){this.cube.mesh.rotation.x+=.01,this.cube.mesh.rotation.y+=.01,this.renderer.render(this.scene,this.camera)}}])&&r(n.prototype,i),a&&r(n,a),e}(),o=function e(){t(this,e),this.geometry=new THREE.BoxGeometry(1,1,1),this.material=new THREE.MeshNormalMaterial,this.mesh=new THREE.Mesh(this.geometry,this.material)};document.addEventListener("DOMContentLoaded",function(){var e=new i;e.init(),function n(){e.render(),requestAnimationFrame(n)}()})}]);
//# sourceMappingURL=bundle.js.map