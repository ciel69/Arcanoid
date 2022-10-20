import {BasicElementInterface} from '../model/element.interface';

export default class BasicElement implements BasicElementInterface {
  x: number = 0
  y: number = 0
  width?: number = 0
  height?: number = 0
  xVelocity: number = 0
  yVelocity: number = 0
  isRotate: boolean = false
  texture: HTMLImageElement


  constructor(data: BasicElementInterface) {
    this.x = data.x
    this.y = data.y
    this.width = data.width
    this.height = data.height
    this.xVelocity = data.xVelocity
    this.yVelocity = data.yVelocity
    this.texture = data.texture
  }

  /**
   * Задаём скорость для элемента
   * @param xVelocity
   * @param yVelocity
   */
  setVelocity(xVelocity: number, yVelocity?: number): BasicElementInterface {
    if (!yVelocity)  {
      this.xVelocity = xVelocity
      this.yVelocity = xVelocity
      return this
    }
    this.xVelocity = xVelocity
    this.yVelocity = yVelocity
    return this
  }

  /**
   * Функция перемещения элемента по координатам
   * с учетом заданной скорости элементу
   * @param x
   * @param y
   */
  move(x: 0 | 1 | -1, y?: 0 | 1 | -1): BasicElementInterface {
    this.x += this.xVelocity * x
    if (y) {
      this.y += this.yVelocity * y
    }
    return this
  }
}
