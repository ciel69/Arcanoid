export interface StateInterface {
  create<T>(key: string, value: T): void
  updateByField<T>(key: string, field: keyof T, value: any): void
  update<T>(key: string, value: T): void
  get<T>(key: string): T
  subscribeState<T>(key: string, fn: (data: T) => void): void
}

export interface BallState {
  isFlying: boolean
}

export interface ArrowState {
  left: boolean
  right: boolean
}
