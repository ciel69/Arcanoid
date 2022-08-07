import ball from '../assets/images/ball.png'
import bg from '../assets/images/bg.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platform.png'

import { Platform } from "../elements/Platform"
import { Sprites } from "../types/Sprites"
import { Ball } from '../elements/Ball'
import { Brick } from '../elements/Brick'

export class Game {
  /** Создаём холст */
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')
  width = 960
  height = 540

  /** Создаём игровые элементы */
  ball = new Ball(469, 489)
  brick = new Brick(0, 0)
  platform = new Platform(448)
  sprites: Sprites = {
    bg: new Image(),
    ball: new Image(),
    brick: new Image(),
    platform: new Image(),
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
    this.run()
  }

  render() {
    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)

    /** Отрисовка спрайтов */
    this.ctx!.drawImage(this.sprites.bg, 0, 0)
    this.ctx!.drawImage(this.sprites.ball, this.ball.x, this.ball.y)
    this.ctx!.drawImage(this.sprites.brick, this.brick.x, this.brick.y)
    this.ctx!.drawImage(this.sprites.platform, this.platform.x, this.platform.y)
  }

  run() {
    let i = 0;
    console.log(i);
    i++
    this.render();

    /** Перерисовка канваса */
    window.requestAnimationFrame(() => {
      this.run();
    });
  }
}

