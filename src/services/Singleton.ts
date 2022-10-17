export namespace State {
    let state: any

    export const setState = <T>(data: T) => {
        state = data
    }

    export const getState = <T>(): T => {
        return state
    }
}
