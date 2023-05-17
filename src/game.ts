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

        // load character sprites
        this.load.atlas(
            'characters',
            'assets/images/characters.png',
            'assets/images/characters_atlas.json',
        );
        this.load.animation('characters_anim', 'assets/images/characters_anim.json',)
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

        this.player = new Phaser.Physics.Arcade.Sprite(this, 0, 0, 'characters', 'townsfolk_f_idle_1');
        this.physics.add.existing(this.player);
        this.add.existing(this.player);

        this.inputkeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Enable world bounds collision for the player sprite
        this.player.setCollideWorldBounds(true);
    }

    update() {
        this.player.anims.play('townsfolk_walk', true);
        const speed = 100;
        let playerVelocity = new Phaser.Math.Vector2();
        if(this.inputkeys.left.isDown ){
            playerVelocity.x = -1;
        } else if ( this.inputkeys.right.isDown ) {
            playerVelocity.x = 1;
        }

        if(this.inputkeys.up.isDown ){
            playerVelocity.y = -1;
        } else if ( this.inputkeys.down.isDown ) {
            playerVelocity.y = 1;
        }
        playerVelocity.scale(speed);
        this.player.setVelocity(playerVelocity.x, playerVelocity.y);

    }
}

// Create the Phaser game configuration
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#333333',
    width: 640,
    height: 640,
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
