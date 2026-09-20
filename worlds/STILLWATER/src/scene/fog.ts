import * as THREE from 'three';

export function addAtmosphere(scene: THREE.Scene): void {
  scene.background = new THREE.Color('#061016');
  scene.fog = new THREE.FogExp2('#10252a', 0.034);
  scene.add(new THREE.HemisphereLight('#73929a', '#030708', 1.1));
  const moonGlow = new THREE.PointLight('#b9d8d8', 18, 55, 2);
  moonGlow.position.set(-10, 12, -18);
  scene.add(moonGlow);
}
