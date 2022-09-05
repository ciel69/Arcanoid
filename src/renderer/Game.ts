import ball from '../assets/images/ball.png'
import bg from '../assets/images/bg.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platformG96.png'

import { Platform } from "../elements/Platform"
import { Sprites } from "../types/Sprites"
import { Ball } from '../elements/Ball'
import levels from './levels'
import { Brick } from '../elements/Brick'

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

  /** Создаём игровые элементы */
  sprites: Sprites = {
    bg: new Image(),
    ball: new Image(),
    brick: new Image(),
    platform: new Image(),
  }

  bricks: Brick[] = []
  platform = new Platform()

  /** Создаём шарик */
  ball = new Ball(
      480,
      498,
      0,
      this.bricks,
      this.platform,
  )

  /** Состояние */
  currentLevel = 0
  platformDirection: 'right' | 'left' = 'right'

  constructor(
      level: number,
  ) {
    this.currentLevel = level
  }

  /** Создание уровня */
  create(level: number): void {
    levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.bricks.push(
              new Brick(elIndex * 64, rowIndex * 32, 64, 32, true),
          )
        }
      })
    })
  }


  /** Загрузка спрайтов */
  load() {
    this.sprites.bg.src = bg
    this.sprites.ball.src = ball
    this.sprites.brick.src = brick
    this.sprites.platform.src = platform
  }

  start() {
    this.load()
    this.create(this.currentLevel)
    this.run()
  }

  render() {
    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)

    /** Отрисовка спрайтов */
    this.ctx!.drawImage(this.sprites.bg, 0, 0)

    /** Вращение мячика: сохраняем канвас, сдвигаем и поворачиваем матрицу, */
    /** отрисовываем мячик и затем возвращаем канвас на место */
    this.ctx!.save()
    this.ctx!.translate(this.ball.x, this.ball.y)
    this.ctx!.rotate(this.ball.ballAngle)
    this.ctx!.drawImage(this.sprites.ball, -this.ball.radius, -this.ball.radius)
    this.ctx!.rotate(-this.ball.ballAngle)
    this.ctx!.translate(-this.ball.x, -this.ball.y)
    this.ctx!.restore()

    this.bricks.forEach((el) => {
      if (el.visible) {
        this.ctx!.drawImage(this.sprites.brick, el.x, el.y)
      }
    })

    this.ctx!.drawImage(this.sprites.platform, this.platform.x, this.platform.y)

  }

  update(): void {
    if (this.ball.isFlying
    ) {
      this.ball.fly()
    }
  }

  run() {
    this.control()
    this.update()
    this.render()

    /** Перерисовка канваса */
    window.requestAnimationFrame(() => {
      this.run();
    });
  }

  /** Обработка нажатий на клавиатуру */
  handleKeyPressed(key: string, status: boolean): void {
    if (key === 'ArrowUp') {
      this.ArrowUp = status
    }

    if (key === 'ArrowLeft') {
      this.ArrowLeft = status
    }

    if (key === 'ArrowRight') {
      this.ArrowRight = status
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
      console.log('left')
    }

    if (this.ArrowRight) {
      this.platform.move(1)
      /** Если мячик не в полёте - он движется вместе с платформой */
      if (!this.ball.isFlying) {
        this.ball.x = this.platform.x + this.platform.width / 2
      }
      this.platformDirection = 'right'
      console.log('right')
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

