import ball from '../assets/images/ball.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platformG96.png'

import levels from '../modules/levels'
import Rules from '../main/game_config'

import Ball from '../game_elements/Ball'
import Brick from '../game_elements/Brick'
import Direction from '../types/Direction'
import DirectionHandler from '../services/DirectionHandler'
import GameState from '../types/GameState'
import MusicHandler from '../services/MusicHandler'
import RenderState from '../types/RenderState'
import Platform from '../game_elements/Platform'
import ScreenStateRender from '../services/ScreenStateRender'
import Sprites from '../types/Sprites'
import SystemInfoRenderer from '../services/SystemInfoRenderer'

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

  /** Состояние */
  gameState: GameState = {
    currentLevel: 0,
    showStartMenu: true,
    showLevel: true,
    lives: 0,
    isMusicOn: false,
    isGameOver: false,
    isRestart: false,
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
  musicHandler
  systemInfoRender
  screenStateRender

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
        this.gameState.lives,
        this.ctx,
        this.sprites,
    )
    this.musicHandler = new MusicHandler(this.gameState)
    this.directionHandler = new DirectionHandler(
        this.ball,
        this.gameState,
        this.platform,
        this.direction,
        )
    this.screenStateRender = new ScreenStateRender(this.ctx)
    this.systemInfoRender = new SystemInfoRenderer(
        this.ctx,
        this.ball,
        this.gameState,
        this.renderState,
    )
  }

  /** Создание уровня */
  createLevel(level: number): void {
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

  start() {
    this.load()
    this.createLevel(this.gameState.currentLevel)
    this.startAnimating(this.renderState.fps)
  }

  restart() {
    this.createLevel(this.gameState.currentLevel)
    this.run()
  }


  startAnimating(fps: number): void {
    this.renderState.fpsInterval = 1000 / fps;
    this.renderState.then = Date.now()
    this.renderState.startTime = this.renderState.then;
    this.run();
  }

  render() {
    this.renderState.frame += 1

    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)
    this.gameState.showLevel && this.levelRender()

    if (this.gameState.showStartMenu) {
      this.shadowScreen()
      this.screenStateRender.startMenuRender()
    }

    if (this.ball.lives === 0) {
      this.shadowScreen()
      this.gameOverHandler()
    }

    if (this.gameState.isRestart) {
      this.gameState.isRestart = false
      this.restart()
    }

    Rules.systemInfo && this.systemInfoRender.show()
    Rules.music && this.musicHandler.on()
  }

  update(): void {
    if (this.ball.isFlying
    ) {
      this.ball.fly()
    }
  }

  run(): void {
    /** Перерисовка канваса */
    window.requestAnimationFrame(() => this.run());

    this.renderState.now = Date.now()
    this.renderState.elapsed = this.renderState.now - this.renderState.then

    if (this.renderState.elapsed > this.renderState.fpsInterval) {
      this.renderState.then = this.renderState.now - (this.renderState.elapsed % this.renderState.fpsInterval)

      this.directionHandler.control()
      this.update()
      this.render()

      this.renderState.sinceStart = this.renderState.now - this.renderState.startTime;
      this.renderState.currentFps = Math.round(1000 / (this.renderState.sinceStart / ++this.renderState.frameCount) * 100) / 100;
      this.renderState.timeStat = ("Elapsed time= " + Math.round(this.renderState.sinceStart / 1000 * 100) / 100 + " secs");
    }
  }

  shadowScreen(): void {
    this.ctx!.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx!.fillRect(0, 0, this.width, this.height)
  }

  gameOverHandler(): void {
    this.direction.arrowsState.ArrowUp = false
    this.screenStateRender.gameOverRender()
    this.gameState.showLevel = false
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