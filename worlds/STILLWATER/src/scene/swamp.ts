import * as THREE from 'three';
import { addAtmosphere } from './fog';
import { createMoon } from './moon';
import { createTrees } from './trees';
import { createWater } from './water';
import { createBoat } from '../boat/boat';

export interface StillwaterWorld { scene: THREE.Scene; water: THREE.Mesh; }

export function createStillwater(): StillwaterWorld {
  const scene = new THREE.Scene();
  addAtmosphere(scene);
  scene.add(createMoon(), createTrees(), createBoat());
  const water = createWater();
  scene.add(water);
  const bank = new THREE.Mesh(new THREE.CircleGeometry(42, 64), new THREE.MeshStandardMaterial({ color: '#101b17', roughness: 1 }));
  bank.rotation.x = -Math.PI / 2;
  bank.position.y = -0.62;
  bank.scale.set(1.3, 0.8, 1);
  scene.add(bank);
  addLilyPads(scene);
  return { scene, water };
}

function addLilyPads(scene: THREE.Scene): void {
  const material = new THREE.MeshStandardMaterial({ color: '#315b43', roughness: 0.9, side: THREE.DoubleSide });
  for (let i = 0; i < 18; i += 1) {
    const pad = new THREE.Mesh(new THREE.CircleGeometry(0.18 + (i % 4) * 0.09, 8), material);
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(Math.sin(i * 3.7) * 11, -0.47, -3 - (i % 6) * 5);
    pad.rotation.z = i;
    scene.add(pad);
  }
}
