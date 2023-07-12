import * as THREE from 'three';
export class sceneEvents {

    constructor(sceneManager, appManager) {
        this._appManager = appManager;
        this._sceneManger = sceneManager;
        // console.log(this._appManager)
        // console.log(this._appManager.drawWalls)
        // // console.log(this._appManager._drawSphere)

        // console.log(this._appManager.drawWalls)

        this._camera = sceneManager.camera;
        this._refrenceMesh = this._sceneManger.sceneHelper.refrenceMesh;
        console.log(this._refrenceMesh)
        this._mousemesh = sceneManager.mousemesh;
        //Raycast
        this._raycaster = new THREE.Raycaster();
        this._pointer = new THREE.Vector2();
        document.addEventListener('pointermove', (e) => this.#onPointerMove(e));
        document.addEventListener('pointerdown', (e) => this.#onPointerDown(e));
        document.addEventListener('keydown', (e) => this.#onDocumentKeyDown(e));
        document.addEventListener('keyup', (e) => this.#onDocumentKeyUp(e));

    }
    #onPointerMove(event) {

        this._pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

        this._raycaster.setFromCamera(this._pointer, this._camera);


        const intersects = this._raycaster.intersectObjects(this._sceneManger.intersectionMeshes, false);

        if (intersects.length > 0) {

            const intersect = intersects[0];
            this._mousemesh.position.copy(intersect.point).add(intersect.face.normal);
            this._mousemesh.position.divideScalar(50).floor().multiplyScalar(50).addScalar(25);
            this._sceneManger.updateScene();

        }


    }

    #onPointerDown(event) {

        this._pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

        this._raycaster.setFromCamera(this._pointer, this._camera);

        const intersects = this._raycaster.intersectObjects(this._sceneManger.intersectionMeshes, false);

        if (intersects.length > 0) {

            const intersect = intersects[0];
            console.log(intersect)
            // console.log(this._appManager)
            console.log(this._appManager.drawWalls)
            console.log(this._appManager.meshManager.wallCorners)

            if (this._appManager.drawWalls && this._appManager.meshManager.wallCorners.length < 4) {
                this._refrenceMesh.position.copy(intersect.point).add(intersect.face.normal);

                var vec = new THREE.Vector3(this._refrenceMesh.position.x, this._refrenceMesh.position.y, this._refrenceMesh.position.z)
                console.log(vec)

                this._appManager.meshManager.wallCorners = vec;
                this._appManager.meshManager.updatePoints(this._refrenceMesh.position);

            }
            else if (this._appManager._drawCube || this._appManager._drawSphere) {
                // refrenceMesh.position.copy(intersect.point).add(intersect.face.normal);
                this._appManager.meshManager.addObject(intersect);

            }




            //  render();


        }

    }

    #onDocumentKeyDown(event) {

        switch (event.keyCode) {

            // case 16: isShiftDown = true; break;

        }

    }

    #onDocumentKeyUp(event) {

        switch (event.keyCode) {

            //     case 16: isShiftDown = false; break;

        }

    }
}