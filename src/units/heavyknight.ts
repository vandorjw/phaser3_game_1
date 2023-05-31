import * as Phaser from 'phaser';
import MainScene from '../scenes/main';

export default class HeavyKnight extends Phaser.Physics.Arcade.Sprite {
    scene: MainScene;
    mapDimensions: { width: number; height: number };

    private mapWidth: number;
    private mapHeight: number;
    private mapVerticalCenter: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'characters', 'heavyknight_idle_1');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Set the size and position of the collision box
        this.setSize(16, 16);
        this.setOffset(8, 16);

        // this.setCollideWorldBounds(true);
        this.setBounce(0.2);

        this.mapDimensions = this.scene.getMapSize();
        this.mapWidth = this.mapDimensions.width;
        this.mapHeight = this.mapDimensions.height;
        this.mapVerticalCenter = this.mapWidth / 2;
    }

    update(): void {

        const speed = 50;
        const velocity = new Phaser.Math.Vector2();

        if(this.x > this.mapVerticalCenter + 10) {
            velocity.x = -1;
        } else if (this.x < this.mapVerticalCenter - 10) {
            velocity.x = 1;
        } else {
            velocity.x = 0;
        }

        if( this.y >= (this.mapHeight - 50)) {
            velocity.y = 0;
        } else {
            velocity.y = 1;
        }

        // Normalize the player's velocity vector if moving diagonally
        velocity.normalize();

        // scale it to the speed
        velocity.scale(speed);

        if (velocity.x !== 0 && velocity.y !== 0) {
            this.anims.play('heavyknight_walk', true);
        } else if (velocity.x === 0 && velocity.y === 0) {
            this.anims.startAnimation('heavyknight_idle');
        }

        this.setVelocity(velocity.x, velocity.y);

    }
}
