import {BasicElementInterface, ElementInterface} from '../model/element.interface';
import BasicElement from './basic-element';

export default class Element implements ElementInterface {
    elements: Map<string, BasicElementInterface> = new Map()

    createElement(key: string, sprite: string): BasicElementInterface {
        const image = new Image()
        image.src = sprite
        const texture = image
        const element = new BasicElement({
            x: 0,
            y: 0,
            texture
        } as BasicElementInterface)
        this.elements.set(key, element)
        return element
    }

    getElement(key: string): BasicElementInterface | null {
        return this.elements.get(key) || null
    }

    getElements(): BasicElementInterface[] {
        return Array.from(this.elements.values())
    }
}
