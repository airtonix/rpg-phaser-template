// import { HealthBar } from './HealthBar'
import { debounce } from 'lodash'
import { Orientation } from '~/constants'
import { Thing } from './Thing'
import { SpriteSheets } from '~/constants'

export class Actor extends Thing {

    constructor({ scene, key, ...props }) {
        super({
            key: `${key}.Actor`,
            scene,
            speed: 10,
            emotes: {
                width: 16,
                height: 16,
                sheet: SpriteSheets.EmotesStyleOne.key,
                frames: {
                    Helpful: 7,
                    Close: 23,
                    Exclamation: 22,
                    Star: 10,
                    Cash: 9
                }
            },
            ...props
        })
        this.addShadowSprite()

        this.prevVelocity = { x: 0, y: 0 }
        this.isIdle = false
        this.isMoving = false

    }

    handleHealthChanged = (obj, amount, health, maxHealth) => {
        if (!this.active) return

        super.handleHealthChanged(obj, amount, health, maxHealth)
        // this.healthbar.set(amount)
    }

    moveToLeft = () => {
        if (!this.active) return
        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToLeft', -speed, this.prevVelocity)
        this.body.setVelocityX(-speed)
    }

    animateLeft = () => {
        if (!this.active) return
        this.orientation = Orientation.Left
        const animation = this.getAnimation('moving', this.orientation)
        this.animate(animation)
    }

    moveToRight = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToRight', speed, this.prevVelocity)
        this.body.setVelocityX(speed)
    }

    animateRight = () => {
        if (!this.active) return
        this.orientation = Orientation.Right
        const animation = this.getAnimation('moving', this.orientation)
        this.animate(animation)
    }

    moveToDown = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToDown', speed, this.prevVelocity)
        this.body.setVelocityY(speed)
    }

    animateDown = () => {
        if (!this.active) return
        this.orientation = Orientation.Down
        const animation = this.getAnimation('moving', this.orientation)
        this.animate(animation)
    }

    moveToUp = () => {
        if (!this.active) return

        const {
            speed
        } = this.props
        // @ts-ignore
        this.log('moveToUp', speed, this.prevVelocity)
        this.body.setVelocityY(-speed)
    }

    animateUp = () => {
        if (!this.active) return
        this.orientation = Orientation.Up
        const animation = this.getAnimation('moving', this.orientation)
        this.animate(animation)
    }

    preMotion() {
        if (!this.active) return

        // @ts-ignore
        this.prevVelocity = this.body.velocity.clone()
        // Stop any previous movement from the last frame
        // @ts-ignore
        this.body.setVelocity(0)
    }

    postMotion() {
        if (!this.active) return
        const { x, y } = this.prevVelocity
        this.isIdle = (y === 0 && x === 0)

        if (this.isIdle) return

        // Normalize and scale the velocity so that sprite can't move faster along a diagonal
        // @ts-ignore
        this.body.velocity.normalize().scale(this.speed)
    }

    stop = () => {
        if (!this.active) return
        this.log('stop')
        this.idle()
    }

    idle = () => {
        if (!this.active) return
        this.log('idle')
        const animation = this.getAnimation('idle', this.orientation)
        this.animate(animation)
        this.isIdle = true
    }

    use = debounce(() => {
        console.log('use')
    }, 50)

}
