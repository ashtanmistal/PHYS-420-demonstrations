// HINT: Don't forget to define the uniforms here after you pass them in in main.js

uniform vec3 toonColor;
uniform vec3 toonColor2;
uniform vec3 outlineColor;

// The value of our shared variable is given as the interpolation between normals computed in the vertex shader
// below we can see the shared variable we passed from the vertex shader using the 'in' classifier
in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 viewPosition;
in float fresnel;

void main() {
    // HINT: Compute the light intensity the current fragment by determining
    // the cosine angle between the surface normal and the light vector

    // surface normal: interpolatedNormal; light vector is lightDirection ?
    float intensity = dot(normalize(interpolatedNormal), normalize(lightDirection));

    // HINT: Define ranges of light intensity values to shade. GLSL has a
    // built-in `ceil` function that you could use to determine the nearest
    // light intensity range.2
    vec3 out_Toon;
    if (fresnel < 0.5 && fresnel > -0.5) {
        out_Toon = outlineColor;
    } else if (intensity < -0.5) {
        out_Toon = toonColor2;
    } else if (intensity > 0.5) {
        out_Toon = toonColor;
    } else {
        out_Toon = mix(toonColor, toonColor2, 0.5);
    }
//    if (fresnel < 0.5 && fresnel > -0.5) {
//        out_Toon = outlineColor;
//    } else {
//        out_Toon = mix(toonColor, toonColor2, ceil(intensity));
//    }

    // HINT: You should use two tones of colors here; `toonColor` is a cyan
    // color for brighter areas and `toonColor2` is a blue for darker areas.
    // Use the light intensity to blend the two colors, there should be 3 distinct
    // colour regions
    // = mix(toonColor, toonColor2, 0.5);

    // HINT: To achieve the toon silhouette outline, set a dark fragment color
    // if the current fragment is located near the edge of the 3D model.
    // Use a reasonable value as the threshold for the silhouette thickness
    // (i.e. proximity to edge).


    gl_FragColor = vec4(out_Toon, 1.0);
}
