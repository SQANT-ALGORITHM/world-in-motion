import * as THREE from 'three';
import waterVertex from '../shaders/water.glsl?raw';

export function createWater(): THREE.Mesh {
  const geometry = new THREE.PlaneGeometry(84, 84, 120, 120);
  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vWave;

      void main() {
        vec3 deep = vec3(0.010, 0.040, 0.060);
        vec3 mid = vec3(0.048, 0.102, 0.118);
        vec3 moon = vec3(0.37, 0.52, 0.58);
        vec3 cabin = vec3(1.0, 0.66, 0.28);

        float moonRef = pow(max(0.0, 1.0 - abs(vUv.x - 0.58) * 2.2), 4.0);
        float moonGlow = moonRef * (0.5 + 0.5 * sin(vUv.y * 28.0 + uTime * 2.8));
        float cabinRef = pow(max(0.0, 1.0 - abs(vUv.x - 0.31) * 3.0), 6.0) * (0.7 + 0.3 * sin(uTime * 2.3 + vUv.y * 48.0));
        float ripples = sin((vUv.x * 42.0 + uTime * 2.0) + vUv.y * 78.0) * 0.5 + 0.5;
        float shimmer = 0.8 + vWave * 6.0;

        vec3 color = mix(deep, mid, vUv.y * 0.8 + 0.25);
        color = mix(color, moon, moonGlow * shimmer * 0.55);
        color += cabin * cabinRef * 0.9;
        color += vec3(0.02, 0.08, 0.09) * ripples * 0.28;
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
