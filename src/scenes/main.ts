import * as Phaser from "phaser";
import Player from "../player";
import HeavyKnight from "../units/heavyknight";

export default class MainScene extends Phaser.Scene {
    player: Player;

    private heavy_knights: Phaser.Physics.Arcade.Sprite[];
    private map: Phaser.Tilemaps.Tilemap;
    private layer1: Phaser.Tilemaps.TilemapLayer;

    constructor() {
        super('MainScene');
        this.heavy_knights = [];
    }

    create() {

        // by default, there is only 1 pointer input.
        // we need to enable multi-touch input, so we add a pointer
        this.input.addPointer(1);


        // You can access the loaded assets using this.textures or this.cache
        this.map = this.make.tilemap({key: 'map'});
        const tileset = this.map.addTilesetImage('tileset', 'tiles', 32,32,0,0);
        this.layer1 = this.map.createLayer('Tile Layer 1', tileset,0,0);
        this.layer1.setCollisionByProperty({ collides: true });

        const camera = this.cameras.main;

        const cameraWidth = this.game.config.width as number;
        const cameraHeight = this.game.config.height as number;
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setViewport(0, 0, cameraWidth, cameraHeight);

        // set zoom level
        camera.setZoom(2);

        this.player = new Player(this, 160, 160, 'characters', 'townsfolk_f_idle_1');
        this.player.create();
        this.physics.add.collider(this.player, this.layer1);

        // set camera to follow player
        camera.startFollow(this.player);


        // spawn heavy knights when touching the player
        this.input.on('pointerdown', () => {
            // if the distance between the player and the pointer is less than 150
            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.input.activePointer.x, this.input.activePointer.y) < 20) {
                this.spawnHeavyKnight();
            }
        });

    }

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

    getMapSize(): { width: number; height: number } {
    return {
      width: this.map.widthInPixels,
      height: this.map.heightInPixels,
    };
  }
}