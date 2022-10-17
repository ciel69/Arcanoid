import ball from '../assets/images/ball.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platformG96.png'

import levels from '../data/levels'
import messages from '../data/messages'

import rules from '../main/game_config'
import game_config from '../main/game_config'

import Ball from '../game_elements/Ball'
import Brick from '../game_elements/Brick'
import Platform from '../game_elements/Platform'

import {Direction} from '../types/Direction'
import GameState from '../types/GameState'
import RenderState from '../types/RenderState'
import Sprites from '../types/Sprites'

import DirectionHandler from '../services/DirectionHandler'
import Music from '../services/Music'
import SystemInfo from '../services/SystemInfo'
import GameInfo from '../services/GameInfo'

export class Core {
  /** Создаём холст */
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')
  width = 960
  height = 600

  /** Управление */
  direction: Direction = {
    arrowsState: {
      ArrowUp: false,
      ArrowLeft: false,
      ArrowRight: false,
    },
    platformDirection: 'right',
    keyDelayStatus: {
      keyDelay: {
        ' ': false,
        s: false,
      },
      delayInProgress: {
        ' ': false,
        s: false,
      },
    },
  }

  /** Элементы игры */
  sprites: Sprites
  bricks: Brick[] = []
  platform: Platform
  ball: Ball

  /** Игровое состояние */
  gameState: GameState = {
    currentLevel: 0,
    showStartMenu: true,
    showLevel: true,
    lives: 0,
    score: 0,
    lastScore: 0,
    bestScore: 0,
    isMusicOn: false,
    isGameOver: false,
    isGame: false,
    isRestart: false,
    isLevelChanged: false,
    message: '',
  }

  /** Render state */
  renderState: RenderState = {
    frame: 0,
    frameCount: 0,
    timeStat: '',
    fps: 60,
    fpsInterval: 0,
    startTime: 0,
    sinceStart: 0,
    now: 0,
    then: 0,
    elapsed: 0,
    currentFps: 0,
  }

  /** Сервисы */
  directionHandler
  gameInfo
  musicHandler
  systemInfoRender

  constructor(
      level: number,
      lives: number,
  ) {
    /** Создаём игровые элементы */
    this.sprites = {
      bg: new Image(),
      ball: new Image(),
      brick: new Image(),
      platform: new Image(),
    }

    this.gameState.currentLevel = level
    this.gameState.lives = lives
    this.platform = new Platform()
    this.ball = new Ball(
        480,
        537,
        0,
        this.bricks,
        this.platform,
        this.ctx,
        this.sprites,
        this.gameState
    )
    this.musicHandler = new Music(this.gameState)
    this.directionHandler = new DirectionHandler(
        this.ball,
        this.gameState,
        this.platform,
        this.direction,
        )
    this.systemInfoRender = new SystemInfo(
        this.ctx,
        this.ball,
        this.gameState,
        this.renderState,
    )
    this.gameInfo = new GameInfo(this.gameState)
  }

  /** Отрисовка игрового состояния */
  render() {
    this.renderState.frame += 1

    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)
    this.gameState.showLevel && this.levelRender()

    if (this.gameState.showStartMenu) {
      this.shadowScreen()
      this.gameState.message = messages.start
    }

    if (this.gameState.isGame) {
      this.gameState.message = messages.game
    }

    if (!game_config.music) {
      this.musicHandler.off()
    }

    /** Смена уровня */
    if (!this.gameState.showStartMenu && this.gameState.showLevel) {
      this.gameState.isLevelChanged = this.checkIsAllBricksInvisible()
    }
    if (this.gameState.isLevelChanged) {
      /** Если уровень можно увеличить на единицу - увеличиваем, */
      /**  иначе возвращаемся к самому первому */
      this.gameState.currentLevel =
          levels[this.gameState.currentLevel + 1]
              ? this.gameState.currentLevel + 1
              : 0
      this.ball.resetBall()
      this.createLevel(this.gameState.currentLevel)
      this.gameState.isLevelChanged = false
    }

