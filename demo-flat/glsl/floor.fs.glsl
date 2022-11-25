// Textures are passed in as uniforms
uniform vec3 ambientColor;
uniform float kAmbient;

uniform vec3 diffuseColor;
uniform float kDiffuse;

uniform vec3 specularColor;
uniform float kSpecular;
uniform float shininess;

uniform mat4 modelMatrix;

uniform vec3 spherePosition;
in vec3 interpolatedNormal;
in vec3 viewPosition;
in vec3 worldPosition;

in vec2 texCoord;
uniform sampler2D colorMap;
// out vec4 out_FragColor;

void main() {

  // gl_FragColor = vec4(vec3(0.0), 1.0);
  gl_FragColor = texture(colorMap, texCoord);
}
