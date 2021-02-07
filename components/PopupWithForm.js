import { Popup } from '../components/Popup.js';
import { validationConfig } from '../utils/constants.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, formValidator, {handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(validationConfig.formSelector);
        this._formValidator = formValidator;
        this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
        
        this._evtSubmit = this._evtSubmit.bind(this);
    }

    _getInputValues() {
        this._inputList = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    _evtSubmit = (evt) => {
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
