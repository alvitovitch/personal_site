import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const synth = new Audio('src/sound/synth.mp3');
synth.volume = .1
synth.play()



const laser = new Audio('src/sound/laser.mp3');
laser.volume = .1

const collect = new Audio('src/sound/collect.mp3');
collect.volume = .1
let collectPlay = true

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
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -1.5;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0

	scene.add(model)
	
})



loader.load('src/models/projects.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'projects'
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -1.3;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0

	scene.add(model)
	
})
loader.load('src/models/home.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'home'
	model.delta = .001
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -1.1;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0

	scene.add(model)
	
})


loader.load('src/models/links.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'links'
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -.9;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0

	scene.add(model)
})

loader.load('src/models/resume.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'resume'
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -.7;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0

	scene.add(model)


	scene.add(model)
	
})

loader.load('src/models/contact.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'contact'
	model.delta = .001
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -.5;
	model.position.z = -.4
	model.position.y = .5
	model.spin = 0
	scene.add(model)
	
})
loader.load('src/models/name.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'name'
	model.scale.x = .08 
	model.scale.y = .08
	model.scale.z = .08
	model.position.x = -1;
	model.position.z = -.4
	model.position.y = .2
	model.spin = 0
	scene.add(model)
	
})


loader.load('src/models/ship.gltf', function (gltf) {
	const model = gltf.scene;
	model.name = 'ship'
	model.scale.x = .04 
	model.scale.y = .04 
	model.scale.z = .04
	model.position.x = -.5;
	model.position.z = -.2
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
const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
const cube = new THREE.Mesh( geometry, material )
cube.position.x = -1;
cube.position.z = -.2
cube.position.y = -.1
cube.visible = false
cube.name = 'track'
scene.add(cube)

// bullet

const bullets = []
// const bulletGeo = new THREE.SphereGeometry(.1,.1,.1)
// const bullet = new THREE.Mesh( bulletGeo, material)
// bullet.visible = false
// bullet.name = 'bullet'
// scene.add(bullet)
// bullets.push(bullet)



function bulletTracking(ship, target) {
	const bulletGeo = new THREE.SphereGeometry(.01,.01,.01)
	const bullet = new THREE.Mesh( bulletGeo, material)
	bullet.visible = false
	bullet.name = 'bullet'
	scene.add(bullet)
	bullets.push([bullet, target])
	bullet.position.copy(ship.position); // start position - the tip of the weapon
	bullet.position.z -=.03
  	bullet.lookAt(target.position)
	bullet.visible = true
	collectPlay = true
	setInterval(() => {
		if(bullet) {
			scene.remove(bullet)}
	}, 1000)
}
// animation

function animation() {
	const time = clock.getElapsedTime();
	const ship = scene.children.filter(child => (child.name === 'ship'))
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
			child.position.y = Math.cos( time ) * .01 + .34
		}
		if (child.name === 'name') {
			child.position.y = Math.cos( time ) * .01 + .1
		}
	}
	if (intersects[0].object.name === 'track') {
		if (ship.length > 0) {
			ship[0].position.x =  intersects[0].point.x
		}
	}
	for (let child of scene.children.filter(child => tabs.has(child.name))) {
		child.rotation.y += child.spin
	}

	for (let bullet of bullets) {
		bullet[0].translateZ(.01)
		if (bullet[0].position.z < -.4){
			bullet[1].spin = .05
			if (collectPlay){
				collect.currentTime = 0
				collect.play()
				collectPlay = false
			}
			for (let tab of tabs) {
				document.getElementById(tab).style.opacity = 0
				setTimeout( () => { if (tab !== bullet[1].name) {document.getElementById(tab).style.display = 'none';}}, 1000)
			}
			setInterval(() => {
				if (bullet[1].spin > .02) {
					bullet[1].spin -= .003
				} else {
					if (bullet[1].rotation.y > 6.2){
						bullet[1].spin = 0
						bullet[1].rotation.y = 0
						if (bullet[1].name === 'resume'){
							window.open(
								"./src/images/Vitovitch-Andrew-Resume.pdf", "_blank");
						  } else if (bullet[1].name === 'home'){

						  } else {
							  document.getElementById(bullet[1].name).style.display = 'flex'
							  setTimeout(() => {document.getElementById(bullet[1].name).style.opacity = 1}, 100)
							  
						  }
						bullets.pop(bullets.indexOf(bullet))
					}
			}}, 90)
			scene.remove(bullet[0])
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

window.addEventListener('mouseup', e => {
	if (e.target.id === 'volume-icon') {
		const volumeSlider = document.getElementById('volume-slider')
		if (volumeSlider.style.display === '' || volumeSlider.style.display === 'none') {
			volumeSlider.style.display = 'flex'
		} else {
			volumeSlider.style.display = 'none'
		}
	}
	if (e.target.id  === 'volume-slider'){
		synth.volume = e.target.value/100 * .2
		laser.volume = e.target.value/100 * .2
		collect.volume = e.target.value/100 * .2
	}
})

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

document.addEventListener('click', e => {
	synth.play()
	const inter = raycaster.intersectObjects(scene.children)[1]
	const ship = scene.children.filter(child => (child.name === 'ship'))[0]
	if (ship && inter && inter.object.parent && tabs.has(inter.object.parent.name)) {
		if (bullets.length === 0){
			bulletTracking(ship, inter.object.parent)
			laser.currentTime = 0
			laser.play()

		}
	} else if ( ship && inter && inter.object.parent && inter.object.parent.parent && tabs.has(inter.object.parent.parent.name) ) {
		if (bullets.length === 0){
			bulletTracking(ship, inter.object.parent.parent)
			laser.currentTime = 0
			laser.play()
		}
	}
		
	
})