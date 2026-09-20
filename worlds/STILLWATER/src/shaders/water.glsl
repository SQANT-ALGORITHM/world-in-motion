uniform float uTime;
varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;
  vec3 displaced = position;
  float wave = sin(position.x * 0.48 + uTime * 0.82) * 0.055;
  wave += cos(position.y * 0.34 - uTime * 0.61) * 0.045;
  wave += sin((position.x + position.y) * 0.7 - uTime * 0.5) * 0.022;
  displaced.z += wave;
  vWave = wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
