import {Game} from "../types/Game";
import Bg from '../assets/images/bg.png'
import Racket from '../assets/images/racket.png'

const game: Game = {
  ctx: null,

  width: 1000,
  height: 600,

  racket: null,
  sprites: {
    ball: null,
    bg: Bg,
    brick: null,
    racket: Racket,
  },

  /** Инициализация */
  init: function () {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = canvas.getContext('2d');
  },

  /** Загрузка спрайтов */
  load: function () {
    for (const key in this.sprites) {
      this.sprites[key] = new Image()
      this.sprites[key].src = key
    }
  },

  start: function () {
    this.init()
    this.load()
    this.run()
  },

  render: function () {
    /** Очистка канваса перед отрисовкой нового кадра */
    this.ctx!.clearRect(0, 0, this.width, this.height)

    /** Отрисовка спрайтов */
    this.ctx!.drawImage(this.sprites.bg!, 0, 0);
    this.ctx!.drawImage(this.sprites.racket!, this.racket!.x, this.racket!.y);
  },

  run: function () {
    let i = 0; console.log(i); i++
    this.render();

    /** Перерисовка канваса */
    window.requestAnimationFrame(() => {
      game.run();
    });
  }
}

game.racket = {
  x: 468,
  y: 550,
}

window.addEventListener('load', () =>{
  game.start();
})

// @ts-ignore
window.game = game;
