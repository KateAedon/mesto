import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmDelete } from '../components/PopupWithConfirmDelete.js';
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
    profileAvatar,
    popupConfirm,
    editAvatarButton,
    popupAvatar,
    avatarForm
} from '../utils/constants.js';

const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, cardForm);
const changeAvatarValidator = new FormValidator(validationConfig, avatarForm);

const profileInfo = new UserInfo({ profileName, profileDescription, profileAvatar });
const deleteCardPopup = new PopupWithConfirmDelete(popupConfirm);
const fullsizePopup = new PopupWithImage(popupImage);

const editProfilePopup = new PopupWithForm(
    popupProfile, 
    editProfileValidator, 
    { handleFormSubmit: (data) => {
        renderLoading( popupProfile, true );
        profileInfo.setUserInfo(data);
        saveProfileInfo(data);
        editProfilePopup.closePopup();
    }
});

const addCardPopup = new PopupWithForm(
    popupCard, 
    addCardValidator, 
    { handleFormSubmit: (data) => {
        renderLoading( popupCard, true );
        saveCard(data);
        addCardPopup.closePopup();
    }
});

const changeAvatarPopup = new PopupWithForm(
    popupAvatar,
    changeAvatarValidator,
    { handleFormSubmit: (data) => {
        renderLoading( popupAvatar, true );
        saveNewAvatar(data);
        changeAvatarPopup.closePopup();

    }}
)

const cardsList = new Section ((item) => {
    cardsList.addItemLast(createCard(item));
}, cardsContainer)

fullsizePopup.setEventListeners();
addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
changeAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

editButton.addEventListener('click', () => {
    const userData = profileInfo.getUserInfo();
    nameInput.value = userData.name;
    descriptionInput.value = userData.about;
    editProfilePopup.openPopup();
});

addButton.addEventListener('click', function () {
    addCardPopup.openPopup();
});

editAvatarButton.addEventListener('click', function () {
    changeAvatarPopup.openPopup();
});

const handleCardClick = (name, image, alt) => {
    fullsizePopup.openPopup(name, image, alt);
}
function createCard({ name, link, likes, owner, _id }) {
    const card = new Card( 
        { name, link, likes, owner, _id, userId: profileInfo.returnUserId() }, 
        handleCardClick, 
        () => {
            deleteCardPopup.openPopup(deleteCard(card));
        }, () => {
            api
            .addLike(card.returnCardId())
            .then(res => card.setLikesNumber(res.likes.length))
        }, () => {
            api
            .deleteLike(card.returnCardId())
            .then(res => card.setLikesNumber(res.likes.length))
        }, 
            '.card-template'
        );
        return card.generateCard();
    }

function renderLoading( popupSelector, isLoading ) {
    const button = popupSelector.querySelector('.form__save-button');
    if (isLoading) {
        button.textContent = 'Loading...';
    } else {
        if (popupSelector === popupCard) {
            button.textContent = 'Создать';

        } else {
            button.textContent = 'Сохранить';

        }
    }
}

//Работа с АПИ

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-20',
    headers: {
      'content-type': 'application/json',
      'authorization': '0f482ff9-d2c6-492c-9e7d-f39cea7fb85c'
  },
})

api
    .getInitialCards()
    .then(res => {
        cardsList.renderItems(res)
    })
    .catch((err) => {
        console.log(err)
    })

api
    .getProfileInfo()
    .then(res => {
        profileInfo.setUserInfo(res);
        profileInfo.setUserId(res._id);
    })
    .catch((err) => {
        console.log(err)
    })

const deleteCard = (card) => {
    return () => {
        api
        .deleteCard(card.returnCardId())
        .then(() => {
            deleteCardPopup.closePopup();
            card.deleteCard();
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

function saveProfileInfo(data) {
    api
        .saveProfileInfo(data)
        .then((data) => {
            return data;
        })
        .catch(err => console.log(err))
}

function saveCard(data) {
    api
        .addCard( data )
        .then((res) => {
            cardsList.addItemLast(createCard(res));
            renderLoading( popupCard, false);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally
}

function saveNewAvatar(data) {
    api
    .saveAvatar(data.newAvatar)
    .then((res) => {
    profileInfo.setUserAvatar(res);
    })
    .catch((err) => {
        console.log(err)
    })
    .finally
    renderLoading( popupAvatar, false )
}

function validateForms () {
    editProfileValidator.enableValidation();
    addCardValidator.enableValidation();
    changeAvatarValidator.enableValidation();
}

validateForms()