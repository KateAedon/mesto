import './index.css';
import { Api } from '../components/Api.js';
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
    cardsContainer,
    editButton,
    addButton,
    nameInput,
    descriptionInput,
    popupCard, 
    validationConfig,
    profileForm,
    cardForm,
    profileAvatar
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
        saveProfileInfo(data);
        profileInfo.setUserInfo(data);
        editProfilePopup.closePopup();
    }
});

const addCardPopup = new PopupWithForm(
    popupCard, addCardValidator, {
        handleFormSubmit: (data) => {
            saveCard(data);
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
        { 
            handleCardClick: () => {
            fullsizePopup.openPopup(data);
        }, 
            handleDeleteCard: (cardId) => {
            api
            .deleteCard(cardId)
            .then(() => {
                card.deleteCard();
            })
            .catch(err => console.log(err))
        },
           // handleLikeClick: () => {
            //api
          //      .
           // }
    },
        '.card-template');
    return card;
}

function appendCard(card) {
    const cardElement = card.generateCard();
    cardsContainer.prepend(cardElement);
    return cardElement;
}


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      'content-type': 'application/json',
      'authorization': '0f482ff9-d2c6-492c-9e7d-f39cea7fb85c'
  },
})

function getInitialProfileData() {
    api
    .getProfileInfo()
    .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.src = data.avatar;
    })
}

getInitialProfileData();

function saveCard(data) {
    api
        .addCard(data)
        .then((data) => {
            return data;
        })
        .catch(err => console.log(err))
}

function saveProfileInfo(data) {
    api
        .saveProfileInfo(data)
        .then((data) => {
            return data;
        })
        .catch(err => console.log(err))
}


api
    .getInitialCards()
    .then((data) => {
        const cardsList = new Section ({
            data: data,
            renderer: (data) => {
                const newCard = createCard(data);
                appendCard(newCard);
            },
        }, cardsContainer
        );
        cardsList.addItems();
})
    .catch(err => console.log(err))



validateForms()