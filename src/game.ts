import * as Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Display a loading message
        const loadingText = this.add.text(256, 256, 'Loading...', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
        });
        loadingText.setOrigin(0.5);
        
        // Preload your game assets here
        // For example, load an image
        this.load.image('tiles', 'assets/images/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');
    }

    create() {
        // Transition to the main game scene or any other scene
        this.scene.start('MainScene');
    }
}

// Define your main game scene
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        // Add your game logic here
        // You can access the loaded assets using this.textures or this.cache
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tileset', 'tiles', 32,32,0,0);
        const layer1 = map.createLayer('Tile Layer 1', tileset,0,0);
    }
}

// Create the Phaser game configuration
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    width: 640,
    height: 640,
    scale: {
        zoom: 1
    },
    scene: [PreloadScene, MainScene],
};

// Instantiate the Phaser game
const game = new Phaser.Game(config);
