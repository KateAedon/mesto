const editButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup-profile__close-button');
let likeButtons = document.querySelectorAll('.card__button-like');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup-profile');
let nameInput = document.querySelector('.form__input_type_name');
let descriptionInput = document.querySelector('.form__input_type_description');
let profileFormElement = document.querySelector('.popup-profile__container');

function toggleProfilePopup() {
    popupProfile.classList.toggle('popup_opened');
    profileName.value = nameInput.textContent ;
    profileDescription.value = descriptionInput.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    toggleProfilePopup();
}

editButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);
profileFormElement.addEventListener('submit', formSubmitHandler);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupCard = document.querySelector('.popup-card');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.popup-card__close-button');
const templateElement = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards__list');

function makeCard(card) {
    const newCard = templateElement.cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__name').textContent = card.name;
    cardsContainer.append(newCard);
}

initialCards.forEach(makeCard);

function toggleCardPopup() {
    popupCard.classList.toggle('popup_opened');
}

addButton.addEventListener('click', toggleCardPopup);
cardCloseButton.addEventListener('click', toggleCardPopup);