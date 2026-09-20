import * as THREE from 'three';

function cypress(x: number, z: number, scale: number, seed: number): THREE.Group {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);

  const trunkMaterial = new THREE.MeshStandardMaterial({ color: '#0e1716', roughness: 1 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.38, 7.2, 8), trunkMaterial);
  trunk.position.y = 3.2;
  tree.add(trunk);

  const crown = new THREE.Mesh(
    new THREE.ConeGeometry(1.45, 8, 10),
    new THREE.MeshStandardMaterial({ color: '#0f241d', roughness: 1 }),
  );
  crown.position.y = 7.1;
  tree.add(crown);

  const secondary = new THREE.Mesh(
    new THREE.ConeGeometry(1.05, 5.7, 8),
    new THREE.MeshStandardMaterial({ color: '#0e2119', roughness: 1 }),
  );
  secondary.position.set(0.3, 6.1, 0.2);
  secondary.rotation.z = 0.18;
  tree.add(secondary);

  const mossMaterial = new THREE.MeshBasicMaterial({ color: '#516d56', transparent: true, opacity: 0.8 });
  for (let i = 0; i < 6; i += 1) {
    const moss = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.085, 1.3 + ((seed + i) % 3) * 0.42, 5),
      mossMaterial,
    );
    moss.position.set(Math.sin(seed + i) * 0.7, 5.3 - i * 0.55, Math.cos(seed * 2 + i) * 0.7);
    moss.rotation.z = (i % 2 ? 1 : -1) * 0.14;
    tree.add(moss);
  }

  return tree;
}

export function createTrees(): THREE.Group {
  const trees = new THREE.Group();
  [
    [-15, -8, 1.2],
    [15, -10, 1.5],
    [-18, -18, 1.7],
    [20, -22, 1.8],
    [-22, -28, 2.1],
    [18, -30, 2.2],
    [-28, -36, 2.5],
    [24, -38, 2.8],
    [-12, -20, 1.1],
    [10, -34, 1.4],
    [-32, -44, 2.8],
    [29, -48, 3.1],
  ].forEach(([x, z, s], i) => trees.add(cypress(Number(x), Number(z), Number(s), i + 3)));
  return trees;
}
