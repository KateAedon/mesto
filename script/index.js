import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initial_cards.js';


const cardsContainer = document.querySelector('.cards__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const imageCloseButton = document.querySelector('.popup-image__close-button');
const cardCloseButton = document.querySelector('.popup-card__close-button');
const profileCloseButton = document.querySelector('.popup-profile__close-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupImage = document.querySelector('.popup-image');
const popupImageName = popupImage.querySelector('.popup-image__name')
const profileFormElement = document.querySelector('.popup-profile__container');
const cardFormElement = document.querySelector('.popup-card__container');

const form = document.querySelector('.card-form');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const cardNameInput = document.querySelector('.form__input_type_place');
const cardLinkInput = document.querySelector('.form__input_type_link');
const escapeKey = 'Escape';

const  validationConfig= {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_invalid',
    inputErrorClass: 'popup__input__state_invalid',
    errorClass: '.popup__error_visible'
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfile);
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard();
    closePopup(popupCard);
    form.reset();
}

function openPopup(popupType) {
    popupType.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    document.addEventListener('click', closeByOverlayClick);
}

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    document.removeEventListener('click', closeByOverlayClick);
}

const closePopupEscape = (evt) => {
    if (evt.key === escapeKey) {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

const closeByOverlayClick = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
     }
}

profileCloseButton.addEventListener('click', function() {
    closePopup(popupProfile);
});

cardCloseButton.addEventListener('click', function() {
    closePopup(popupCard);
});

imageCloseButton.addEventListener('click', function() {
    closePopup(popupImage);
});

editButton.addEventListener('click', function() {
    openPopup(popupProfile);
    profileName.value = nameInput.textContent ;
    profileDescription.value = descriptionInput.textContent;
});

addButton.addEventListener('click', function() {
    openPopup(popupCard);
});

profileFormElement.addEventListener('submit', formSubmitHandler);
cardFormElement.addEventListener('submit', cardFormSubmitHandler); 

export const showBigImage = (name, link) => {
    const popupImageElement = popupImage.querySelector('.popup-image__image');
    popupImageName.textContent = name;
    popupImageElement.src = link;
    popupImageElement.alt = name;
    openPopup(popupImage);
};

// функция создания новой карточки
function addNewCard() {
    const cardText = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    const card = new Card(cardText, cardLink, '.card-template', showBigImage);
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
}

// создаем карточки из заданного объекта InitialCards
initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '.card-template', showBigImage);
    const cardElement = card.generateCard();
    const cardsContainer = document.querySelector('.cards__list');
    cardsContainer.append(cardElement);
});

// собираем все формы, которые нужно проверить и через цикл добавляем к ним класс валидации
function enableValidation () {
    const forms = document.querySelectorAll(validationConfig.formSelector);
    forms.forEach((form) => {
        const validation = new FormValidator(validationConfig, form);
        validation.validateForm();
    })
}

enableValidation();
 