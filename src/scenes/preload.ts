import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
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

        // preload the map tileset image
        this.load.image('tiles', 'assets/images/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/images/map.json');

        // preload the character sprites
        this.load.atlas(
            'characters',
            'assets/images/characters.png',
            'assets/images/characters_atlas.json',
        );
        this.load.animation(
            'characters_anim',
            'assets/images/characters_anim.json',
        );
    }

    create() {
        // Transition to the main game scene or any other scene
        this.scene.start('MainScene');
    }
}