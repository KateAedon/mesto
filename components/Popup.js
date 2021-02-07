import { escapeKey } from '../utils/constants.js';

export class Popup {
    constructor (popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add('popup_opened');
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === escapeKey) {
        this.closePopup();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if(evt.srcElement.classList.contains('popup')) {
                this.closePopup();
            }
        });
    }
}