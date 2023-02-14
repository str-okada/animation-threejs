import './App.css'
import * as THREE from "three";
import { useEffect } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

function App() {
  let canvas: HTMLElement;
  let model: THREE.Group;

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    // scene
    const scene: THREE.Scene = new THREE.Scene();

    // camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0.1, 0.1, 1);

    // renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // 3d medel import!
    const gltfloder = new GLTFLoader();

    let mixer: THREE.AnimationMixer;

    gltfloder.load("./models/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.001, 0.001, 0.001);
      model.rotation.y = -Math.PI / 3;

      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      // console.log(clips)
      clips.forEach(function (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      })
    })

    // light 
    const ambientLight = new THREE.AmbientLight(0xffff, 1);
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffff, 2, 100)
    scene.add(pointLight)

    // animation
    const tick = () => {
      renderer.render(scene, camera);
      if (mixer) {
        mixer.update(0.01)
      }
      requestAnimationFrame(tick);
    }
    
    tick();

  }, [])

  return (
    <>
      <canvas id='canvas'></canvas>
      <div className="mainContent">
        <h3>I'm almost there</h3>
        <p>Web Developper</p>
      </div>
    </>
  )
}

export default App
