import { BaseScene } from './BaseScene'
import { TextButton } from '~/Objects/TextButton'
import { PlayerWarrior } from '~/Objects/PlayerWarrior'
import { LevelOneScene } from '~/Scenes/LevelOneScene'

export class MenuScene extends BaseScene {
    static key = 'Menu'

    constructor () {
        super({
            key: MenuScene.key
        })
        this.log('constructed')
    }

    create () {
        super.create()
        this.log('create')

        const { width, height } = this.cameras.main

        this.logo = new PlayerWarrior({
            scene: this,
            width: 16,
            height: 32,
            x: (width / 2) - 16,
            y: (height / 2) - 32
        })
        this.logo.sprite.setDisplaySize(
            this.logo.sprite.width * 8,
            this.logo.sprite.height * 4
        )

        this.startButton = new TextButton({
            scene: this,
            x: width / 2,
            y: height / 2,
            text: 'Start',
            style: { fill: '#ffffff' },
            onClick: this.handleStartButtonClick
        })
        this.add.existing(this.startButton)
    }

    update () {
        this.logo.meander()
    }

    handleStartButtonClick = () => {
        // this.logo.destroy()
        const scenes = [
            LevelOneScene.key,
        ]
        this.log('handleStartButtonClick', { scenes })
        scenes.forEach(key => this.scene.start(key))
        // this.scene.launch('Interface')
    }
}
