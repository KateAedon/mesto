const editButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup-profile__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup-profile');
let nameInput = document.querySelector('.form__input_type_name');
let descriptionInput = document.querySelector('.form__input_type_description');
let profileFormElement = document.querySelector('.popup-profile__container');
let cardNameInput = document.querySelector('.card-form__input_type_name');
let cardLinkInput = document.querySelector('.card-form__input_type_link');
let cardFormElement = document.querySelector('.popup-card__container');
const popupCard = document.querySelector('.popup-card');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.popup-card__close-button');
const templateElement = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards__list');

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

function makeCard(card) {
    const newCard = templateElement.content.cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__name').textContent = card.name;
    cardsContainer.append(newCard);
}

function toggleCardPopup() {
    popupCard.classList.toggle('popup_opened');
}

function addNewCard(card) {
    const newCard = templateElement.content.cloneNode(true);
    newCard.querySelector('.card__image').src = cardLinkInput.value;
    newCard.querySelector('.card__name').textContent = cardNameInput.value;
    cardsContainer.append(newCard);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard();
    toggleCardPopup();
}

initialCards.forEach(makeCard);

const likeButtons = document.querySelectorAll('.card__button-like');
likeButtons.forEach((card) => {
   addEventListener('click', likeCard); 
})

function likeCard(event) {
    const targetButton = event.target.closest('.card__button-like');
    targetButton.classList.toggle('card__button-like_active');
}

const deleteButtons = document.querySelectorAll('.card__button-delete');
deleteButtons.forEach((card) => {
   addEventListener('click', deleteCard); 
})

function deleteCard(event) {
    const targetCard = event.target.closest('.card');
    targetCard.remove();
}

editButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', toggleProfilePopup);
profileFormElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', toggleCardPopup);
cardCloseButton.addEventListener('click', toggleCardPopup);
cardFormElement.addEventListener('submit', cardFormSubmitHandler); 