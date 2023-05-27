import * as Phaser from 'phaser';

class Towncenter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'towncenter');
    }

    static preload(scene) {
        scene.load.image('towncenter', 'assets/images/towncenter.png');
    }
}