import './index.css';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
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
    editProfileValidator,
    addCardValidator 
} from '../utils/constants.js';

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
        const profileInfo = new UserInfo(profileName, profileDescription);
        profileInfo.setUserInfo(data);
        editProfilePopup.closePopup();
    }
});

const addCardPopup = new PopupWithForm(
    popupCard, addCardValidator, {
        handleFormSubmit: (data) => {
            createCard(data);
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
    profileInfo.setUserInfo(userData);
    editProfilePopup.openPopup();
});

profileCloseButton.addEventListener('click', function () { 
    editProfilePopup.closePopup();
});

addButton.addEventListener('click', function () {
    addCardPopup.openPopup();
});

cardCloseButton.addEventListener('click', function () {
    addCardPopup.closePopup();
});

imageCloseButton.addEventListener('click', function () {
    fullsizePopup.closePopup();
});

function createCard(data) {
    const card = new Card(
        data, 
        { handleCardClick: () => {
            fullsizePopup.openPopup(data);
        }, 
    },
        '.card-template');
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
}

const cardsList = new Section ({
    data: initialCards,
    renderer: (data) => {
        createCard(data);
    },
}, cardsContainer
);

cardsList.addItems();
validateForms()