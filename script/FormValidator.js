export class FormValidator {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form;
    }

    _showError(input) {
        this._error = this._form.querySelector(`#${input.id}-error`);
        this._error.classList.add(this._validationConfig.errorClass);
        this._error.textContent = input.validationMessage;
        input.classList.add(this._validationConfig.inputErrorClass);
    } 

    _hideError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        error.classList.remove(this._validationConfig.errorClass);
        error.textContent = '';
        input.classList.remove(this._validationConfig.inputErrorClass);
    } 
    
     _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);     
        } else {
            this._showError(input)        
        }
    } 

    _setButtonState(button, isActive) {
        if (isActive) {
            button.classList.remove(this._validationConfig.inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._validationConfig.inactiveButtonClass);
            button.disabled = true;
        }
    }

    _setEventListener() {
        this._inputList = this._form.querySelectorAll(this._validationConfig.inputSelector);
        this._submitButton = this._form.querySelector(this._validationConfig.submitButtonSelector);
            
        this._inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            this._checkInputValidity(input);
            this._setButtonState(this._submitButton, this._form.checkValidity());    
        })
    });
    }

    validateForm() {
        this._setEventListener();
        this._form.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
        this._setButtonState(this._submitButton, this._form.checkValidity());
      }

}
