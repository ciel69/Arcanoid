import { Game } from "./Game";

setTimeout(() => {
  const NewGame = new Game(3)

  window.addEventListener('load', function () {
    NewGame.start()
  })

  window.addEventListener('keydown', (e) => {
    NewGame.handleKeyPressed(e.key)
  })

// @ts-ignore
  window.Game = NewGame

})
