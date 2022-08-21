import ball from '../assets/images/ball.png'
import bg from '../assets/images/bg.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platform.png'

import { Platform } from "../elements/Platform"
import { Sprites } from "../types/Sprites"
import { Ball } from '../elements/Ball'
import levels from './levels'

export class Game {
  /** Создаём холст */
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')
  width = 960
  height = 540
  frame = 0

  /** Создаём игровые элементы */
  ball = new Ball(
      469,
      489,
      2,
  )
  bricks: {x: number, y: number}[] = []
  platform = new Platform(448)
  sprites: Sprites = {
    bg: new Image(),
    ball: new Image(),
    brick: new Image(),
    platform: new Image(),
  }

  create(level: number): void {
     levels[level].forEach((row, rowIndex) => {
      row.forEach((el, elIndex) => {
        if (el === 1) {
          this.bricks.push({
            x: elIndex * 64,
            y: rowIndex * 32,
          })
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
    this.create(2)
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
    this.ctx!.translate(this.ball.x + 11, this.ball.y + 11)
    this.ctx!.rotate(this.ball.ballAngle)
    this.ctx!.drawImage(this.sprites.ball, -11, -11)
    this.ctx!.rotate(-this.ball.ballAngle)
    this.ctx!.translate(-this.ball.x - 11, -this.ball.y - 11)
    this.ctx!.restore()

    this.bricks.forEach((el) => {
      this.ctx!.drawImage(this.sprites.brick, el.x, el.y)
    })

    this.ctx!.drawImage(this.sprites.platform, this.platform.x, this.platform.y)

  }

  run() {
    console.log(this.frame);
    this.frame++
    this.render();

    /** Перерисовка канваса */
    window.requestAnimationFrame(() => {
      this.run();
    });
  }
}

