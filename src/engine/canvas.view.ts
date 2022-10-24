import {BehaviorSubject, tap} from 'rxjs';

import {ParamsCanvas, ViewInterface} from '../model/view.interface';
import {BasicElementInterface} from '../model/element.interface';


export default class CanvasView implements ViewInterface {

  ticker$ = new BehaviorSubject<number>(0).pipe(tap(() => {
    this.ctx!.clearRect(0, 0, this.width, this.height)
  })) as BehaviorSubject<number>

  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null | undefined

  private width!: number
  private height!: number
  protected idContainer: string = ''
  private previousTimeStamp: number = 0
  private startAnimated: number = 0

  constructor() {
  }

  configure(data: ParamsCanvas): void {
    this.ctx = this.canvas.getContext('2d')
    this.idContainer = data.idContainer
    this.setWidth(data.width)
    this.setHeight(data.height)
    this.canvas = document.getElementById(data.idContainer) as HTMLCanvasElement

    this.run(Date.now())
  }

  run(timestamp: number): void {
    if (!this.startAnimated && timestamp) {
      this.startAnimated = timestamp
    }

    if (this.previousTimeStamp !== timestamp) {
      this.previousTimeStamp = timestamp
      window.requestAnimationFrame((timestamp) => this.run(timestamp))
      this.ticker$.next(timestamp)
    }
  }

  set(x: number, y: number): void {
    console.log('set', x);
    this.ctx!.translate(x, y)
  }

  setWidth(width: number): void {
    this.canvas.width = width
    this.width = width
  }

  setHeight(height: number): void {
    this.canvas.height = height
    this.height = height
  }

  getWidth(): number {
    return this.width
  }

  getHeight(): number {
    return this.height
  }

  addChild(image: BasicElementInterface): void {
    if (image.isRotate) return
    this.ctx!.drawImage(image.texture, (image.x - image.width! / 2), (image.y - image.height!/2), image.width!, image.height!)
  }

  addChildren(images: BasicElementInterface[]): void {
    images.forEach(image => {
      this.addChild(image)
    })
  }

  rotateElement(element: BasicElementInterface, rotateSpeed: number) {
    let _ballAngle = 0
    return () => {
      element.isRotate = true
      _ballAngle += rotateSpeed
      if (_ballAngle === 360) {
        _ballAngle = 0
      }
      this.rotateAndPaintImage(element.texture, +(_ballAngle * Math.PI / 180), element.x, element.y, element.width!, element.height!)
    }
  }

  rotateAndPaintImage(image: HTMLImageElement, angle: number, x: number, y: number, width: number, height: number) {
    this.ctx!.save()
    this.ctx!.translate(x, y)
    this.ctx!.rotate(angle)
    this.ctx!.drawImage(image, -width/2, -height/2, width, height)
    this.ctx!.translate(-x, -y)
    this.ctx!.restore()
  }

}
