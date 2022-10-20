export interface ElementInterface {
  elements: Map<string, BasicElementInterface>
  createElement(key: string, texture: string): BasicElementInterface
  getElement(key: string): BasicElementInterface | null
  getElements(): BasicElementInterface[]
}

export interface BasicElementInterface {
  x: number
  y: number
  width?: number
  height?: number
  xVelocity: number
  yVelocity: number
  isRotate: boolean
  texture: HTMLImageElement

  setVelocity<T>(xVelocity: number): T
  setVelocity<T>(xVelocity: number, yVelocity: number): T

  move<T>(x: 0 | 1 | -1): T
  move<T>(x: 0 | 1 | -1, y: 0 | 1 | -1): T
}

