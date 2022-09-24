import { Core } from "./Core";

setTimeout(() => {
  const NewGame = new Core(1, 3)

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
