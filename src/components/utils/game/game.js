import Phaser from "phaser";
import GameScene from "./gamescene";


function launch(containerId) {
    return new Phaser.Game({    
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
            gravity: { y: 0 } } 
        },
        parent: containerId,
        scene: [ 
            GameScene
        ],
        // scale: {
        //     mode: Phaser.Scale.FIT,
        //     width: '100%',
        //     height: '100%'
        // }
    });
}

export default launch;
export { launch }
