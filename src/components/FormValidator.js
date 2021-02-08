export class FormValidator {
    constructor(validationConfig, form) {
        this._config = validationConfig;
        this._form = form;
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
   }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setButtonState();
    }
        
    _checkInputValidity(input) {
            if (!input.validity.valid) {
                this._showInputError(input);
            } else {
                this._hideInputError(input);
            }
        }

    _showInputError(input) {
        this._error = this._form.querySelector(`#${input.id}-error`);
        this._error.classList.add(this._config.errorClass);
        this._error.textContent = input.validationMessage;
        input.classList.add(this._config.inputErrorClass);
    }

    _hideInputError(input) {
        this._error = this._form.querySelector(`#${input.id}-error`);
        this._error.classList.remove(this._config.errorClass);
        this._error.textContent = '';
        input.classList.remove(this._config.inputErrorClass);
    }

    _buttonToggle(input) {
        this._checkInputValidity(input);
        this._setButtonState();
    }
 
    _setButtonState() {
        if (this._form.checkValidity()) {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        } else {
            this._submitButton.classList.add(this._config.inactiveButtonClass);
            this._submitButton.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', ()  => {
                this._buttonToggle(input);
        });
        });
        this._form.addEventListener('reset', () => {
            this._inputList.forEach((inputElement) => {
                this._hideInputError(inputElement)
                this._setButtonState();
            })
        });
    }

}