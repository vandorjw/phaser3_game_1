import * as Phaser from 'phaser';

export default class HeavyKnight extends Phaser.Physics.Arcade.Sprite {
    inputKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'characters', 'heavyknight_idle_1');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Set the size and position of the collision box
        this.setSize(16, 16);
        this.setOffset(8, 16);

        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
    }

    update(): void {
        this.anims.play('heavyknight_walk', true);
        const speed = 100;
        const velocity = new Phaser.Math.Vector2();

        const gameWidth = 960;  // Math.floor(parseInt(this.scene.sys.game.config.width, 10));
        const gameHeight = 1600;  // this.scene.sys.game.config.height;
        const mapCenterX = gameWidth / 2;

        velocity.y = 1;

        if(this.x > mapCenterX + 10) {
            velocity.x = -1;
        } else if (this.x < mapCenterX - 10) {
            velocity.x = 1;
        } else {
            velocity.x = 0;
        }

        if( this.y === gameHeight - 16) {
            velocity.y = 0;
        }

        // Normalize the player's velocity vector if moving diagonally
        if (velocity.x !== 0 && velocity.y !== 0) {
            velocity.normalize();
        } else if (velocity.x === 0 && velocity.y === 0) {
            this.anims.play('heavyknight_idle', true);
        }

        velocity.scale(speed);
        this.setVelocity(velocity.x, velocity.y);
    }
}
