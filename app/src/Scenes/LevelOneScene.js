import { MapScene } from './MapScene'
import { TiledTileMaps } from '~/constants'

export class LevelOneScene extends MapScene {
    static key = 'LevelOne'

    constructor () {
        super({
            key: LevelOneScene.key,
            data: {
                ...TiledTileMaps.LevelOne,
                layers: [
                    { key: 'Ground' },
                    { key: 'Objects' },
                    { key: 'Walls' },
                    { key: 'Overhead' },
                    { key: 'Obstacles' },
                ]
            },
        })
        this.log('constructed')
    }
}
