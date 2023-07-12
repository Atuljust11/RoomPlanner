
// import LiteGUI from './litegui.js';


// LiteGUI;
export class UiManager {

    constructor(appManager) {
        this._appManager = appManager;
        console.log(this._appManager)
        console.log(this._appManager.drawWalls)
        console.log(this._appManager._drawSphere)
        // this._appManager._drawWalls = true;
        // this._appManager._drawSphere = true;
        console.log(this._appManager.drawWalls)
        console.log(this._appManager.drawSphere)

        // LiteGUI.init();

        this.CreateUi();


    }
    wallPanel; objectPanel;
    parentPanel;
    exportButton;
    CreateUi() {
        // Initialize litegui.js
        LiteGUI.init();

        // Create a new dialog
        const dialog = new LiteGUI.Dialog('Settings', { title: "Setup", close: false, minimize: false, width: 400, height: 0, scroll: false, resizable: false, draggable: false });
        dialog.show();
        dialog.root.style.left = "0px"
        dialog.root.style.top = "5px"
        dialog.root.style.opacity = 1
        this.parentPanel = new LiteGUI.Inspector();

        this.exportButton = this.parentPanel.addButton("", "Export Mesh", {
            name_wicth: "0%",
            callback: () => {
                this._appManager.meshManager.exportManager.exportScene();
            }
        })

        this.wallPanel = new LiteGUI.Inspector();
        this.objectPanel = new LiteGUI.Inspector();


        this.wallPanel.addInfo("Wall Creation:", "Note : You can create max 4 wall room<br>Steps:<br>1. Click on floor:<br>1. Click points to create a rectangle shape:")
        this._appManager.drawWalls = true;


        this.objectPanel.addInfo("Object Creation:", "Steps:<br>1. Select Shape from Drop Down Default is Cube:<br>1. Click on floor to create a shape:")
        this.objectPanel.addCombo(
            'Add',
            'Cube',
            {
                values: [
                    'Cube',
                    'Sphere'
                ],
                callback: (value) => {

                    console.log(value)
                    if (value == "Cube") {

                        this._appManager.drawCube = true;
                        this._appManager.drawSphere = false;

                    }
                    else if (value == "Sphere") {

                        this._appManager.drawSphere = true;
                        this._appManager.drawCube = false;


                    }
                }
            });



        this.objectPanel.root.style.display = 'none'
        this.exportButton.style.display = 'none'
        dialog.add(this.parentPanel);
        dialog.add(this.wallPanel);
        dialog.add(this.objectPanel);


    }


}