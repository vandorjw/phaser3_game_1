import * as Phaser from 'phaser';
import Player from './player';

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

        // load character sprites
        Player.preload(this);
    }

    create() {
        // Transition to the main game scene or any other scene
        this.scene.start('MainScene');
    }
}

// Define your main game scene
class MainScene extends Phaser.Scene {
    inputkeys;
    player;

    constructor() {
        super('MainScene');
    }

    create() {
        // Add your game logic here
        // You can access the loaded assets using this.textures or this.cache
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tileset', 'tiles', 32,32,0,0);
        const layer1 = map.createLayer('Tile Layer 1', tileset,0,0);
        layer1.setCollisionByProperty({ collides: true });

        this.player = new Player(this, 160, 160, 'characters', 'townsfolk_f_idle_1');
        this.physics.add.collider(this.player, layer1);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // set zoom level
        camera.setZoom(2);
    }

    update() {
        this.player.update();
    }
}

// Create the Phaser game configuration
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    width: 960,
    height: 1600,
    scale: {
        mode: Phaser.Scale.FIT,
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
