import * as THREE from 'three';
import { SceneHelpers } from './SceneHelpers';
import { sceneEvents } from './events/sceneEvents';
export class SceneManager {

    constructor(appManager) {
        this.appManager = appManager;
        this.initScene();
        this.sceneHelper = new SceneHelpers(this);
        this.setintersectionMesh();
        this.sceneEvents = new sceneEvents(this, appManager)

    }

    _scene;
    _camera;
    _renderer;
    intersectionMeshes = [];
    _mouseMesh;

    initScene() {

        this._camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
        this._camera.position.set(0, 2500, 0);
        this._camera.lookAt(0, 0, 0);

        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0xf0f0f0);

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        this._mesh = new THREE.Mesh(geometry, material);
        this._scene.add(this._mesh);

        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(this._renderer)

        this._renderer.setAnimationLoop(() => {
            this.#animation();
        });
        document.body.appendChild(this._renderer.domElement);

        window.addEventListener('resize', () => this.#onWindowResize());

        // lights
        const ambientLight = new THREE.AmbientLight(0x606060);
        this._scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 0.75, 0.5).normalize();
        this._scene.add(directionalLight);
    }


    setintersectionMesh() {

        this.sceneHelper.setGridMesh();
        this._mouseMesh = this.sceneHelper.setRoolOverMesh();
        this.intersectionMeshes.push(this.sceneHelper.intesectMesh);

    }
   
    get scene() {
        return this._scene;
    }
    get camera() {
        return this._camera;
    }
    get renderer() {
        return this._renderer;
    }
    get mousemesh() {
        return this._mouseMesh;
    }

    updateScene() {
        this.#animation();
    }

    #animation() {
        // console.log(this._renderer)

        //    this._mesh.rotation.x = time / 2000;
        //    this._mesh.rotation.y = time / 1000;
        if (this._renderer)
            this._renderer.render(this._scene, this._camera);

    }

    #onWindowResize() {

        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(window.innerWidth, window.innerHeight);

        this.#animation();

    }
}