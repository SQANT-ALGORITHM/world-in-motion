uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying vec2 vUv;

void main() {
  float depth = smoothstep(uFogNear, uFogFar, gl_FragCoord.z / gl_FragCoord.w);
  gl_FragColor = vec4(uFogColor, depth);
}
