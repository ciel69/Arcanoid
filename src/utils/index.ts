import { filter } from 'rxjs';

import {EventControl} from '../model/control.interface';

export const filterByKey = (keys: string|string[]) => {
    if (!Array.isArray(keys)) {
        keys = [keys]
    }
    return filter<EventControl>(ev => keys.includes(ev.source.key))
}

export const createValueControl = (source: KeyboardEvent = {} as KeyboardEvent, isDown: boolean = false) => {
    return {
        source,
        isDown
    }
}
