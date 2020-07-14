import Phaser from 'phaser'

export class TextButton extends Phaser.GameObjects.Text {
    constructor(props) {
        const {
            scene,
            x,
            y,
            text,
            style,
        } = props
        super(scene, x, y, text, style)
        this.props = props

        this.setInteractive({ useHandCursor: true })
            .on('pointerover', this.handlePointerOver)
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.enterButtonActiveState() )
            .on('pointerup', this.handlePointerUp)


    }

    handlePointerUp () {
        const {
            onClick
        } = this.props

        if (typeof onClick === 'function') {
            onClick()
        }

        this.enterButtonHoverState()
    }

    handlePointerOver () {
        const {
            onHover
        } = this.props

        if (typeof onHover === 'function') {
            onHover()
        }
        this.enterButtonHoverState()
    }

    enterButtonHoverState() {
        this.setStyle({ fill: '#ff0'})
    }

    enterButtonRestState() {
        this.setStyle({ fill: '#0f0'})
    }

    enterButtonActiveState() {
        this.setStyle({ fill: '#0ff' })
    }
}