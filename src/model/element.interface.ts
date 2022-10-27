export interface ElementInterface {
  elements: Map<string, BasicElementInterface>
  createElement(key: string, texture: string): BasicElementInterface
  getElement(key: string): BasicElementInterface | null
  deleteElement(key: string): void
  getElements(): BasicElementInterface[]
}

export interface BasicElementInterface {
  id?: string|null
  x: number
  y: number
  width?: number
  height?: number
  xVelocity: number
  yVelocity: number
  isRotate: boolean
  destroyed?: boolean
  texture: HTMLImageElement

  rotate?: Function | null

  setVelocity<T>(xVelocity: number): T
  setVelocity<T>(xVelocity: number, yVelocity: number): T

  move<T>(x: 0 | 1 | -1): T
  move<T>(x: 0 | 1 | -1, y: 0 | 1 | -1): T
}

export interface BasicServiceInterface {
  create(x: number, y: number): BasicElementInterface
  create(x: number, y: number, id: string): BasicElementInterface
  move(): void
  move<T>(x: 0 | 1 | -1): T
  move<T>(x: 0 | 1 | -1, y: 0 | 1 | -1): T
  reset?(el: BasicElementInterface, x?: number): void
  delete?(el: BasicElementInterface): void
}

export interface BallInterface extends BasicServiceInterface {
  getBalls(): BasicElementInterface[]
  resetAll(x?: number): void
}

export interface PlatformInterface extends BasicServiceInterface {
}

export interface BrickInterface extends BasicServiceInterface {
  bricks: BasicElementInterface[]
  isEmpty(): boolean
  deleteAll(): void
  delete(el: BasicElementInterface): void
}

