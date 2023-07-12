import * as THREE from 'three';
import { ExportManager } from './ExportManager';

export default class MeshManager {
    constructor(appManager) {
        this._appManager = appManager;
        this._scene = appManager;
        this.linePoints = [];
        this.firstpoint = false;
        this.wallMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xBDBDBD });
        this.floormat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0xC4CDCF });
        this._group = new THREE.Group();
        this._appManager.sceneManager._scene.add(this._group);
        this._wallCorners = [];

        this.exportManager= new ExportManager(this);
    }
    get wallCorners() {
        return this._wallCorners;
    }
    set wallCorners(value) {
        this._wallCorners.push(value);
    }

    get group(){
        return this._group;
    }

    //#region Wall Creation

    updatePoints(point) {

        if (!this.firstpoint) {
            this.linePoints.push(new THREE.Vector3(point.x, point.y, point.z));
            this.linePoints.push(new THREE.Vector3(point.x, 800, point.z));
        }
        else {
            var top = new THREE.Vector3(point.x, 800, point.z);
            var bottom = new THREE.Vector3(point.x, point.y, point.z);
            this.linePoints.push(top);
            this.linePoints.push(bottom);
            this.createGeometry(this.linePoints);
            var switchPoints = this.linePoints;
            this.linePoints = [];
            this.linePoints.push(switchPoints[3])
            this.linePoints.push(switchPoints[2])

            if (this._wallCorners.length == 4) {

                var finalWallPoints = [];
                finalWallPoints.push(switchPoints[3])
                finalWallPoints.push(switchPoints[2])
                var fWallTop = new THREE.Vector3(this._wallCorners[0].x, 800, this._wallCorners[0].z)
                finalWallPoints.push(fWallTop)
                finalWallPoints.push(this._wallCorners[0])
                this.createGeometry(finalWallPoints);
                this.createFloorMesh();
                console.log(this._appManager.drawWalls)

                this._appManager.drawWalls = false;
                this._appManager.drawCube = true;
                console.log(this._appManager.drawWalls)

                this._appManager.uiManager.objectPanel.root.style.display = 'block'
                this._appManager.uiManager.wallPanel.root.style.display = 'none'
                this._appManager.uiManager.exportButton.style.display = 'block'
                this.prepareObjectProps();

            }

        }
        this.firstpoint = true;

        this._appManager.sceneManager.updateScene();


    }

    createGeometry(arra) {

        let vertex = this.setVertices(arra);
        let Indices__ = this.setIndices();
        let geometry = new THREE.BufferGeometry();
        geometry.setIndex(Indices__);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertex, 3));
        var mesh = new THREE.Mesh(geometry, this.wallMat);
        this._group.add(mesh);
        // var wall = mesh;
    }

    createFloorMesh() {

        let vertex = this.setVertices(this.wallCorners);
        let Indices__ = this.setIndices();
        var geometry = new THREE.BufferGeometry();
        geometry.setIndex(Indices__);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertex, 3));
        let mesh = new THREE.Mesh(geometry, this.floormat);
        this._group.add(mesh);
        // var floorMesh = mesh;
        this._appManager.sceneManager.intersectionMeshes = [];
        this._appManager.sceneManager.intersectionMeshes.push(mesh)
        // this._appManager.sceneManager.intersectionMeshes=mesh;
        // IntersectObjects.push(floorMesh)
    }

    setVertices(vertices) {
        var refVertices = [...vertices];

        var verticeslocal = new Float32Array(16 * 3);
        for (let i = 1; i <= vertices.length; i++) {
            verticeslocal[i * 3 - 3] = refVertices[i - 1].x;
            verticeslocal[i * 3 - 2] = refVertices[i - 1].y;
            verticeslocal[i * 3 - 1] = refVertices[i - 1].z;
        }
        console.log(this)
        console.log('gizmosetVertices', verticeslocal.length, verticeslocal)
        return verticeslocal;
    }

    setIndices() {

        var indices_temp = [
            0, 1, 3,
            1, 2, 3,
            4, 5, 7,
            5, 6, 7
        ];

        return indices_temp;
    }



    //#endregion

    // ___________


    //#region Room Object Addition Create cube or sphere geometry props
    _geometryCube;
    _geometrySphere;
    _CubeMat;
    _sphereMat;
    prepareObjectProps() {
        this._geometryCube = new THREE.BoxBufferGeometry(100, 100, 100);
        this._geometrySphere = new THREE.SphereBufferGeometry(60, 32, 16);
        this._CubeMat = new THREE.MeshBasicMaterial({ color: 0x458391, opacity: 0.5, transparent: true });
        this._sphereMat = new THREE.MeshBasicMaterial({ color: 0xF08A17, opacity: 0.5, transparent: true });
    }
    // add cube or sphere on floor
    addObject(intersect) {
        let object;
        if (this._appManager.drawCube)
            object = new THREE.Mesh(this._geometryCube, this._CubeMat);
        if (this._appManager.drawSphere)
            object = new THREE.Mesh(this._geometrySphere, this._sphereMat);

        object.position.copy(intersect.point).add(intersect.face.normal);
        object.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
        //  scene.add(object);

        this._group.add(object);

    }

    //#endregion Room Object Addition 



}