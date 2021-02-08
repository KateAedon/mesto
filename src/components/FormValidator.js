export class FormValidator {
    constructor(validationConfig, form) {
        this._config = validationConfig;
        this._form = form;
   }

    enableValidation() {
        this._setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setButtonState(this._submitButton, this._form.checkValidity());
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
        this._setButtonState(this._submitButton, this._form.checkValidity(), this._config);

    }
 
    _setButtonState(button, isValid) {
        if (isValid) {
            button.classList.remove(this._config.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._config.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListeners() {
        this._inputList = this._form.querySelectorAll(this._config.inputSelector);
        this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
        this._inputList.forEach((input) => {
            if (input.classList.contains('form__input_type_name')) {
                this._buttonToggle(input);
            }
            input.addEventListener('input', ()  => {
                this._buttonToggle(input);
        });
        });
    }

}