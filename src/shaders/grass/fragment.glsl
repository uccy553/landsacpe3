varying vec2 vUv;
varying float vHeight;
uniform vec3 colorBottom;
uniform vec3 colorTop;

void main() {
  // Gradient from bottom (dark green) to top (light green)
  vec3 color = mix(colorBottom, colorTop, vHeight);
  
  // Add subtle noise/variation
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  color += (noise - 0.5) * 0.1;
  
  gl_FragColor = vec4(color, 1.0);
}
