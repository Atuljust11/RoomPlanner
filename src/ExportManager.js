import * as THREE from 'three';
import GLTFExporter from 'three-gltf-exporter';
export class ExportManager {

    constructor(meshManager) {

        this._meshManager = meshManager;
        this.link = document.createElement('a');
        this.link.style.display = 'none';
        document.body.appendChild(this.link);

        this.exporter = new GLTFExporter();

    }





    exportScene() {
        try {
            console.log(this._meshManager.group)
            this.exporter.parse(
                [this._meshManager.group],
                // called when the gltf has been generated
                (gltf) => {

                    // console.log(gltf);
                    // downloadJSON(gltf);
                    const output = JSON.stringify(gltf, null, 2);
                    this.saveString(output, 'Room.gltf');
                },
                // called when there is an error in the generation
                (error) => {

                    console.log('An error happened');
                    console.log(error);

                },
                {}
            );
        } catch (error) {

        }

    }



    saveString(text, filename) {

        this.save(new Blob([text], {
            type: 'text/plain'
        }), filename);
    }

    // Firefox workaround, see #6594

    save(blob, filename) {

        this.link.href = URL.createObjectURL(blob);
        this.link.download = filename;
        this.link.click();


    }
    //#endregion

}
