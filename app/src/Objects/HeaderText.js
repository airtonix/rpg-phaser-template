import Phaser from 'phaser'

export class HeaderText extends Phaser.GameObjects.Text {
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
    }
}