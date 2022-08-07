export interface Sprites {
  [key: string]: any,
  ball:  HTMLImageElement | null,
  bg:  HTMLImageElement | null,
  brick: HTMLImageElement | null,
  racket: HTMLImageElement | null,
}

export interface Game {
  ctx: CanvasRenderingContext2D | null

  width: number
  height: number

  racket: Racket | null
  sprites: Sprites

  init: () => void

  load: () => void

  start: () => void

  render: () => void

  run: () => void
}

export interface Racket {
  x: number,
  y: number,
}

// export class Game {
//   ctx: CanvasRenderingContext2D | null = null
//   sprites: Sprites = {
//     ball: null,
//     bg: null,
//     brick: null,
//     racket: null,
//   }
//
//   start: (() => void) | undefined
//
//   render: (() => void) | undefined
//
//   run: (() => void) | undefined
// }
//
// export type Sprites = {
//   ball:  HTMLImageElement | null,
//   bg:  HTMLImageElement | null,
//   brick: HTMLImageElement | null,
//   racket: HTMLImageElement | null,
// }
