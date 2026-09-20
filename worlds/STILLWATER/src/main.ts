import * as THREE from 'three';
import { createStillwater } from './scene/swamp';
import { updateWater } from './scene/water';
import { createHud, installHudStyles } from './ui/hud';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Missing app root');
installHudStyles();
app.appendChild(createHud());

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 120);
camera.position.set(0, 2.6, 8);
const world = createStillwater();
const clock = new THREE.Clock();
let targetYaw = 0;
let targetPitch = -0.08;
let dragX = 0;
let dragY = 0;
let dragging = false;

renderer.domElement.addEventListener('pointerdown', (event) => { dragging = true; dragX = event.clientX; dragY = event.clientY; renderer.domElement.setPointerCapture(event.pointerId); });
renderer.domElement.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  targetYaw -= (event.clientX - dragX) * 0.003;
  targetPitch = THREE.MathUtils.clamp(targetPitch - (event.clientY - dragY) * 0.002, -0.45, 0.25);
  dragX = event.clientX; dragY = event.clientY;
});
renderer.domElement.addEventListener('pointerup', () => { dragging = false; });
window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });

function animate(): void {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  updateWater(world.water, time);
  camera.rotation.y += (targetYaw - camera.rotation.y) * 0.06;
  camera.rotation.x += (targetPitch - camera.rotation.x) * 0.06;
  renderer.render(world.scene, camera);
}
animate();
