import ball from '../assets/images/ball.png'
// import bg from '../assets/images/bg.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platformG96.png'

import { Platform } from "../elements/Platform"
import { Sprites } from "../types/Sprites"
import { Ball } from '../elements/Ball'
import levels from '../core/levels'
import { Brick } from '../elements/Brick'
import { sound } from '../core/Sound'
import Rules from '../core/Config'


export class Game {
  /** Создаём холст */
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')
  width = 960
  height = 600

  /** Управление */
  ArrowUp = false
  ArrowLeft = false
  ArrowRight = false
  platformDirection: 'right' | 'left' = 'right'

  /** Элементы игры */
  sprites: Sprites
  bricks: Brick[] = []
  platform = new Platform()
  ball: Ball

  /** Состояние */
  currentLevel: number
  showStartMenu = true
  showLevel = true
  lives: number
  isMusicOn = false
  isGameOver = false

  /** Render state */
  frame = 0
  frameCount = 0
  timeStat = ''
  fps = 60
  fpsInterval = 0
  startTime = 0
  sinceStart = 0
  now = 0
  then = 0
  elapsed = 0
  currentFps = 0

  constructor(
      level: number,
      lives: number,
  ) {
    this.currentLevel = level
    this.lives = lives
    /** Создаём шарик */
    this.ball = new Ball(
        480,
        537,
        0,
        this.bricks,
        this.platform,
        this.lives,
    )

    /** Создаём игровые элементы */
    this.sprites = {
      bg: new Image(),
      ball: new Image(),
      brick: new Image(),
      platform: new Image(),
    }
  }

