import * as THREE from 'three';

export function createBoat(): THREE.Group {
  const boat = new THREE.Group();
  boat.name = 'Weathered skiff';
  const wood = new THREE.MeshStandardMaterial({ color: '#4a3023', roughness: 0.95 });
  const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 2.8, 6, 12), wood);
  hull.scale.set(1, 0.32, 1);
  hull.rotation.x = Math.PI / 2;
  hull.position.y = -0.15;
  boat.add(hull);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.12, 0.35), wood);
  seat.position.y = 0.18;
  boat.add(seat);
  const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.8), new THREE.MeshStandardMaterial({ color: '#755038' }));
  oar.rotation.z = Math.PI / 2;
  oar.position.set(0.9, 0.34, 0.05);
  boat.add(oar);
  boat.position.set(0.5, -0.18, 1.5);
  boat.rotation.y = -0.3;
  return boat;
}
