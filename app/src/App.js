/* global module */
import {Game} from './Game'

let game

function newGame () {
    if (game) return
    game = new Game()
}

function destroyGame () {
    if (!game) return
    game.destroy(true)
    game.runDestroy()
    game = null
}

if (module.hot) {
    module.hot.dispose(destroyGame)
    module.hot.accept(newGame)
}

if (!game) newGame()