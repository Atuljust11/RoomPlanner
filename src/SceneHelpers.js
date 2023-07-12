import * as THREE from 'three';

export class SceneHelpers {
    _intesectMesh;
    _mouseMesh;
    constructor(sceneManager) {
        this._appManager = sceneManager.appManager;
        this._scene = sceneManager._scene;
        console.log(sceneManager)
        console.log(sceneManager.scene)
        this.setRefrenceMesh();

    }

    setGridMesh() {
        // grid
        const gridHelper = new THREE.GridHelper(10000, 200);
        this._scene.add(gridHelper);
        const geometry = new THREE.PlaneGeometry(10000, 10000);
        geometry.rotateX(- Math.PI / 2);
        this._intesectMesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
        this._scene.add(this._intesectMesh);
        console.log(this._scene)
    }

    setRoolOverMesh() {
        // roll-over helpers
        var _geometry = new THREE.BoxGeometry(50, 50, 50);
        var _mat = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });
        const mouseMesh = new THREE.Mesh(_geometry, _mat);
        this._scene.add(mouseMesh);
        return mouseMesh;
    }

    setRefrenceMesh() {
        // refrenceHelper helpers
        var _geometry = new THREE.BoxGeometry(50, 50, 50);
        var _mat = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true });

        this._refrenceMesh = new THREE.Mesh(_geometry, _mat);
        this._scene.add(this._refrenceMesh);
        this._refrenceMesh.visible = false;
    }

    get intesectMesh() {
        return this._intesectMesh;
    }

    get refrenceMesh() {
        return this._refrenceMesh;
    }

}