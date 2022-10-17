import {ViewInterface} from "../model/view.interface";

interface ParamsCanvas {
  idContainer: string
  width: number
  height: number
}

export default class CanvasView implements ViewInterface {
  private canvas = document.getElementById('canvas') as HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D | null

  private width!: number
  private height!: number
  readonly idContainer: string

  constructor(data: ParamsCanvas) {
    this.ctx = this.canvas.getContext('2d')
    this.idContainer = data.idContainer
    this.setWidth(data.width)
    this.setHeight(data.height)
    this.canvas = document.getElementById(data.idContainer) as HTMLCanvasElement
  }

  setWidth(width: number): void {
    this.canvas.width = width
    this.width = width
  }

  setHeight(height: number): void {
    this.canvas.height = height
    this.height = height
  }

  /**
   * Получить контекст канваса
   */
  getContext(): CanvasRenderingContext2D | null {
    return this.ctx
  }

  public getWidth(): number {
    return this.width
  }

  public getHeight(): number {
    return this.height
  }
}
