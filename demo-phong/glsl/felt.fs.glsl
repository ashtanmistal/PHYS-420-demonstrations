// Textures are passed in as uniforms
uniform vec3 ambientColor; // ambient color of the object
uniform float kAmbient; // ambient coefficient of the object

uniform vec3 diffuseColor; // diffuse color of the object
uniform float kDiffuse; // diffuse coefficient of the object

uniform vec3 specularColor; // specular color of the object
uniform float kSpecular; // specular coefficient of the object
uniform float shininess; // shininess of the object

uniform mat4 modelMatrix; // model matrix of the object

uniform vec3 spherePosition; // position of the sphere (the light source)
in vec3 interpolatedNormal; // normal vector of the fragment (computed in the vertex shader)
in vec3 viewPosition; // position of the camera (computed in the vertex shader)
in vec3 worldPosition; // position of the fragment in world coordinates (computed in the vertex shader)

in vec2 texCoord; // texture coordinates for the fragment
uniform sampler2D colorMap; // texture for the object

vec3 calculateAmbient(){
return ambientColor*kAmbient; // ambient color of the object * ambient coefficient of the object
}

vec3 calculateDiffuse(vec3 normal, vec3 lightDirection){
// to calculate the diffuse color, we need to calculate the dot product of the normal vector and the light direction
// sometimes the dot product is negative, so we need to clamp it to be at least 0
return diffuseColor*max(0.0, dot(normal, normalize(spherePosition - worldPosition)))*kDiffuse;
}

vec3 calculateSpecular(vec3 normal, vec3 lightDirection){
// to calculate the specular color, we need to calculate the dot product of the normal vector and the light direction
// we use Blinn-Phong approximation of Phong shading, so we need to calculate the halfway vector
// halfway vector is the vector that points halfway between the light direction and the view direction
vec3 viewDirection = normalize(viewPosition - worldPosition);
vec3 halfwayDirection = normalize(lightDirection + viewDirection);
// and then we calculate the dot product of the normal vector and the halfway vector
return specularColor*pow(max(0.0, dot(normal, halfwayDirection)), shininess)*kSpecular;
}

void main() {
// we calculate the normal vector by transforming the normal vector from model coordinates to world coordinates
vec3 normal = normalize(mat3(transpose(inverse(modelMatrix))) * interpolatedNormal);


vec3 lightDirection = normalize(spherePosition - worldPosition); // light direction is the vector from the fragment to the light source

vec3 out_Ambient = calculateAmbient();
vec3 out_Diffuse = calculateDiffuse(normal, lightDirection);
vec3 out_Specular = calculateSpecular(normal, lightDirection);

vec3 out_Color = out_Ambient + out_Specular + out_Diffuse; // the final color of the fragment is the sum of the ambient, diffuse, and specular colors

gl_FragColor = texture(colorMap, texCoord)*vec4(clamp(out_Color, 0.0, 1.0), 1.0); // calculate total color of the fragment
}
