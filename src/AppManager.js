import MeshManager from "./MeshManager";
import { UiManager } from "./Ui/Ui";
import { SceneManager } from "./sceneManager";

export default class AppManager {



    _drawWalls = true;
    _drawCube = false;
    _drawSphere = false;
 
    constructor() {

        this.sceneManager = new SceneManager(this);
        this.uiManager = new UiManager(this);
        this.meshManager = new MeshManager(this);
        // console.log(this._drawWalls)

    }

    get drawWalls(){
        return this._drawWalls;
    }
    set drawWalls(value){
         this._drawWalls=value;
    }

    get drawCube(){
        return this._drawCube;
    }
    set drawCube(value){
         this._drawCube=value;
    }

    get drawSphere(){
        return this._drawSphere;
    }
    set drawSphere(value){
         this._drawSphere=value;
    }

    
} 