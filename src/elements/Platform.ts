export class Platform {
  width = 64
  velocity = 16
  x = 480 - this.width / 2
  y = 486
  dx = 0

  move(direction: 0 | 1): void {
    direction
        ? this.dx = this.velocity
        : this.dx = -this.velocity

    if (
        this.x <= 960 - this.width / 2 &&
        this.x >= 0
    ) {
      if (
          this.x + this.dx < 0 ||
          this.x + this.dx > 960 - this.width
      ) return

      this.x += this.dx
    }
  }
}