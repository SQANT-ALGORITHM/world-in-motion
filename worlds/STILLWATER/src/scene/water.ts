import * as THREE from 'three';
import waterVertex from '../shaders/water.glsl?raw';

export function createWater(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(80, 80, 96, 96);
  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;
      void main() {
        vec3 deep = vec3(0.012, 0.055, 0.065);
        vec3 reflectedMoon = vec3(0.33, 0.47, 0.49);
        float moonTrail = pow(max(0.0, 1.0 - abs(vUv.x - 0.56) * 17.0), 7.0);
        float shimmer = sin(vUv.y * 170.0 + uTime * 2.4) * 0.08 + 0.92;
        vec3 color = mix(deep, reflectedMoon, moonTrail * shimmer * 0.42);
        color += vec3(0.02, 0.08, 0.07) * (0.5 + vWave * 4.0);
        gl_FragColor = vec4(color, 0.96);
      }
    `,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
  });
  const water = new THREE.Mesh(geometry, material);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.55;
  water.name = 'Animated blackwater';
  return water;
}

export function updateWater(water: THREE.Mesh, time: number): void {
  (water.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
}
