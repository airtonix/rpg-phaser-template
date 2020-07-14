import Phaser from 'phaser'
import { SpriteSheets } from '~/constants'

export class LogoSprite extends Phaser.GameObjects.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, SpriteSheets.Characters.key, 201)
        this.scene = scene
        this.setDisplaySize(32, 64)
        scene.add.existing(this)
    }
}