uniform float uTime;
varying vec2 vUv;
varying float vWave;

void main() {
  vUv = uv;
  vec3 displaced = position;
  float wave = sin(position.x * 0.42 + uTime * 0.7) * 0.045;
  wave += cos(position.y * 0.31 - uTime * 0.45) * 0.035;
  displaced.z += wave;
  vWave = wave;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
