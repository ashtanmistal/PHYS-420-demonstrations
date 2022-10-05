// check webgl version
if ( WEBGL.isWebGL2Available() === false ) {
    document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
}
var blur = false;

// SETUP RENDERER
const { renderer, canvas } = setup();


// will need 4 different textures to use for the 4 different materials
// each will basically just be of various reflectivity
// minimize, but not eliminate, the amount of diffuse reflection
// TODO: we will have to merge this project with the website project eventually in order to have this demonstration available on the website


// get the texture images
// (first we have to make the texture images) TODO: make the texture images

const floorColorTexture = new THREE.TextureLoader().load('images/texture/color.jpg');