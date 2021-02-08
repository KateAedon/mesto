export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._items = data;
        this._renderer = renderer;
        this._container = containerSelector;
    }

    addItems() {
        this._items.forEach(item => {
            this._renderer(item)
        });
    }

    setItem(element) {
        this._container.prepend(element);
    }
}