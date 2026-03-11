// Scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
1,
0.1,
1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(400,400);

document.getElementById("avatar-container").appendChild(renderer.domElement);


// Head
const headGeometry = new THREE.SphereGeometry(1,32,32);
const headMaterial = new THREE.MeshBasicMaterial({color:0x00aaff});
const head = new THREE.Mesh(headGeometry,headMaterial);

scene.add(head);


// Eyes
const eyeGeometry = new THREE.SphereGeometry(0.1,16,16);
const eyeMaterial = new THREE.MeshBasicMaterial({color:0x000000});

const eye1 = new THREE.Mesh(eyeGeometry,eyeMaterial);
eye1.position.set(-0.3,0.3,0.9);

const eye2 = new THREE.Mesh(eyeGeometry,eyeMaterial);
eye2.position.set(0.3,0.3,0.9);

scene.add(eye1);
scene.add(eye2);


// Mouth
const mouthGeometry = new THREE.BoxGeometry(0.4,0.1,0.1);
const mouthMaterial = new THREE.MeshBasicMaterial({color:0xff0000});

const mouth = new THREE.Mesh(mouthGeometry,mouthMaterial);

mouth.position.set(0,-0.3,0.9);

scene.add(mouth);


// Camera
camera.position.z=3;


// Talking flag
let talking=false;


// Animation
function animate(){

requestAnimationFrame(animate);

head.rotation.y += 0.005;

if(talking){

mouth.scale.y = 1 + Math.random()*2;

}else{

mouth.scale.y = 1;

}

renderer.render(scene,camera);

}

animate();


// Speak function
function avatarSpeak(text){

let speech = new SpeechSynthesisUtterance(text);

speech.onstart=function(){

talking=true;

}

speech.onend=function(){

talking=false;

}

speechSynthesis.speak(speech);

}