    /** Закончились жизни */
    if (this.gameState.lives === 0 && this.gameState.showLevel && !this.gameState.showStartMenu) {
      this.shadowScreen()
      this.gameOverHandler()
      this.gameState.lastScore = this.gameState.score
      if (this.gameState.score > this.gameState.bestScore) {
        this.gameState.bestScore = this.gameState.score
      }
    }

    /** Перезапуск игры */
    if (this.gameState.isRestart) {
      this.gameState.isRestart = false
      this.gameState.lives = rules.lives
      this.gameState.score = 0
      this.restart()
    }

    rules.systemInfo && this.systemInfoRender.show()
    rules.music && this.musicHandler.on()

    this.gameInfo.show()
  }

  /** Вернёт true, если все кирпичики на уровне невидимы */
  checkIsAllBricksInvisible(): boolean {
    return !this.bricks.find(brick => brick.visible)
  }

  /** Создание уровня */
  createLevel(level: number): void {
    this.bricks.length = 0
    levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.bricks.push(
              new Brick(
                  elIndex * 64, rowIndex * 32, 64, 32, true,
              ),
          )
        }
      })
    })
  }


  /** Загрузка спрайтов */
  load() {
    this.sprites.ball.src = ball
    this.sprites.brick.src = brick
    this.sprites.platform.src = platform
  }

  /** Первый запуск, загружаем элементы и запускаем анимацию */
  start() {
    this.load()
    this.createLevel(this.gameState.currentLevel)
    this.startAnimating(this.renderState.fps)
  }

  /** Запуск новой игры */
  restart() {
    this.createLevel(game_config.firstLevel)
    this.run()
  }

  /** Запуск анимации с установокой заданного fps */
  startAnimating(fps: number): void {
    this.renderState.fpsInterval = 1000 / fps;
    this.renderState.then = Date.now()
    this.renderState.startTime = this.renderState.then;
    this.run();
  }

  run(): void {
    /** Перерисовка канваса.
     * Тут много магии, цель которой зафиксировать фпс,
     * чтобы темп игры не зависел от скорости работы браузера */
    window.requestAnimationFrame(() => this.run());

    this.renderState.now = Date.now()
    this.renderState.elapsed = this.renderState.now - this.renderState.then

    if (this.renderState.elapsed > this.renderState.fpsInterval) {
      this.renderState.then = this.renderState.now - (this.renderState.elapsed % this.renderState.fpsInterval)

      this.directionHandler.control()
      this.ball.isFlying && this.ball.fly()
      this.render()

      this.renderState.sinceStart = this.renderState.now - this.renderState.startTime;
      this.renderState.currentFps = Math.round(1000 / (this.renderState.sinceStart / ++this.renderState.frameCount) * 100) / 100;
      this.renderState.timeStat = ("Elapsed time= " + Math.round(this.renderState.sinceStart / 1000 * 100) / 100 + " secs");
    }
  }

  /** Эффект затемнения экрана */
  shadowScreen(): void {
    this.ctx!.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx!.fillRect(0, 0, this.width, this.height)
  }

  gameOverHandler(): void {
    // this.direction.arrowsState.ArrowUp = false
    this.gameState.message = messages.gameOver
    this.gameState.showLevel = false
    this.gameState.isGame = false
    this.gameState.isGameOver = true
  }

  levelRender(): void {
    /** Отрисовка спрайтов */
    this.ctx!.drawImage(this.sprites.bg, 0, 0)
    !this.gameState.showStartMenu && this.ctx!.drawImage(
        this.sprites.platform, this.platform.x, this.platform.y,
    )
    /** Полёт и вращение шарика */
    !this.gameState.showStartMenu && this.ball.ballDraw()
    this.bricks.forEach((el) => {
      if (el.visible) {
        this.ctx!.drawImage(this.sprites.brick, el.x, el.y)
      }
    })
  }
}
