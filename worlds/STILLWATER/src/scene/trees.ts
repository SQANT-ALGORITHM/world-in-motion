import * as THREE from 'three';

function cypress(x: number, z: number, scale: number, seed: number): THREE.Group {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.38, 7, 8), new THREE.MeshStandardMaterial({ color: '#101c18', roughness: 1 }));
  trunk.position.y = 3.2;
  tree.add(trunk);
  const crown = new THREE.Mesh(new THREE.ConeGeometry(1.35, 8, 8), new THREE.MeshStandardMaterial({ color: '#10251e', roughness: 1 }));
  crown.position.y = 7;
  tree.add(crown);
  const mossMaterial = new THREE.MeshBasicMaterial({ color: '#496a4f' });
  for (let i = 0; i < 5; i += 1) {
    const moss = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.08, 1.3 + ((seed + i) % 3) * 0.4, 5), mossMaterial);
    moss.position.set(Math.sin(seed + i) * 0.7, 5.2 - i * 0.6, Math.cos(seed * 2 + i) * 0.7);
    moss.rotation.z = (i % 2 ? 1 : -1) * 0.14;
    tree.add(moss);
  }
  return tree;
}

export function createTrees(): THREE.Group {
  const trees = new THREE.Group();
  [[-13, -9, 1.2], [13, -12, 1.5], [-18, -24, 2], [17, -28, 1.8], [-27, -35, 2.6], [26, -39, 2.8]].forEach(([x, z, s], i) => trees.add(cypress(x, z, s, i + 4)));
  return trees;
}
