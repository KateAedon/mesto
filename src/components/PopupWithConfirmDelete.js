import { Popup } from '../components/Popup.js';

export class PopupWithConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = popupSelector;
        this._submitDeleteButton = this._popup.querySelector('.form__confirm-button');
    }
    setEventListeners(deleteCard) {
        super.setEventListeners();
        this._handleConfirmButton = deleteCard;
        this._submitDeleteButton.addEventListener('click', this._handleConfirmButton);
    }

    closePopup() {
        super.closePopup();
        this._submitDeleteButton.removeEventListener('click', this._andleConfirmButton);
    }
}