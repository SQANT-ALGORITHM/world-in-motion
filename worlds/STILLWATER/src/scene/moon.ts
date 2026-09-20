import * as THREE from 'three';

export function createMoon(): THREE.Group {
  const moon = new THREE.Group();

  const disc = new THREE.Mesh(
    new THREE.SphereGeometry(2.35, 32, 20),
    new THREE.MeshBasicMaterial({ color: '#eaf3ef' }),
  );
  disc.position.set(-10, 12.8, -26);
  moon.add(disc);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      color: '#d6ebe7',
      transparent: true,
      opacity: 0.18,
    }),
  );
  halo.position.copy(disc.position);
  halo.scale.set(9.5, 9.5, 1);
  moon.add(halo);

  const cloudColors = ['#65557f', '#3d4f76', '#4a5c7d'];
  cloudColors.forEach((color, index) => {
    const cloud = new THREE.Mesh(
      new THREE.SphereGeometry(2.2 + index * 0.5, 24, 18),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.22 + index * 0.08,
      }),
    );
    cloud.position.set(disc.position.x + (index - 1.25) * 2.4, disc.position.y + 0.9 + index * 0.35, disc.position.z + 3.2 + index * 2.2);
    moon.add(cloud);
  });

  return moon;
}
