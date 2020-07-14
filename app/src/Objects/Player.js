import { Actor } from './Actor'

export class Player extends Actor {

    constructor(props) {
        super({
            ...props,
            key: `${props.key}.Player`,
            health: {
                min: 100,
                max: 100,
                regen: 4
            },

        })
        this.idle()
    }

    update (time, delta, keys) {
        super.update(time, delta)

        this.isMoving = keys.left.isDown
            || keys.right.isDown
            || keys.down.isDown
            || keys.up.isDown

        this.preMotion()

        // Horizontal movement
        if (keys.left.isDown) {
            this.animateLeft()
            this.moveToLeft()
        }
        else if (keys.right.isDown) {
            this.moveToRight()
            this.animateRight()
        }

        // Vertical movement
        if (keys.up.isDown) {
            this.moveToUp()
            this.animateUp()
        }
        else if (keys.down.isDown) {
            this.moveToDown()
            this.animateDown()
        }

        if (keys.use.isDown) {
            this.use()
        }

        this.postMotion()

        if (!this.isMoving && !this.isIdle) {
            this.idle()
        }
    }

}
