import Phaser from 'phaser'
import Health from 'phaser-component-health'

export class ActorUi extends Phaser.GameObjects.Container {

    create () {
        this.health = Health.AddTo(
            this,
            100,
            100)
    }
}