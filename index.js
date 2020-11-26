const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
let likeButtons = document.querySelectorAll('.card__button-like');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
let nameInput = document.querySelector('.form__name');
let descriptionInput = document.querySelector('.form__description');
let formElement = document.querySelector('.popup__container');


editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);

function togglePopup() {
    popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    togglePopup();
    closeButton.addEventListener('click', togglePopup); 
}

formElement.addEventListener('submit', formSubmitHandler);

for (let i=0; i < likeButtons.length; i++) {
    let likeButton = likeButtons[i];
    likeButton.addEventListener('click', function (event) {  
        event.preventDefault();

        function toggleLikeButton() {
            likeButton.classList.toggle('card__button-like_active');    
        }

        toggleLikeButton(this);

    }, false);
} 