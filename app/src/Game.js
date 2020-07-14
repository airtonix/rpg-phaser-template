import Phaser from 'phaser'
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles'

import { PreloaderScene } from './Scenes/PreloaderScene'
import { MenuScene } from './Scenes/MenuScene'
import { InterfaceScene } from './Scenes/InterfaceScene'
import { LevelOneScene } from './Scenes/LevelOneScene'

export class Game extends Phaser.Game {

    constructor() {
        // init game
        super({
            title: 'Maintainable Game',

            type: Phaser.AUTO,
            backgroundColor: '#000',

            parent: 'game_content',

            width: window.innerWidth,
            height: window.innerHeight,

            render: {
                // prevent tile bleeding
                antialiasGL: false,
                // prevent pixel art from becoming blurry when scaled
                pixelArt: true
            },

            scale: {
                zoom: 2
            },

            physics: {
                default: 'arcade',
                arcade: {
                    // debug: true,
                    gravity: { y: 0 }
                }
            },

            plugins: {
                scene: [
                    {
                        key: 'AnimatedTiles',
                        plugin: AnimatedTiles,
                        mapping: 'animatedTiles'
                    }
                ]
            },

            scene: [
                PreloaderScene,
                MenuScene,
                LevelOneScene,
                InterfaceScene,
            ]
        })
    }
}
