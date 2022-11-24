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

vec3 calculateAmbient(){
  return ambientColor*kAmbient;
}

vec3 calculateDiffuse(vec3 normal, vec3 lightDirection){
  return diffuseColor*max(0.0, dot(normal, normalize(spherePosition - worldPosition)))*kDiffuse;
}

vec3 calculateSpecular(vec3 normal, vec3 lightDirection){
  vec3 viewDirection = normalize(viewPosition - worldPosition);
  vec3 halfwayDirection = normalize(lightDirection + viewDirection);
  return specularColor*pow(max(0.0, dot(normal, halfwayDirection)), shininess)*kSpecular;
}

void main() {

  // gl_FragColor = vec4(vec3(0.0), 1.0);
  //    gl_FragColor = texture(colorMap, texCoord);
  vec3 normal = normalize(mat3(transpose(inverse(modelMatrix))) * interpolatedNormal);


  vec3 lightDirection = normalize(spherePosition - worldPosition);

  vec3 out_Ambient = calculateAmbient();
  vec3 out_Diffuse = calculateDiffuse(normal, lightDirection);
  vec3 out_Specular = calculateSpecular(normal, lightDirection);

  vec3 out_Color = out_Ambient + out_Specular + out_Diffuse;

  //  gl_FragColor = vec4(clamp(out_Color, 0.0, 1.0), 1.0);
  gl_FragColor = texture(colorMap, texCoord)*vec4(clamp(out_Color, 0.0, 1.0), 1.0);
  // I want to get the initial color in there too
}