  /** Создание уровня */
  createLevel(level: number): void {
    levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.bricks.push(
              new Brick(
                  elIndex * 64, rowIndex * 32, 64, 32, true
              ),
          )
        }
      })
    })
  }


  /** Загрузка спрайтов */
  load() {
    // this.sprites.bg.src = bg
    this.sprites.ball.src = ball
    this.sprites.brick.src = brick
    this.sprites.platform.src = platform
  }

  start() {
    this.load()
    this.createLevel(this.currentLevel)
    this.startAnimating(this.fps)
  }

  restart() {
    this.createLevel(this.currentLevel)
    this.run()
  }


  startAnimating(fps: number): void {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now()
    this.startTime = this.then;
    this.run();
  }

  render() {
    this.frame += 1

    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)
    this.showLevel && this.levelRender()

    if (this.showStartMenu) {
      this.shadowScreen()
      this.startMenuRender()
    }

    if (this.ball.lives === 0) {
      this.shadowScreen()
      this.gameOverHandler()
    }

    Rules.systemInfo && this.systemInfoRender()

    this.musicHandler()
  }

  update(): void {
    if (this.ball.isFlying
    ) {
      this.ball.fly()
    }
  }

  run() {
    /** Перерисовка канваса */
    window.requestAnimationFrame(() => this.run());

    this.now = Date.now()
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.control()
      this.update()
      this.render()

      this.sinceStart = this.now - this.startTime;
      this.currentFps = Math.round(1000 / (this.sinceStart / ++this.frameCount) * 100) / 100;
      this.timeStat = ("Elapsed time= " + Math.round(this.sinceStart / 1000 * 100) / 100 + " secs");
    }
  }

  musicHandler(): void {
    /** Музыка */
    if (!this.isMusicOn) {
      Rules.music && this.showStartMenu && sound.track1.play()
      Rules.music && !this.showStartMenu && sound.track2.play()
    }

    this.isMusicOn = true
  }

  shadowScreen(): void {
    this.ctx!.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx!.fillRect(0, 0, this.width, this.height)
  }

  startMenuRender(): void {
    this.ctx!.font = "bold 128px sans-serif"
    this.ctx!.fillStyle = 'orange'
    this.ctx!.fillText("PRESS", 266, 270)
    this.ctx!.fillStyle = 'green'
    this.ctx!.fillText("SPACE", 266, 400)
  }

  gameOverHandler(): void {
    this.ArrowUp = false

    this.ctx!.font = "128px sans-serif"
    this.ctx!.fillStyle = 'red'
    this.ctx!.fillText("Game", 150, 300)
    this.ctx!.fillStyle = 'yellow'
    this.ctx!.fillText("Over", 530, 300)
    this.showLevel = false
    this.isGameOver = true
  }

  systemInfoRender(): void {
    this.ctx!.font = "12px sans-serif"
    this.ctx!.fillStyle = 'green'
    this.ctx!.fillText(`ball xVelocity: ${this.ball.xVelocity}`, 10, 20)
    this.ctx!.fillText(`ball yVelocity: ${this.ball.yVelocity}`, 10, 40)
    this.ctx!.fillText(`lives: ${this.ball.lives}`, 10, 60)
    this.ctx!.fillText(`level: ${this.currentLevel}`, 10, 80)
    this.ctx!.fillText(`frames: ${this.frame}`, 10, 100)
    this.ctx!.fillText(`window.performance.now(): ${window.performance.now()}`, 10, 120)
    this.ctx!.fillText(`fps: ${this.currentFps}`, 10, 140)
    this.ctx!.fillText(`timeStatistics: ${this.timeStat}`, 10, 160)
  }

  levelRender(): void {
    /** Отрисовка спрайтов */
    this.ctx!.drawImage(this.sprites.bg, 0, 0)
    !this.showStartMenu && this.ctx!.drawImage(
        this.sprites.platform, this.platform.x, this.platform.y
    )
    /** Полёт и вращение шарика */
    !this.showStartMenu && this.ballDraw()
    this.bricks.forEach((el) => {
      if (el.visible) {
        this.ctx!.drawImage(this.sprites.brick, el.x, el.y)
      }
    })
  }

  ballDraw(): void {
    /** Вращение мячика: сохраняем канвас, сдвигаем и поворачиваем матрицу, */
    /** отрисовываем мячик и затем возвращаем канвас на место */
    this.ctx!.save()
    this.ctx!.translate(this.ball.x, this.ball.y)
    this.ctx!.rotate(this.ball.ballAngle)
    this.ctx!.drawImage(this.sprites.ball, -this.ball.radius, -this.ball.radius)
    this.ctx!.rotate(-this.ball.ballAngle)
    this.ctx!.translate(-this.ball.x, -this.ball.y)
    this.ctx!.restore()
  }

  /** Обработка нажатий на клавиатуру */
  handleKeyPressed(key: string, status: boolean): void {
    if (key === ' ') {
      if (this.showStartMenu && this.isMusicOn){
        sound.track1.stop()
        this.isMusicOn = false
      this.showStartMenu = false
      }

      if (this.isGameOver) {
        this.ball.lives = this.lives
        this.isMusicOn = false
        this.showStartMenu = true
        this.isGameOver = false
        this.showLevel = true
        // this.newGameIsCreating = true
        this.restart()
      }
    }

    if (key === 's') {
      Rules.systemInfo = !Rules.systemInfo
    }

    if (!this.showStartMenu && !this.isGameOver) {
      if (key === 'ArrowUp') {
        /** Если шарик в полёте - блокируем стрелку вверх */
        this.ArrowUp = this.ball.isFlying ? false : status
      }

      if (key === 'ArrowLeft') {
        this.ArrowLeft = status
      }

      if (key === 'ArrowRight') {
        this.ArrowRight = status
      }
    }
  }

  control(): void {
    if (this.ArrowLeft) {
      this.platform.move(0)
      /** Если мячик не в полёте - он движется вместе с платформой */
      if (!this.ball.isFlying) {
        this.ball.x = this.platform.x + this.platform.width / 2
      }
      this.platformDirection = 'left'
    }

    if (this.ArrowRight) {
      this.platform.move(1)
      /** Если мячик не в полёте - он движется вместе с платформой */
      if (!this.ball.isFlying) {
        this.ball.x = this.platform.x + this.platform.width / 2
      }
      this.platformDirection = 'right'
    }

    if (this.ArrowUp) {
      if (!this.ball.isFlying) {
        if (this.platformDirection === 'right') {
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
}

