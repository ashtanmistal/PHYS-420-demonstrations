const { renderer, canvas } = setup();


// Load floor textures
const floorColorTexture = new THREE.TextureLoader().load('texture/felt.jpg');
floorColorTexture.minFilter = THREE.LinearFilter;
floorColorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const floorNormalTexture = new THREE.TextureLoader().load('texture/normal.png');
floorNormalTexture.minFilter = THREE.LinearFilter;
floorNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const woodColorTexture = new THREE.TextureLoader().load('texture/woodcolor.jpg');
woodColorTexture.minFilter = THREE.LinearFilter;
woodColorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const woodNormalTexture = new THREE.TextureLoader().load('texture/woodnormal.jpg');
woodNormalTexture.minFilter = THREE.LinearFilter;
woodNormalTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

const metalColorTexture = new THREE.TextureLoader().load('texture/metal.jpg');
metalColorTexture.minFilter = THREE.LinearFilter;
metalColorTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();



// Uniforms - Pass these into the appropriate vertex and fragment shader files
const spherePosition = { type: 'v3', value: new THREE.Vector3(0.0, 0.0, 0.0) };
const tangentDirection = { type: 'v3', value: new THREE.Vector3(0.5, 0.0, 1.0) };

const ambientColor = { type: 'c', value: new THREE.Color(0.0, 0.0, 1.0) };
const diffuseColor = { type: 'c', value: new THREE.Color(0.0, 1.0, 1.0) };
const specularColor = { type: 'c', value: new THREE.Color(1.0, 1.0, 1.0) };
const lightColor = { type: 'c', value: new THREE.Color(1.0, 1.0, 1.0) };

const kAmbient = { type: "f", value: 0.3 };
const kDiffuse = { type: "f", value: 0.6 };
const kSpecular = { type: "f", value: 1.0 };
const shininess = { type: "f", value: 10.0 };
const ticks = { type: "f", value: 0.0 };

const sphereLight = new THREE.PointLight(0xffffff, 1, 300);

const cubeSize = 3.6;
const cubeOffset = cubeSize / 2.0;


// Shader materials
const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition
  }
});

const floorMaterial = new THREE.ShaderMaterial( {
  side: THREE.DoubleSide,
  uniforms: {
    colorMap: {type: "t", value: floorColorTexture},
    normalMap: {type: "t", value: floorNormalTexture},
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess
  }
} );

const anisotropicMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess,
    lightColor: lightColor,
    tangentDirection: tangentDirection
  }
});

const phongMaterial = new THREE.ShaderMaterial({
  uniforms: {
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess
  }
});


const woodMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    colorMap: {type: "t", value: woodColorTexture},
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess
  }
});

const metalMaterial = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  uniforms: {
    colorMap: {type: "t", value: metalColorTexture},
    spherePosition: spherePosition,
    ambientColor: ambientColor,
    diffuseColor: diffuseColor,
    specularColor: specularColor,
    kAmbient: kAmbient,
    kDiffuse: kDiffuse,
    kSpecular: kSpecular,
    shininess: shininess
  }
});

const skyboxCubemap = new THREE.CubeTextureLoader().setPath('texture/cubemap/');
const skyboxTexture = skyboxCubemap.load([
  'normal.png', 'normal.png',
  'normal.png', 'normal.png',
  'normal.png', 'normal.png'
]);
skyboxCubemap.format = THREE.RGBFormat;
const skyboxCubeMapUniform = {type: 't', value: skyboxTexture};

// const feltMaterial = new THREE.MeshPhongMaterial({
// color: 0x000000,
// shininess: 0,
// specular: 0x000000,
// });

// Load shaders
const shaderFiles = [
  'glsl/sphere.vs.glsl',
  'glsl/sphere.fs.glsl',
  'glsl/floor.vs.glsl',
  'glsl/floor.fs.glsl',
  'glsl/phong.vs.glsl',
  'glsl/phong.fs.glsl',
  'glsl/wood.vs.glsl',
  'glsl/wood.fs.glsl',
  'glsl/metal.vs.glsl',
  'glsl/metal.fs.glsl',

];

