import GameState from '../types/GameState'

export default class GameInfo {
  gameState: GameState

  constructor(gameState: GameState) {
    this.gameState = gameState
  }

  show(): void {
    const level = document.getElementById('level') as HTMLElement
    const lives = document.getElementById('lives') as HTMLElement
    const message = document.getElementById('message') as HTMLElement
    const score = document.getElementById('score') as HTMLElement
    const bestScore = document.getElementById('bestScore') as HTMLElement

    level.innerText = `${this.gameState.currentLevel + 1}`
    lives.innerText = `${this.gameState.lives}`
    message.innerText = `${this.gameState.message}`
    score.innerText = `${this.gameState.score}`
    bestScore.innerText = `${this.gameState.bestScore}`
  }
}