import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const params = {
	exposure: 4,
	bloomStrength: 2.4,
	bloomThreshold: 0.01,
	bloomRadius: 0
};
const clock = new THREE.Clock()
const tabs = new Set(['about', 	'projects', 'contact', 'home', 'links', 'resume'])

const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.01, 6 );
camera.position.x = -1;
camera.position.z = 0;
camera.position.y = .01;
camera.lookAt(-1,0,-5)


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();



const scene = new THREE.Scene();

const loader =  new GLTFLoader()

// road

loader.load('src/models/rainbowTwo.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'road'
	model.rotation.y = 3 * Math.PI/ 2	
	model.scale.x = .2 
	model.scale.y = .4 
	model.scale.z = .7
	model.position.x = -1;
	model.position.z = 0
	model.position.y = 0
	scene.add(model)
	
})
loader.load('src/models/rainbowTwo.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'road'
	model.rotation.y = 3 * Math.PI / 2
	model.scale.x = .2 
	model.scale.y = .4 
	model.scale.z = .7
	model.position.x = -1;
	model.position.z = -2.41
	model.position.y = 0
	scene.add(model)
	
})
loader.load('src/models/rainbowTwo.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'road'
	model.rotation.y = 3 * Math.PI / 2
	model.scale.x = .2 
	model.scale.y = .4 
	model.scale.z = .7
	model.position.x = -1;
	model.position.z = -4.82
	model.position.y = 0
	scene.add(model)
	
})
loader.load('src/models/rainbowTwo.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'road'
	model.rotation.y = 3 * Math.PI / 2
	model.scale.x = .2 
	model.scale.y = .4 
	model.scale.z = .7
	model.position.x = -1;
	model.position.z = -7.23
	model.position.y = 0
	scene.add(model)
	
})


// buttons

loader.load('src/models/about.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'about'
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -1.5;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)
	
})



loader.load('src/models/projects.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'projects'
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -1.3;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)
	
})
loader.load('src/models/home.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'home'
	model.delta = .001
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -1.1;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)
	
})


loader.load('src/models/links.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'links'
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -.9;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)
})

loader.load('src/models/resume.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'resume'
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -.7;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)


	scene.add(model)
	
})

loader.load('src/models/contact.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'contact'
	model.delta = .001
	model.scale.x = .05 
	model.scale.y = .05 
	model.scale.z = .05
	model.position.x = -.5;
	model.position.z = -.4
	model.position.y = .3
	scene.add(model)
	
})


loader.load('src/models/ship.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'ship'
	model.scale.x = .1
	model.scale.y = .1 
	model.scale.z = .1
	model.position.x = -1;
	model.position.z = -.3
	model.position.y = -.1
	model.rotation.y = 3 * Math.PI / 2
	scene.add(model)
	
})

const ambLight = new THREE.HemisphereLight( 0xffffbb, 0x34568b, .6)
scene.add(ambLight)


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.setAnimationLoop( animation );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x000000, 0.0);
renderer.autoClear = false;
document.body.appendChild( renderer.domElement );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.setSize(window.innerWidth, window.innerHeight)
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const renderScene = new RenderPass( scene, camera );


const composer = new EffectComposer( renderer );
composer.renderToScreen = true
composer.setSize(window.innerWidth, window.innerHeight)
composer.addPass( renderScene );
composer.addPass( bloomPass );


// galaxy material
const textureLoader =  new THREE.TextureLoader().load("src/texture/galaxy1.png")
const starMaterial = new THREE.MeshBasicMaterial({
map: textureLoader,
side: THREE.BackSide,
transparent: true,
});

const starGeometry = new THREE.SphereGeometry(6, 6, 6);
// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
starMesh.name = 'stars'
scene.add(starMesh);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientlight);

// movement plane

const geometry = new THREE.BoxGeometry( 1.2, 1, .1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material )
cube.position.x = -1;
cube.position.z = -.5
cube.position.y = -.1
cube.visible = false
cube.name = 'track'
scene.add(cube)

// animation

function animation() {
	const time = clock.getElapsedTime();
	const ship = scene.children[14]
	raycaster.setFromCamera( mouseVector, camera );
	const intersects = raycaster.intersectObjects( scene.children )
	for (let child of scene.children) {
		if (child.name === 'road'){
			if (child.position.z >= 2.41){
				child.position.z = -7.23
			}
			child.position.z += .004
		}
		if (child.name === 'stars'){
			child.rotation.x += .0001
		}
		if (tabs.has(child.name)) {
			child.position.y = Math.cos( time ) * .01 + .3
		}
	}
	if (intersects[0].object.name === 'track') {
		if (ship) {
			ship.position.x =  intersects[0].point.x
		}
	}
	if (intersects[0].object.name === 'links') {
		if (ship) {
			ship.lookAt(new THREE.Vector3(intersects[0].point))
		}
	}
	renderer.render( scene, camera );
	composer.render()
}

let mouseVector = new THREE.Vector2();



document.addEventListener('mousemove', (e) => {
	mouseVector.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouseVector.y = - ( e.clientY / window.innerHeight ) * 2 + 1	
})

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

document.addEventListener('click', e => {
	for (let i = 8; i <= 13; i++){
		if (raycaster.intersectObjects(scene.children[i])){
			debugger
			console.log(scene.children[i].name)
		}
	}
	
})