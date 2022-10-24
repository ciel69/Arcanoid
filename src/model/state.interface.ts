export interface StateInterface {
  create(key: string, value: any): void
  update<T>(key: string, field: keyof T, value: any): void
  get<T>(key: string): T
}

export interface BallState {
  isFlying: boolean
}

export interface ArrowState {
  left: boolean
  right: boolean
}
