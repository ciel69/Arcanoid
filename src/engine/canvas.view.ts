import {BehaviorSubject, tap} from 'rxjs';

import {ViewInterface} from '../model/view.interface';
import {BasicElementInterface} from '../model/element.interface';

interface ParamsCanvas {
  idContainer: string
  width: number
  height: number
}

export default class CanvasView implements ViewInterface {

  ticker$ = new BehaviorSubject<number>(0).pipe(tap(() => {
    // console.log('tap', this.width);
    // this.ctx!.translate(10, 10)
    // this.ctx!.save()
    // this.ctx!.translate(testX, testY)
    this.ctx!.clearRect(0, 0, this.width, this.height)
    // this.ctx!.restore()
  })) as BehaviorSubject<number>

  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D | null

  private width!: number
  private height!: number
  readonly idContainer: string
  private previousTimeStamp: number = 0
  private startAnimated: number = 0

  constructor(data: ParamsCanvas) {
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
    image.texture.onload = () => {
      this.ctx!.drawImage(image.texture, image.x, image.y)
    }
    this.ctx!.drawImage(image.texture, image.x, image.y)
  }

  addChildren(images: BasicElementInterface[]): void {
    images.forEach(image => {
      image.texture.onload = () => {
        this.ctx!.drawImage(image.texture, image.x, image.y)
      }
      this.ctx!.drawImage(image.texture, image.x, image.y)
    })
  }

}
