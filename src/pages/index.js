import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import {
    profileName,
    profileDescription,
    popupImage, 
    popupProfile,
    profileCloseButton, 
    initialCards,
    cardsContainer,
    editButton,
    addButton,
    cardCloseButton,
    imageCloseButton,
    nameInput,
    descriptionInput,
    popupCard, 
    validationConfig,
    profileForm,
    cardForm
} from '../utils/constants.js';

const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, cardForm);

function validateForms () {
    editProfileValidator.enableValidation();
    addCardValidator.enableValidation();
}

const profileInfo = new UserInfo(profileName, profileDescription);

const fullsizePopup = new PopupWithImage(popupImage);

const editProfilePopup = new PopupWithForm(
    popupProfile, 
    editProfileValidator, 
    { handleFormSubmit: (data) => {
        profileInfo.setUserInfo(data);
        editProfilePopup.closePopup();
    }
});

const addCardPopup = new PopupWithForm(
    popupCard, addCardValidator, {
        handleFormSubmit: (data) => {
            const newCard = createCard(data);
            const cardElement = appendCard(newCard);
            addCardPopup.closePopup();
        }
});

fullsizePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

editButton.addEventListener('click', () => {
    const userData = profileInfo.getUserInfo();
    nameInput.value = userData.name;
    descriptionInput.value = userData.description;
    editProfilePopup.openPopup();
});

addButton.addEventListener('click', function () {
    addCardPopup.openPopup();
});

function createCard(data) {
    const card = new Card( 
        data, 
        { handleCardClick: () => {
            fullsizePopup.openPopup(data);
        }, 
    },
        '.card-template');
    return card;
}

function appendCard(card) {
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    return cardElement;
}

const cardsList = new Section ({
    data: initialCards,
    renderer: (data) => {
        const newCard = createCard(data);
        appendCard(newCard);
    },
}, cardsContainer
);


cardsList.addItems();
validateForms()