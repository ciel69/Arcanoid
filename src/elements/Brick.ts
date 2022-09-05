import { BaseGeometry } from '../types/baseGeometry'

export class Brick implements BaseGeometry {
  x: number
  y: number
  width: number
  height: number
  visible: boolean

  constructor(x: number, y: number, width: number, height: number, visible: boolean) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = visible;
  }
}