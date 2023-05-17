import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    inputKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        this.inputKeys = this.scene.input.keyboard.createCursorKeys();
        this.setCollideWorldBounds(true);
    }

    static preload(scene: Phaser.Scene) {
        scene.load.atlas(
            'characters',
            'assets/images/characters.png',
            'assets/images/characters_atlas.json',
        );
        scene.load.animation(
            'characters_anim',
            'assets/images/characters_anim.json',
        );
    }

    update(): void {
        this.anims.play('townsfolk_walk', true);
        const speed = 100;
        const playerVelocity = new Phaser.Math.Vector2();

        if (this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }

        if (this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }

        // Normalize the player's velocity vector if moving diagonally
        if (playerVelocity.x !== 0 && playerVelocity.y !== 0) {
            playerVelocity.normalize();
        } else if (playerVelocity.x === 0 && playerVelocity.y === 0) {
            this.anims.play('townsfolk_idle', true);
        }

        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);
    }
}
