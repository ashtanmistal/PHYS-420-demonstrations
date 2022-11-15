// HINT: Don't forget to define the uniforms here after you pass them in in main.js

// The value of our shared variable is given as the interpolation between normals computed in the vertex shader
// below we can see the shared variable we passed from the vertex shader using the 'in' classifier
in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 vertexPosition;
uniform float ticks;

void main() {
    // HINT: Compute the light intensity the current fragment by determining
    // the cosine angle between the surface normal and the light vector.
    float intensity = dot(normalize(interpolatedNormal), normalize(lightDirection));

    // HINT: Pick any two colors and blend them based on light intensity
    vec3 gridColour1 = vec3(1.0,0.3,0.4);
    vec3 gridColour2 = vec3(0.5,0.2,0.7);

    // to give the 3D model some color and depth.
    vec3 out_Stripe = mix(gridColour1, gridColour2, intensity);

    if ( !(
    mod(vertexPosition.x + ticks, 0.15) < 0.13 &&
    mod(vertexPosition.y + ticks, 0.15) < 0.13 &&
    mod(vertexPosition.z + ticks/3.0, 0.15) < 0.13 )) {
        discard;
    }
    // HINT: Set final rendered colour
    gl_FragColor = vec4(out_Stripe, 1.0);
}
