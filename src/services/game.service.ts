import {GameInterface, GameState} from '../model/game.interface';

export default class GameService implements GameInterface {

  constructor(
  ) {
  }

  show(gameState: GameState): void {
    const level = document.getElementById('level') as HTMLElement
    const lives = document.getElementById('lives') as HTMLElement
    const message = document.getElementById('message') as HTMLElement
    const score = document.getElementById('score') as HTMLElement
    const bestScore = document.getElementById('bestScore') as HTMLElement

    level.innerText = `${gameState.currentLevel + 1}`
    lives.innerText = `${gameState.lives}`
    message.innerText = `${gameState.message}`
    score.innerText = `${gameState.score}`
    bestScore.innerText = `${gameState.bestScore}`
  }


}
