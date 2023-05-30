import * as Phaser from 'phaser';
import Player from './player';
import HeavyKnight from "./units/heavyknight";

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
    player: Player;

    private heavy_knights: Phaser.Physics.Arcade.Sprite[];
    private layer1: Phaser.Tilemaps.TilemapLayer;
    private spawnTimer: Phaser.Time.TimerEvent;

    constructor() {
        super('MainScene');
        this.heavy_knights = [];
    }

    create() {
        // Add your game logic here
        // You can access the loaded assets using this.textures or this.cache
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('tileset', 'tiles', 32,32,0,0);
        const layer1 = map.createLayer('Tile Layer 1', tileset,0,0);
        this.layer1 = layer1;
        layer1.setCollisionByProperty({ collides: true });

        this.player = new Player(this, 160, 160, 'characters', 'townsfolk_f_idle_1');
        this.physics.add.collider(this.player, layer1);

        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // set zoom level
        camera.setZoom(2);


        // spawn timer for the heavy knights
        this.spawnTimer = this.time.addEvent({
          delay: 1000, // 1000 milliseconds = 1 second
          callback: this.spawnHeavyKnight,
          callbackScope: this,
          loop: true
        });
    }

    noop = () => {
        // No operation
    };

    update() {
        this.player.update();

        // Update heavy knights
        for (const heavyKnight of this.heavy_knights) {
            heavyKnight.update();
        }
    }

    spawnHeavyKnight() {
        const heavyKnight = new HeavyKnight(this, this.player.x, this.player.y);

        // add collider between player and heavy knight
        this.physics.add.collider(this.player, heavyKnight);

        // add collider between heavy knight and map
        this.physics.add.collider(heavyKnight, this.layer1);

        this.add.existing(heavyKnight);
        this.heavy_knights.push(heavyKnight);
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
