import { BaseScene } from './BaseScene'
import { ActorUi } from '~/Objects/ActorUi'

export class InterfaceScene extends BaseScene {
    constructor () {
        super({ key: 'Interface' })
    }

    create () {
        // Help text that has a "fixed" position on the screen
    }

    createActorUi () {
        this.player = new ActorUi(this, 0, 0)
    }
}