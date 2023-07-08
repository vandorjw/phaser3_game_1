import * as Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    inputKeys: Phaser.Types.Input.Keyboard.CursorKeys;
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string | number) {
        super(scene, x, y, texture, frame);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);

        // Set the size and position of the collision box
        this.setSize(16, 16);
        this.setOffset(8, 16);

        
        // this.setCollideWorldBounds(true);
        this.setBounce(0.2);
    }

    create(): void {

        // event listener for pointer down
        this.scene.input.on(Phaser.Input.Events.POINTER_UP, (pointer: Phaser.Input.Pointer) => {
            console.log('Player detected pointerup event');
            const { worldX, worldY } = pointer
            this.scene.physics.moveToObject(this, pointer, 100);
        }, this);

    }

    update(): void {

        // if(this.scene.input.pointer1.isDown) {
        //     this.scene.physics.moveToObject(this, this.scene.input.pointer1, 100);
        // }

        // player animation when walking
        this.anims.play('townsfolk_walk', true);
        const speed = 100;



    }
}
