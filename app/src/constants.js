const TilesetOneExtruded = '/0x72_DungeonTilesetII_v1.3--extruded.png'
const TilesetOne = '/0x72_DungeonTilesetII_v1.3.png'
const TilesetTwo = '/16x16 dungeon ii wall reconfig v04 spritesheet.png'
const LevelOneTiledTileMap = '/LevelOne.json'
const EmotesStyleOne = '/emotes_pixel_style1.png'

export const FrameConfig16x16 = {
    frameWidth: 16,
    frameHeight: 16,
}

export const Orientation = {
    Down: 'down',
    Left: 'left',
    Right: 'right',
    Up: 'up',
}

export const SpriteSheets = {
    Dungeon: {
        key: 'DungeonSpriteSheet',
        url: TilesetOne,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
        }
    },

    EmotesStyleOne: {
        key: 'EmotesStyleOne',
        url: EmotesStyleOne,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 16,
            spacing: 0,
            margin: 0
        }
    },

    Characters: {
        key: 'Characters',
        url: TilesetOneExtruded,
        frameConfig: {
            frameWidth: 16,
            frameHeight: 32,
            spacing: 2,
            margin: 1
        }
    },

    TilesetTwo: {
        key: 'TilesetTwo',
        url: TilesetTwo,
        frameConfig: FrameConfig16x16
    }
}

export const Images = {
    DungeonTiles: {
        key: 'Dungeon',
        url: TilesetOne
    },
}

export const TiledTileMaps = {
    LevelOne: {
        key: 'LevelOneTiledMap',
        url: LevelOneTiledTileMap,
        tileset: Images.DungeonTiles.key,
        tileimage: Images.DungeonTiles.key,
    }
}

export const Animations = {
    PlayerWarriorMove: {
        key: 'PlayerWarriorMove',
        frameRate: 8,
        repeat: -1,
        padding: 1,
        frames: [ 76, 77, 78, 79, ],
        sheet: SpriteSheets.Characters.key,
    },

    PlayerWarriorIdle: {
        key: 'PlayerWarriorIdle',
        sheet: SpriteSheets.Characters.key,
        frames: [ 72, 73, 74, 75 ],
        margin: 1,
        frameRate: 4,
        repeat: -1
    },

    LootChestIdle: {
        key: 'LootChestIdle',
        sheet: SpriteSheets.Dungeon.key,
        frames: [ 595 ],
        repeat: -1,
        margin: 0,
        spacing: 0
    },

    LootChestFull: {
        key: 'LootChestIdle',
        sheet: SpriteSheets.Dungeon.key,
        frames: [ 627, 628, 629 ],
        repeat: 1,
        margin: 0,
        spacing: 0
    },

    LootChestEmpty: {
        key: 'LootChestIdle',
        sheet: SpriteSheets.Dungeon.key,
        frames: [ 595, 596, 597 ],
        repeat: 1,
        margin: 0,
        spacing: 0
    },

}