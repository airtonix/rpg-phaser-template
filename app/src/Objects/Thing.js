import { BehaviourTree } from 'mistreevous'
import Health from 'phaser-component-health'
import Phaser from 'phaser'
import debug from 'debug'
import { throttle } from 'lodash'
import { get } from 'lodash'

import { OutlinePipeline } from '~/Shaders/OutlinePipeline'
import { Orientation, SpriteSheets } from '~/constants'

export class Thing extends Phaser.GameObjects.Container {
    orientation = Orientation.Down
    behaviour = null
    animations = null

    constructor(props) {
        super(props.scene, props.x, props.y)
        const {
            key = 'Unknown',
            x = 0,
            y = 0,
            scene,
            speed = 0,
            footprintHeight = 16,
            footprintWidth = 24,
        } = props
        if (!scene) throw Error(`[${key}] requires a scene`)

        this.props = props
        this.scene = scene
        this.key = key
        this.x = x
        this.y = y
        this.speed = speed

        this.log = debug(key)

        this.setX(x)
        this.setY(y)
        this.setSize(footprintWidth, footprintHeight)

        this.sprite = this.addSprite()
        this.emote = this.addEmoteSprite()
        this.health = this.createHealthManager()

        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)
        this.scene.physics.world.enable(this)

        this.log('constructed')
    }

    createHealthManager () {
        const {
            health: {
                min = 0,
                max = 100,
                regen = 5,
                invincible = false
            } = {}
        } = this.props

        if (invincible) return

        const healthManager = Health.AddTo(
            this,
            min,
            max)

        this.on('die', this.handleDeath)
        this.on('revive', this.handleRevived)
        this.on('healthchange', this.handleHealthChanged)
        this.on('heal', this.handleRecieveHealing)
        this.on('damage', this.handleRecieveDamage)

        return healthManager
    }

    stepBehaviour = throttle(() => {
        if (!this.behaviour) return

        if (!(this.behaviour instanceof BehaviourTree)) {
            this.log('behaviour is not a BehaviourTree')
            return
        }
        this.log('behaviour.step')
        this.behaviour.step()
    }, 200)

    setBehaviour (behaviourName) {
        this.log('setBehaviour', behaviourName)
        const {
            behaviours = {}
        } = this.props
        const behaviour = get(behaviours, behaviourName, {})
        this.behaviour = new BehaviourTree(behaviour, this)
        this.behaviour.step()
    }

    addSprite() {
        const sprite = this.createSprite()
        this.add(sprite)
        return sprite
    }

    /**
     * https://medium.com/@ionejunhong/sprite-outline-with-phaser-3-9c17190b04bc
     */
    outlineSprite (sprite) {
        sprite.setPipeline(OutlinePipeline.KEY)
        sprite.pipeline.setFloat2(
            'uTextureSize',
            sprite.texture.getSourceImage().width,
            sprite.texture.getSourceImage().height
        )
    }
    createSprite () {
        const {
            width, height,
            animations: {
                idle = {}
            } = {}
        } = this.props
        this.log('createSprite', { width, height, idle })

        const animation = idle[this.orientation] || idle.default
        const { sheet } = animation.anim
        const frame = animation.anim.frames[0]

        const sprite = this.scene.make.sprite(0, 0, sheet, frame)//new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame)
        sprite.setTexture(sheet)
        sprite.setFrame(frame)
        sprite.setSize(width, height)
        sprite.setOrigin(0.5, 0.9)

        return sprite
    }

    addShadowSprite(color = 0x000000) {
        const sprite = this.createShadowSprite(color)
        this.add(sprite)
        this.moveUp(sprite)
        return sprite
    }

    createShadowSprite(color = 0x000000) {
        const {
            width,
        } = this.props
        const shadow = this.scene.add.graphics()
        const ellipse = new Phaser.Geom.Ellipse(0, 3, width / 1.5, 4)
        shadow.fillStyle(color, 0.4)
        shadow.fillEllipseShape(ellipse)
        return shadow
    }

    addEmoteSprite () {
        const { emotes } = this.props
        if (!emotes) return

        const sprite = this.createEmoteSprite()
        sprite.setVisible(false)
        this.add(sprite)
        return sprite
    }

    createEmoteSprite () {
        const {
            emotes: {
                width = 16,
                height = 16,
                sheet = SpriteSheets.EmotesStyleOne.key,
            } = {}
        } = this.props
        this.log('createEmoteSprite')

        const sprite = this.scene.make.sprite(0, 0, sheet)//new Phaser.GameObjects.Sprite(this.scene, 0, 0, key, frame)
        sprite.setTexture(sheet)
        sprite.setSize(width, height)
        sprite.setOrigin(0.5, 2)
        return sprite
    }

    showEmoteFrame (frame) {
        this.log('showEmoteFrame', frame)
        this.emote.setFrame(frame)
        this.emote.setVisible(true)
    }

    handleDeath () {
        if(!this.active) return
        const {
            animations: { death }
        } = this.props
        this.log('handleDeath')
        const sprite = this.sprite

        sprite
            .setActive(false)
            .setVisible(false)

        this.animate(death)
    }

    handleRevived () {
        if(!this.active) return
        const {
            animations: { revive }
        } = this.props
        this.log('handleRevived')
        const sprite = this.sprite

        sprite.setActive(true)
        sprite.setVisible(true)

        this.animate(revive)
    }

    handleHealthChanged (obj, amount, health, maxHealth) {
        if(!this.active) return

        this.log('handleHealthChange', { amount, health, maxHealth })
    }

    handleRecieveHealing () {
        if(!this.active) return

        this.log('handleRecieveHealing')
    }

    handleRecieveDamage () {
        if(!this.active) return
        const {
            animations: { damaged }
        } = this.props
        this.log('handleRecieveDamage')
        this.animate(damaged)
    }

    getAnimation (action, variant) {
        const {
            animations = null
        } = this.props
        if (!animations) return

        return get(
            animations, [action, variant],
            get(animations, [ action, 'default' ], {})
        )
    }

    animate (animation) {
        if(!this.active) return
        const sprite = this.sprite
        if (!animation || !sprite) return

        const { flip, anim } = animation

        if (typeof flip !== 'undefined') {
            this.log('animate.flip', flip)
            sprite.setFlip(flip, false)
        }

        if (anim) {
            this.log('animate.play', anim )
            const { key } = anim
            sprite.play(key, true, 0)
        }
    }

    destroy = () => {
        this.log('destroy')
        this.setActive(false)
        const sprite = this.sprite
        sprite.destroy()
    }

    update (time, delta) {
        this.stepBehaviour()
    }
}
