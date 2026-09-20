import * as THREE from 'three';

export function createBoat(): THREE.Group {
  const boat = new THREE.Group();
  boat.name = 'Weathered skiff';

  const hullMaterial = new THREE.MeshStandardMaterial({
    color: '#1b1d20',
    roughness: 0.95,
    metalness: 0.18,
  });

  const hull = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 2.8, 8, 18), hullMaterial);
  hull.scale.set(1.15, 0.34, 1.12);
  hull.rotation.x = Math.PI / 2;
  hull.position.y = -0.08;
  boat.add(hull);

  const bow = new THREE.Mesh(new THREE.ConeGeometry(0.58, 1.0, 18), hullMaterial);
  bow.rotation.z = -Math.PI / 2;
  bow.position.set(1.42, -0.04, 0);
  boat.add(bow);

  const stern = new THREE.Mesh(new THREE.ConeGeometry(0.52, 0.92, 18), hullMaterial);
  stern.rotation.z = Math.PI / 2;
  stern.position.set(-1.38, -0.02, 0);
  boat.add(stern);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.12, 0.9), new THREE.MeshStandardMaterial({ color: '#35261d', roughness: 1 }));
  deck.position.set(0.15, 0.26, 0);
  boat.add(deck);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.8, 0.85),
    new THREE.MeshStandardMaterial({ color: '#2f2925', roughness: 0.92, metalness: 0.1 }),
  );
  cabin.position.set(0.16, 0.8, 0);
  boat.add(cabin);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.36, 0.08, 0.96),
    new THREE.MeshStandardMaterial({ color: '#191d1f', roughness: 0.9 }),
  );
  roof.position.set(0.16, 1.26, 0);
  boat.add(roof);

  const windowMat = new THREE.MeshStandardMaterial({
    color: '#f9b864',
    emissive: '#ff9c44',
    emissiveIntensity: 1.4,
    roughness: 0.25,
    metalness: 0.08,
  });

  const windowLeft = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.04), windowMat);
  windowLeft.position.set(-0.22, 0.95, 0.38);
  boat.add(windowLeft);

  const windowRight = windowLeft.clone();
  windowRight.position.z = -0.38;
  boat.add(windowRight);

  const windowFront = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 0.7), windowMat);
  windowFront.position.set(0.68, 0.92, 0);
  boat.add(windowFront);

  const warmLight = new THREE.PointLight('#ffb167', 1.8, 4.2, 2);
  warmLight.position.set(0.3, 0.95, 0);
  boat.add(warmLight);

  const sternLight = new THREE.PointLight('#ff9b62', 0.8, 3, 2);
  sternLight.position.set(-1.2, 0.22, 0.2);
  boat.add(sternLight);

  const oar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 2.8, 6),
    new THREE.MeshStandardMaterial({ color: '#7a5835', roughness: 1 }),
  );
  oar.rotation.z = Math.PI / 2;
  oar.position.set(1.05, 0.5, 0.1);
  boat.add(oar);

  const oar2 = oar.clone();
  oar2.position.z = -0.1;
  boat.add(oar2);

  const wakeRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.025, 8, 26),
    new THREE.MeshBasicMaterial({ color: '#7cc6d8', transparent: true, opacity: 0.16 }),
  );
  wakeRing.rotation.x = Math.PI / 2;
  wakeRing.position.set(-1.25, -0.28, 0);
  boat.add(wakeRing);

  boat.position.set(1.4, -0.18, 1.8);
  boat.rotation.y = -0.65;
  boat.userData.baseY = boat.position.y;
  return boat;
}
