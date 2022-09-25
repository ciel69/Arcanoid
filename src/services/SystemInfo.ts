import Ball from '../game_elements/Ball'
import GameState from '../types/GameState'
import RenderState from '../types/RenderState'
import Rules from '../main/game_config'

export default class SystemInfo {
  ctx: CanvasRenderingContext2D | null
  ball: Ball
  gameState: GameState
  renderState: RenderState

  constructor(
      ctx: CanvasRenderingContext2D | null,
      ball: Ball,
      gameState: GameState,
      renderState: RenderState,
  ) {
    this.ctx = ctx
    this.ball = ball
    this.gameState = gameState
    this.renderState = renderState
  }

  public show(): void {
    this.ctx!.font = "12px sans-serif"
    this.ctx!.fillStyle = 'green'
    this.ctx!.fillText(`ball xVelocity: ${this.ball.xVelocity}`, 10, 20)
    this.ctx!.fillText(`ball yVelocity: ${this.ball.yVelocity}`, 10, 40)
    this.ctx!.fillText(`lives: ${this.gameState.lives}`, 10, 60)
    this.ctx!.fillText(`level: ${this.gameState.currentLevel}`, 10, 80)
    this.ctx!.fillText(`frames: ${this.renderState.frame}`, 10, 100)
    this.ctx!.fillText(`window.performance.now(): ${window.performance.now()}`, 10, 120)
    this.ctx!.fillText(`fps: ${this.renderState.currentFps}`, 10, 140)
    this.ctx!.fillText(`timeStatistics: ${this.renderState.timeStat}`, 10, 160)
    this.ctx!.fillText(`godMode: ${Rules.godMode}`, 10, 180)
    this.ctx!.fillText(`music: ${Rules.music}`, 10, 200)
    this.ctx!.fillText(`sound: ${Rules.sound}`, 10, 220)
    this.ctx!.fillText(`lastScore: ${this.gameState.lastScore}`, 10, 240)
    this.ctx!.fillText(`bestScore: ${this.gameState.bestScore}`, 10, 260)
    this.ctx!.fillText(`score: ${this.gameState.score}`, 10, 280)
  }
}