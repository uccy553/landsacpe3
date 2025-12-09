varying vec2 vUv;
varying float vHeight;
uniform float time;

void main() {
  vUv = uv;
  vHeight = position.y;
  
  // Add curvature to grass blade
  vec3 pos = position;
  
  // Simple wind effect
  float wind = sin(pos.x * 0.5 + time * 0.5) * 0.1 * pos.y;
  pos.x += wind;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
