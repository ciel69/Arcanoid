export default class ScreenStateRender {
  private ctx: CanvasRenderingContext2D | null

  constructor(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx
  }

  public startMenuRender(): void {
    this.ctx!.font = "bold 128px sans-serif"
    this.ctx!.fillStyle = 'orange'
    this.ctx!.fillText("PRESS", 266, 270)
    this.ctx!.fillStyle = 'green'
    this.ctx!.fillText("SPACE", 266, 400)
  }

  public gameOverRender(): void {
    this.ctx!.font = "128px sans-serif"
    this.ctx!.fillStyle = 'red'
    this.ctx!.fillText("Core", 150, 300)
    this.ctx!.fillStyle = 'yellow'
    this.ctx!.fillText("Over", 530, 300)
  }
}