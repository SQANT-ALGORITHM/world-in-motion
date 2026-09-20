import * as THREE from 'three';

export function createMoon(): THREE.Group {
  const moon = new THREE.Group();
  const disc = new THREE.Mesh(
    new THREE.SphereGeometry(2.2, 32, 20),
    new THREE.MeshBasicMaterial({ color: '#dbe8dc' }),
  );
  disc.position.set(-10, 13, -25);
  moon.add(disc);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    color: '#a9d0cd', transparent: true, opacity: 0.13,
  }));
  halo.scale.set(9, 9, 1);
  halo.position.copy(disc.position);
  moon.add(halo);
  return moon;
}
