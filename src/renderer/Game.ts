import ball from '../assets/images/ball.png'
import bg from '../assets/images/bg.png'
import brick from '../assets/images/brick.png'
import platform from '../assets/images/platform.png'

import { Platform } from "../types/Platform"
import { Sprites } from "../types/Sprites"

export class Game {
  canvas = document.getElementById('canvas') as HTMLCanvasElement
  ctx = this.canvas.getContext('2d')

  width = 1000
  height = 600

  platform = new Platform(468)
  sprites: Sprites = {
    ball: new Image(),
    bg: new Image(),
    brick: new Image(),
    platform: new Image(),
  }

  /** Загрузка спрайтов */
  load() {
    this.sprites.ball.src = ball
    this.sprites.bg.src = bg
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
    this.ctx!.drawImage(this.sprites.bg!, 0, 0);
    this.ctx!.drawImage(this.sprites.platform!, this.platform!.x, this.platform!.y);
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

