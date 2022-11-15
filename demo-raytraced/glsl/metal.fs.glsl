// Textures are passed in as uniforms
in vec2 texCoord;
uniform sampler2D colorMap;
// out vec4 out_FragColor;



void main() {

  // gl_FragColor = vec4(vec3(0.0), 1.0);
  gl_FragColor = texture(colorMap, texCoord);
}
