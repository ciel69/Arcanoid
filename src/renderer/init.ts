import { Core } from "./Core";
import game_config from '../main/game_config'

setTimeout(() => {
  const NewGame = new Core(game_config.firstLevel, game_config.lives)

  window.addEventListener('load', function () {
    NewGame.start()
  })

  window.addEventListener('keydown', (e) => {
    NewGame.directionHandler.handleKeyPressed(e.key, true)
  })

  window.addEventListener('keyup', (e) => {
    NewGame.directionHandler.handleKeyPressed(e.key, false)
  })

// @ts-ignore
  window.Game = NewGame

})
