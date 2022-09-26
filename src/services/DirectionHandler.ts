import Platform from '../game_elements/Platform'
import Direction from '../types/Direction'
import Ball from '../game_elements/Ball'
import Rules from '../main/game_config'
import sound from './Sound'
import GameState from '../types/GameState'
import game_config from '../main/game_config'

export default class DirectionHandler {
  private ball: Ball
  private gameState: GameState
  private platform: Platform
  private direction: Direction

  constructor(
      ball: Ball,
      gameState: GameState,
      platform: Platform,
      direction: Direction,
  ) {
    this.ball = ball
    this.gameState = gameState
    this.platform = platform
    this.direction = direction
  }

  public control(): void {
    if (this.direction.arrowsState.ArrowLeft) {
      this.platform.move(0)
      /** Если мячик не в полёте - он движется вместе с платформой */
      if (!this.ball.isFlying) {
        this.ball.x = this.platform.x + this.platform.width / 2
      }
      this.direction.platformDirection = 'left'
    }

    if (this.direction.arrowsState.ArrowRight) {
      this.platform.move(1)
      /** Если мячик не в полёте - он движется вместе с платформой */
      if (!this.ball.isFlying) {
        this.ball.x = this.platform.x + this.platform.width / 2
      }
      this.direction.platformDirection = 'right'
    }

    if (this.direction.arrowsState.ArrowUp) {
      if (!this.ball.isFlying) {
        if (this.direction.platformDirection === 'right') {
          this.ball.xVelocity = -4
          this.ball.rotateSpeed = 6
        } else {
          this.ball.xVelocity = 4
          this.ball.rotateSpeed = -6
        }
      }
      this.ball.isFlying = true
      this.ball.fly()
    }
  }

  /** Обработка нажатий на клавиатуру */
  public handleKeyPressed(key: string, status: boolean): void {
    /** "Медленные нажатия, с задержкой" */
    if (key === ' ') {
      this.keyWithDelayPressed(key)
    }

    if (key === 'i') {
      this.keyWithDelayPressed(key)
    }

    if (key === 'g') {
      this.keyWithDelayPressed(key)
    }

    if (key === 's') {
      this.keyWithDelayPressed(key)
    }

    if (key === 'm') {
      this.keyWithDelayPressed(key)
    }

    /** Нажатия без задержки - для управления платформой */
    if (!this.gameState.showStartMenu && !this.gameState.isGameOver) {
      if (key === 'ArrowUp') {
        /** Если шарик в полёте - блокируем стрелку вверх */
        this.direction.arrowsState.ArrowUp = this.ball.isFlying ? false : status
      }

      if (key === 'ArrowLeft') {
        this.direction.arrowsState.ArrowLeft = status
      }

      if (key === 'ArrowRight') {
        this.direction.arrowsState.ArrowRight = status
      }
    }
  }

  /** Обработка нажатия на клавиши с задержкой */
  public keyWithDelayPressed(key: string): void {
    /** Задаём задержку */
    if (!this.direction.keyDelayStatus.delayInProgress[key] && !this.direction.keyDelayStatus.keyDelay[key]) {
      this.direction.keyDelayStatus.delayInProgress[key] = true
      setTimeout(() => {
        this.direction.keyDelayStatus.delayInProgress[key] = false
        this.direction.keyDelayStatus.keyDelay[key] = false
      }, game_config.keyPressDelay)
    }

    /** Обработка нажатия на конкретные клавиши */
    if (!this.direction.keyDelayStatus.keyDelay[key]) {
      switch (key) {
        case ('i'):
          Rules.systemInfo = !Rules.systemInfo;
          break
        case ('g'):
          Rules.godMode = !Rules.godMode;
          break
        case ('s'):
          Rules.sound = !Rules.sound;
          break
        case ('m'):
          Rules.music = !Rules.music;
          break
        case (' '):
          this.spacePressed();
          break
      }
      this.direction.keyDelayStatus.keyDelay[key] = true
    }
  }

  public spacePressed(): void {
    /** Если пробел нажат в главном меню */
    if (this.gameState.showStartMenu) {
      sound.track1.stop()
      this.gameState.isMusicOn = false
      this.gameState.isGame = true
      this.gameState.showStartMenu = false
    }

    /** Если пробле нажат, когда игра закончилась */
    if (this.gameState.isGameOver) {
      this.gameState.isMusicOn = false
      this.gameState.showStartMenu = true
      this.gameState.isGameOver = false
      this.gameState.showLevel = true
      this.gameState.isRestart = true
    }
  }
}