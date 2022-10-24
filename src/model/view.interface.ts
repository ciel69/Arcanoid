import {BehaviorSubject} from 'rxjs';
import {BasicElementInterface} from './element.interface';


export interface ParamsCanvas {
  idContainer: string
  width: number
  height: number
}

export interface ViewInterface {

  ticker$: BehaviorSubject<number>;

  /**
   * Функция вызывает коллбэк на каждый кадр
   * @param fn
   */
  ticker(fn: (data: number) => void): void

  configure(params: ParamsCanvas): void

  getWidth(): number
  getHeight(): number

  set?(x: number, y: number): void
  fillRect(x: number, y: number, width: number, height: number, color: string): void
  addChild(image: BasicElementInterface): void
  addChildren(images: BasicElementInterface[]): void
  rotateElement(element: BasicElementInterface, rotateSpeed: number): Function
  rotateAndPaintImage(image: HTMLImageElement, angleInRad: number, positionX: number, positionY: number, axisX: number, axisY: number): void
}
