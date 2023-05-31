import * as Phaser from 'phaser';
import MainScene from "./scenes/main";
import PreloadScene from "./scenes/preload";


// Create the Phaser game configuration
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    // our game should be the size of the browser
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        // we place it in the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // Our game will be responsive
        mode: Phaser.Scale.FIT,
        parent: 'game',

    },
    scene: [PreloadScene, MainScene],
    physics: {
        default: 'arcade',
        arcade: {
          debug: true
        }
      },
};

// Instantiate the Phaser game
const game = new Phaser.Game(config);
