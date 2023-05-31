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

        // You can access the loaded assets using this.textures or this.cache
        this.map = this.make.tilemap({key: 'map'});
        const tileset = this.map.addTilesetImage('tileset', 'tiles', 32,32,0,0);
        const layer1 = this.map.createLayer('Tile Layer 1', tileset,0,0);
        this.layer1 = layer1;
        layer1.setCollisionByProperty({ collides: true });

        this.player = new Player(this, 160, 160, 'characters', 'townsfolk_f_idle_1');
        this.physics.add.collider(this.player, layer1);

        const camera = this.cameras.main;

        const cameraWidth = this.game.config.width as number;
        const cameraHeight = this.game.config.height as number;
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        camera.setViewport(0, 0, cameraWidth, cameraHeight);
        // set zoom level
        camera.setZoom(2);

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            // scroll camera up when mouse is at the top of the screen
            if (pointer.y < camera.height/4) {
                camera.scrollY -= 4;
            } else if (pointer.y > (camera.height*3/4)) {
                camera.scrollY += 4;
            }
            // scroll camera left when mouse is at the left of the screen and right when right of the screen
            if (pointer.x < camera.width/4) {
                camera.scrollX -= 4;
            } else if (pointer.x > camera.width*3/4){
                camera.scrollX += 4;
            }
        });

        // when pressing the spacebar, center the camera on the player sprite
        this.input.keyboard.on('keydown-SPACE', () => {
            camera.centerOn(this.player.x, this.player.y);
        });


        // spawn heavy knights when pressing the 'k' key
        this.input.keyboard.on('keydown-K', () => {
            this.spawnHeavyKnight();
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