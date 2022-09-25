export default interface GameState {
  currentLevel: number,
  showStartMenu: boolean,
  showLevel: boolean,
  lives: number,
  isMusicOn: boolean,
  isGameOver: boolean,
  isRestart: boolean,
  isLevelChanged: boolean,
  message: string,
  score: number,
  lastScore: number,
  bestScore: number,
}