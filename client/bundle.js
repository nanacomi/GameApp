!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var i=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.geometry=new THREE.BoxGeometry(1,1,1),this.material=new THREE.MeshLambertMaterial({color:11184810}),this.mesh=new THREE.Mesh(this.geometry,this.material)};function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"init",value:function(e){this.cubes=[];for(var t=0;t<50;++t)for(var n=0;n<50;++n)this.cubes.push(new i),this.cubes[this.cubes.length-1].mesh.position.x=1.2*t,this.cubes[this.cubes.length-1].mesh.position.y=0,this.cubes[this.cubes.length-1].mesh.position.z=1.2*n,e.add(this.cubes[this.cubes.length-1].mesh)}}])&&o(t.prototype,n),r&&o(t,r),e}();function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var a=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),this.angle=180,this.target=new THREE.Vector3(0,2,1),this.controller=t,this.controller.handleKeyInput(),this.controller.handleMouseMove(this)}var t,n,i;return t=e,(n=[{key:"update",value:function(){(this.controller.moveKeys.get(37)||this.controller.moveKeys.get(65))&&this.camera.translateX(-.1),(this.controller.moveKeys.get(39)||this.controller.moveKeys.get(68))&&this.camera.translateX(.1),(this.controller.moveKeys.get(38)||this.controller.moveKeys.get(87))&&(this.camera.translateZ(-.1),this.camera.translateY(2-this.camera.position.y)),(this.controller.moveKeys.get(40)||this.controller.moveKeys.get(83))&&(this.camera.translateZ(.1),this.camera.translateY(2-this.camera.position.y)),this.camera.position.y=2}}])&&s(t.prototype,n),i&&s(t,i),e}();function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var u=Math.PI/2,l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.moveKeys=new Map([[37,!1],[38,!1],[39,!1],[40,!1],[87,!1],[65,!1],[83,!1],[68,!1]])}var t,n,i;return t=e,(n=[{key:"handleKeyInput",value:function(){var e=this;document.addEventListener("keydown",function(t){t.preventDefault(),e.moveKeys.has(t.keyCode)&&!e.moveKeys.get(t.keyCode)&&e.moveKeys.set(t.keyCode,!0)}),document.addEventListener("keyup",function(t){t.preventDefault(),e.moveKeys.has(t.keyCode)&&e.moveKeys.get(t.keyCode)&&e.moveKeys.set(t.keyCode,!1)})}},{key:"handleMouseMove",value:function(e){var t=new THREE.Euler(0,0,0,"YXZ");document.addEventListener("mousemove",function(n){t.setFromQuaternion(e.camera.quaternion),t.y-=.004*n.movementX,t.x-=.004*n.movementY,t.x=Math.max(-u,Math.min(u,t.x)),e.camera.quaternion.setFromEuler(t)})}}])&&c(t.prototype,n),i&&c(t,i),e}();function h(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.scene=new THREE.Scene,this.stage=new r,this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.socket=io("/",{path:"/ws/socket.io"}),this.player=t,this.players=new Map,this.id=Math.floor(1e4*Math.random())}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this;this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(8947848,1),document.body.appendChild(this.renderer.domElement),this.renderer.domElement.addEventListener("click",function(){e.renderer.domElement.requestPointerLock()}),this.stage.init(this.scene);var t=new THREE.DirectionalLight(16777215);t.position.set(25,1e3,25),this.scene.add(t);var n=new THREE.SpotLight(16777215,2,40,Math.PI/2,1,.5);n.position.set(25,35,25),this.scene.add(n),this.player.camera.position.set(50,2,50)}},{key:"connect",value:function(){var e=this;this.socket.emit("connected",{id:this.id,position:this.player.camera.position}),this.socket.on("disconnect",function(){}),this.socket.on("connected",function(t){t.newUser.id!==e.id?e.addUser(t.newUser):t.currentUsers.forEach(function(t){e.addUser(t)})}),this.socket.on("disconnected",function(t){var n=e.players.get(t);e.scene.remove(n.mesh),n.geometry.dispose(),n.material.dispose(),e.players.delete(t)}),this.socket.on("updatePosition",function(t){t.id!==e.id&&e.updatePosition(t)})}},{key:"addUser",value:function(e){var t=new i;t.mesh.position.x=e.position.x,t.mesh.position.y=e.position.y,t.mesh.position.z=e.position.z,this.scene.add(t.mesh),this.players.set(e.id,t)}},{key:"updatePosition",value:function(e){var t=this.players.get(e.id);t.mesh.position.x=e.position.x,t.mesh.position.y=e.position.y,t.mesh.position.z=e.position.z}},{key:"render",value:function(){this.renderer.render(this.scene,this.player.camera)}}])&&h(t.prototype,n),o&&h(t,o),e}();document.addEventListener("DOMContentLoaded",function(){var e=new d(new a(new l));e.init(),e.scene.add(e.player.camera),e.connect(),function t(){e.player.prevPos=Object.assign({},e.player.camera.position),e.player.update(),JSON.stringify(e.player.camera.position)!=JSON.stringify(e.player.prevPos)&&e.socket.emit("updatePosition",{id:e.id,position:e.player.camera.position}),e.render(),requestAnimationFrame(t)}()})}]);
//# sourceMappingURL=bundle.js.map