import { Game } from "./Game";

window.addEventListener('load', () => {
  const NewGame = new Game()
  NewGame.start()
})

// @ts-ignore
window.Game = Game
