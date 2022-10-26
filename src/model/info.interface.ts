
export interface InfoInterface {
  show(gameState: GameState): void
}

export interface GameState {
  currentLevel: number,
  showStartMenu: boolean,
  showLevel: boolean,
  lives: number,
  isMusicOn: boolean,
  isGame: boolean,
  isGameOver: boolean,
  isRestart: boolean,
  isLevelChanged: boolean,
  message: string,
  score: number,
  lastScore: number,
  bestScore: number,
}
