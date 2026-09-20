uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
varying vec2 vUv;

void main() {
  float fogDepth = smoothstep(uFogNear, uFogFar, gl_FragCoord.z / gl_FragCoord.w);
  float mist = smoothstep(0.2, 1.0, 1.0 - abs(vUv.x - 0.5) * 2.0);
  gl_FragColor = vec4(uFogColor, (1.0 - fogDepth) * 0.45 + mist * 0.18);
}
