import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//loading

const textureloader = new THREE.TextureLoader()

const normaltexture = textureloader.load('/texture/NomrlaMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normaltexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.32, -0.82, 1.45)
pointLight2.intensity = 10

scene.add(pointLight2)

const light = gui.addFolder('Light')

light.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
light.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const lightColor = {
  color: 0xff000,
}
light.addColor(lightColor, 'color').onChange(() => {
  pointLight2.color.set(light.color)
})

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetx = 0
let targety = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowX
  mouseY = event.clientY - windowY
}

const clock = new THREE.Clock()

const tick = () => {
  targetx = mouseX * 0.001
  targety = mouseY * 0.001

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime

  sphere.rotation.y += 0.5 * (targetx - sphere.rotation.y)
  sphere.rotation.x += 0.5 * (targetx - sphere.rotation.x)
  sphere.rotation.z += 0.5 * (targetx - sphere.rotation.x)

  sphere.rotat

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
