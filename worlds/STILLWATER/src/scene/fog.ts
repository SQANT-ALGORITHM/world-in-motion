import * as THREE from 'three';

export function addAtmosphere(scene: THREE.Scene): void {
  scene.background = new THREE.Color('#050d15');
  scene.fog = new THREE.FogExp2('#102a34', 0.018);

  scene.add(new THREE.HemisphereLight('#829eb0', '#02070b', 0.8));

  const moonLight = new THREE.DirectionalLight('#d7e3ea', 2.2);
  moonLight.position.set(-10, 14, -18);
  scene.add(moonLight);

  const moonGlow = new THREE.PointLight('#c7dfe0', 18, 60, 2);
  moonGlow.position.set(-10, 12, -22);
  scene.add(moonGlow);

  const mistGroup = new THREE.Group();
  const mistPalette = ['#4d6b7c', '#6d8392', '#465c72'];
  mistPalette.forEach((color, index) => {
    const mistPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(58, 16),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08 + index * 0.04,
        depthWrite: false,
      }),
    );
    mistPlane.rotation.x = -Math.PI / 2;
    mistPlane.position.set((index - 1.2) * 11, 0.12 + index * 0.24, -18 - index * 8);
    mistPlane.scale.set(1.18, 1 + index * 0.1, 1);
    mistGroup.add(mistPlane);
  });

  scene.add(mistGroup);
  (scene as THREE.Scene & { userData: { mistGroup: THREE.Group } }).userData.mistGroup = mistGroup;
}
