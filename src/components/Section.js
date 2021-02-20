export class Section {
    constructor( renderer, containerSelector) {
        this._renderer = renderer;
        this._container = containerSelector;
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item)
        });
    }

    addItemLast(element) {
        this._container.prepend(element);
    }

    addItemFirst(element) {
        this._container.append(element);
    }
}