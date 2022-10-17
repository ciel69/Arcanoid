import GameState from '../types/GameState'

type Key = keyof GameState;

export namespace State {
    let state: GameState

    export const setState = (data: GameState) => {
        state = data
    }

    export const updateField = (key: Key, value: any) => {
        // @ts-ignore
        state[key] = value
    }

    export const getState = (): GameState => {
        return state
    }
}
