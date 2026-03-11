let scene;
let camera;
let renderer;
let avatar;

let clock = new THREE.Clock();

let walkPosition = -4;
let talking = false;

function initAvatar(){

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
50,
600/600,
0.1,
1000
);

camera.position.set(0,1.6,3);

renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize(600,600);

document.getElementById("avatar").appendChild(renderer.domElement);

const light = new THREE.HemisphereLight(0xffffff,0x444444,2);
light.position.set(0,20,0);
scene.add(light);

const loader = new THREE.GLTFLoader();

loader.load(

"/static/avatar.glb",

function(gltf){

avatar = gltf.scene;

avatar.scale.set(1.4,1.4,1.4);

avatar.position.set(0,-0.2,-4);

scene.add(avatar);

},

undefined,

function(error){
console.log("Avatar load error",error);
}

);

animate();

}

function animate(){

requestAnimationFrame(animate);

let delta = clock.getDelta();

/* WALK INTO SCREEN */

if(avatar && walkPosition < 0){

walkPosition += 0.03;

avatar.position.z = walkPosition;

}

/* FACE ANIMATION */

if(avatar){

let t = Date.now()*0.002;

avatar.traverse(function(obj){

if(obj.morphTargetInfluences){

/* eye blink */

let blink = Math.abs(Math.sin(t*0.5));
obj.morphTargetInfluences[0] = blink*0.3;

/* mouth movement */

if(talking){

let mouth = Math.abs(Math.sin(t*6));
obj.morphTargetInfluences[1] = mouth*0.8;

}

}

});

}

renderer.render(scene,camera);

}

/* talking control */

function startTalking(){
talking = true;
}

function stopTalking(){
talking = false;
}

initAvatar();