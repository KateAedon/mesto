const editButton = document.querySelector('.profile__info_edit_button');
const closeButton = document.querySelector('.popup_container__close_button');
let likeButtons = document.querySelectorAll('.card__info_button_like');
let profileName = document.querySelector('.profile__info_text_name');
let profileDescription = document.querySelector('.profile__info_text_description');
const popup = document.querySelector('.popup');
let nameInput = document.querySelector('.form__name');
let descriptionInput = document.querySelector('.form__description');
let formElement = document.querySelector('.popup_container');


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
            likeButton.classList.toggle('card__info_button_like_active');    
        }

        toggleLikeButton(this);

    }, false);
} 