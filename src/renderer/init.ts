import { Game } from "./Game";

setTimeout(() => {
  const NewGame = new Game(3)

  window.addEventListener('load', function () {
    NewGame.start()
  })

  window.addEventListener('keydown', (e) => {
    NewGame.handleKeyPressed(e.key, true)
  })

  window.addEventListener('keyup', (e) => {
    NewGame.handleKeyPressed(e.key, false)
  })

// @ts-ignore
  window.Game = NewGame

})
