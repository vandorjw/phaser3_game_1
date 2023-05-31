import * as Phaser from 'phaser';
import MainScene from "./scenes/main";
import PreloadScene from "./scenes/preload";


// Create the Phaser game configuration
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    width: 800,
    height: 600,
    scale: {
        // we place it in the middle of the page.
        autoCenter: Phaser.Scale.CENTER_BOTH
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
