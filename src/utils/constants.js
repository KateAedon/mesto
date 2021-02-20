export const cardsContainer = document.querySelector('.cards__list');

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const imageCloseButton = document.querySelector('.popup-image__close-button');
export const cardCloseButton = document.querySelector('.popup-card__close-button');
export const profileCloseButton = document.querySelector('.popup-profile__close-button');
export const popupCloseButton = document.querySelector('.popup__close-button');
export const editAvatarButton = document.querySelector('.profile__avatar-button');

export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const profileAvatar = document.querySelector('.profile__image');

export const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup-profile');
export const popupCard = document.querySelector('.popup-card');
export const popupImage = document.querySelector('.popup-image');
export const popupConfirm = document.querySelector('.popup-confirm');
export const popupAvatar = document.querySelector('.popup-avatar');
export const popupImageElement = popupImage.querySelector('.popup-image__image');
export const popupImageName = popupImage.querySelector('.popup-image__name')
export const profileFormElement = document.querySelector('.popup-profile__container');
export const cardFormElement = document.querySelector('.popup-card__container');

export const cardForm = document.querySelector('.card-form');
export const avatarForm = document.querySelector('.avatar-form');
export const profileFormSaveButton = document.querySelector('.profile-form__save-button');
export const cardFormSaveButton = document.querySelector('.card-form__save-button');
export const profileForm = document.querySelector('.profile-form');
export const nameInput = document.querySelector('.form__input_type_name');
export const descriptionInput = document.querySelector('.form__input_type_about');
export const cardNameInput = document.querySelector('.form__input_type_place');
export const cardLinkInput = document.querySelector('.form__input_type_link');
export const escapeKey = 'Escape';

export const  validationConfig= {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_invalid',
    inputErrorClass: 'popup__input__state_invalid',
    errorClass: '.popup__error_visible'
}