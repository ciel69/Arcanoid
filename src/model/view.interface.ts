import {BehaviorSubject} from 'rxjs';
import {BasicElementInterface} from './element.interface';


export interface ParamsCanvas {
  idContainer: string
  width: number
  height: number
}

export interface ViewInterface  {

  ticker$: BehaviorSubject<number>;

  configure(params: ParamsCanvas): void

  getWidth(): number
  getHeight(): number

  set?(x: number, y: number): void
  addChild(image: BasicElementInterface): void
  addChildren(images: BasicElementInterface[]): void
  rotateElement(element: BasicElementInterface, rotateSpeed: number): Function
  rotateAndPaintImage(image: HTMLImageElement, angleInRad: number, positionX: number, positionY: number, axisX: number, axisY: number): void
}
