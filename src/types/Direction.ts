export interface Direction {
  arrowsState: {
    ArrowUp: boolean,
    ArrowLeft: boolean,
    ArrowRight: boolean,
  },
  platformDirection: 'right' | 'left',
  keyDelayStatus: KeyDelayStatus,
}

interface KeyDelayStatus {
  keyDelay: {
    [key: string]: Boolean
    s: boolean,
    ' ': boolean,
  },
  delayInProgress: {
    [key: string]: Boolean
    s: boolean,
    ' ': boolean,
  },
}

export interface EventControl {
  source: KeyboardEvent
  isDown: boolean
}