new THREE.SourceLoader().load(shaderFiles, function (shaders) {
  sphereMaterial.vertexShader = shaders['glsl/sphere.vs.glsl'];
  sphereMaterial.fragmentShader = shaders['glsl/sphere.fs.glsl'];

  phongMaterial.vertexShader = shaders['glsl/phong.vs.glsl'];
  phongMaterial.fragmentShader = shaders['glsl/phong.fs.glsl'];

  floorMaterial.vertexShader = shaders['glsl/floor.vs.glsl'];
  floorMaterial.fragmentShader = shaders['glsl/floor.fs.glsl'];

  woodMaterial.vertexShader = shaders['glsl/wood.vs.glsl'];
  woodMaterial.fragmentShader = shaders['glsl/wood.fs.glsl'];

  metalMaterial.vertexShader = shaders['glsl/metal.vs.glsl'];
  metalMaterial.fragmentShader = shaders['glsl/metal.fs.glsl'];
});

// Define the shader modes
const shaders = {
  PHONG: { key: 0, material: phongMaterial }
};

let mode = shaders.PHONG.key; // Default; this is where we'll override

// Set up scenes
let scenes = [];
for (let shader of Object.values(shaders)) {
  // Create the scene
  const { scene, camera, worldFrame } = createScene(canvas);
  scene.background = skyboxTexture;

  // Create the main sphere geometry (light source)
  // https://threejs.org/docs/#api/en/geometries/SphereGeometry
  const sphereGeometry = new THREE.SphereGeometry(1, 32.0, 32.0);
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(77.0, 10.0,39.0/2.0);
  sphere.parent = worldFrame;
  scene.add(sphere);

  // Look at the definition of loadOBJ to familiarize yourself with
  // how each parameter affects the loaded object.
  // loadAndPlaceOBJ('obj/armadillo.obj', shader.material, function (armadillo) {
  //   armadillo.position.set(0.0, 0.0, -10.0);
  //   armadillo.rotation.y = Math.PI;
  //   armadillo.scale.set(10, 10, 10);
  //   armadillo.parent = worldFrame;
  //   scene.add(armadillo);
  // });


  const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

  const cube1 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube1.position.set(10.0+cubeOffset, cubeOffset,10.0-cubeOffset);
  cube1.parent = worldFrame;
  scene.add(cube1);

  const cube2 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube2.position.set(10.0+cubeOffset, cubeSize+cubeOffset,10.0-cubeOffset);
  cube2.parent = worldFrame;
  scene.add(cube2);

  const cube3 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube3.position.set(10.0-cubeOffset, cubeOffset,10.0+cubeOffset);
  cube3.parent = worldFrame;
  scene.add(cube3);

  const cube4 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube4.position.set(10.0-cubeOffset, cubeOffset, 20.0-cubeOffset);
  cube4.parent = worldFrame;
  scene.add(cube4);

  const cube5 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube5.position.set(10.0-cubeOffset, cubeOffset, 20.0+cubeOffset);
  cube5.parent = worldFrame;
  scene.add(cube5);

  const cube6 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube6.position.set(30.0-Math.sqrt(cubeOffset**2 + (cubeSize/2)**2), cubeOffset, 10.0+Math.sqrt(cubeSize**2 + (cubeSize/2)**2));
  // the above is needed to set the boundaries correctly for a rotated cube
  cube6.rotation.y = Math.PI/4; // rotate the cube by 45 degrees
  cube6.parent = worldFrame;
  scene.add(cube6);

  const cube7 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube7.position.set(20.0+cubeOffset, cubeOffset, 20.0-cubeOffset);
  cube7.parent = worldFrame;
  scene.add(cube7);

  const cube8 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube8.position.set(20.0+cubeOffset, cubeSize+cubeOffset, 20.0-cubeOffset);
  cube8.parent = worldFrame;
  scene.add(cube8);

  const cube9 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube9.position.set(20.0-cubeOffset, cubeOffset, 30.0-cubeOffset);
  cube9.parent = worldFrame;
  scene.add(cube9);

  const cube10 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube10.position.set(30.0+cubeOffset, cubeOffset+cubeSize, 10.0-cubeOffset);
  cube10.parent = worldFrame;
  scene.add(cube10);

  const cube11 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube11.position.set(30.0+cubeOffset, cubeOffset, 10.0-cubeOffset);
  cube11.parent = worldFrame;
  scene.add(cube11);

  const cube12 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube12.position.set(40.0-Math.sqrt(cubeOffset**2 + (cubeSize/2)**2), cubeOffset, 10.0-Math.sqrt(cubeSize**2 + (cubeSize/2)**2));
  // the above is needed to set the boundaries correctly for a rotated cube
  cube12.rotation.y = Math.PI/4; // rotate the cube by 45 degrees
  cube12.parent = worldFrame;
  scene.add(cube12);

  const cube13 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube13.position.set(40.0+Math.sqrt(cubeOffset**2 + (cubeSize/2)**2), cubeOffset, 10.0-Math.sqrt(cubeSize**2 + (cubeSize/2)**2));
  // the above is needed to set the boundaries correctly for a rotated cube
  cube13.rotation.y = Math.PI/4; // rotate the cube by 45 degrees
  cube13.parent = worldFrame;
  scene.add(cube13);

  const cube14 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube14.position.set(40.0+cubeOffset, cubeOffset, 20.0+cubeOffset);
  cube14.parent = worldFrame;
  scene.add(cube14);

  const cube15 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube15.position.set(40.0-cubeOffset, cubeSize+cubeOffset, 30.0-cubeOffset);
  cube15.parent = worldFrame;
  scene.add(cube15);

  const cube16 = new THREE.Mesh(cubeGeometry, floorMaterial); // TODO change sphereMaterial
  cube16.position.set(40.0-cubeOffset, cubeOffset, 30.0-cubeOffset);
  cube16.parent = worldFrame;
  scene.add(cube16);

  const cube17 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube17.position.set(50.0+cubeOffset, cubeOffset, 10.0-cubeOffset);
  cube17.parent = worldFrame;
  scene.add(cube17);

  const cube18 = new THREE.Mesh(cubeGeometry, metalMaterial); // TODO change sphereMaterial
  cube18.position.set(50.0+cubeOffset, cubeOffset, 20.0-cubeOffset);
  cube18.parent = worldFrame;
  scene.add(cube18);


  const cube19 = new THREE.Mesh(cubeGeometry, woodMaterial); // TODO change sphereMaterial
  cube19.position.set(60.0+cubeOffset, cubeOffset, 10.0-cubeOffset);
  cube19.parent = worldFrame;
  scene.add(cube19);

  const terrainGeometry = new THREE.BoxGeometry(77.0,39.0, 2.0);
  const terrain = new THREE.Mesh(terrainGeometry, floorMaterial);
  terrain.position.set(77.0/2.0, -1.0, 39.0/2.0);
  terrain.rotation.set(- Math.PI / 2, 0, 0);
  scene.add(terrain);

  scene.add(sphereLight);
  scenes.push({ scene, camera });
}



// Setup update callback
function update() {
  ticks.value += 1 / 100.0;
  sphereMaterial.needsUpdate = true;
  phongMaterial.needsUpdate = true;
  floorMaterial.needsUpdate = true;
  woodMaterial.needsUpdate = true;
  metalMaterial.needsUpdate = true;
  requestAnimationFrame(update);
  const { scene, camera } = scenes[mode];
  renderer.render(scene, camera);
}

// Start the animation loop.
update();
