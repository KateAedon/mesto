import { Popup } from '../components/Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formValidator, { handleFormSubmit }) {
        super(popupSelector);
        this._formValidator = formValidator;
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.form');
        this._submitButton = this._form.querySelector('.form__save-button');
        this._evtSubmit = this._evtSubmit.bind(this);
        this._inputList = Array.from(this._form.querySelectorAll('.form__input'));
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _evtSubmit(evt){
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }

    setEventListeners() {
        super.setEventListeners();
           this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }
}