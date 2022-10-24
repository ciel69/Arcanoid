import {BallInterface} from '../types/ball.interface';

export default interface GameState {
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
  ball?: BallInterface
}
