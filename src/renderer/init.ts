import { Game } from "./Game";

setTimeout(() => {
  const NewGame = new Game()

  window.addEventListener('load', function () {
    NewGame.start()
  })

  window.addEventListener('keydown', (e) => {
    NewGame.handleKeyPressed(e.key)
  })

// @ts-ignore
  window.Game = NewGame

})
