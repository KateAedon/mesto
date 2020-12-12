const editButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup-profile__close-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup-profile');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileFormElement = document.querySelector('.popup-profile__container');
const cardNameInput = document.querySelector('.form__input_type_place');
const cardLinkInput = document.querySelector('.form__input_type_link');
const cardFormElement = document.querySelector('.popup-card__container');
const popupCard = document.querySelector('.popup-card');
const addButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.popup-card__close-button');
const templateElement = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards__list');
const imageCloseButton = document.querySelector('.popup-image__close-button');
const popupImage = document.querySelector('.popup-image');
const popup = document.querySelector('.popup');

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

const popupContainer = document.querySelector('.popup__container');

function toggleProfilePopup() {
    openPopup(popupProfile);
    profileName.value = nameInput.textContent ;
    profileDescription.value = descriptionInput.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfile);;
}

function makeCard(card) {
    const newCard = templateElement.content.cloneNode(true);
    const image = newCard.querySelector('.card__image');
    image.src = card.link;
    image.alt = card.name;
    newCard.querySelector('.card__name').textContent = card.name;
    const deleteButton = newCard.querySelector('.card__button-delete');
    deleteButton.addEventListener('click', deleteCard); 
    const likeButton = newCard.querySelector('.card__button-like');
    likeButton.addEventListener('click', likeCard);
    image.addEventListener('click', function() {
        showBigImage(card.link, card.name)
    });
    cardsContainer.append(newCard);
}

function addNewCard(card) {
    const newCard = templateElement.content.cloneNode(true);
    const image = newCard.querySelector('.card__image');
    image.src = cardLinkInput.value;
    newCard.querySelector('.card__name').textContent = cardNameInput.value;
    image.alt = cardNameInput.value;
    const deleteButton = newCard.querySelector('.card__button-delete');
    deleteButton.addEventListener('click', deleteCard);
    const likeButton = newCard.querySelector('.card__button-like');
    likeButton.addEventListener('click', likeCard); 
    
    image.addEventListener('click', function() {
        showBigImage(cardLinkInput.value, cardNameInput.value)
    });
    cardsContainer.prepend(newCard);
}

function openPopup(popupType) {
    popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addNewCard();
    closePopup(popupCard);
}

function likeCard(evt) {
    evt.target.closest('.card__button-like').classList.toggle('card__button-like_active');
}

function deleteCard(event) {
    event.target.parentNode.remove();
}

const showBigImage = (link, name) => {
    popupImage.classList.add('popup_opened');
    const text = document.querySelector('.popup-image__name');
    const image = document.querySelector('.popup-image__image');
    text.textContent = name;
    image.alt = name;
    image.src = link;
}

initialCards.forEach(makeCard);

imageCloseButton.addEventListener('click', function() {
    closePopup(popupImage);
});
editButton.addEventListener('click', toggleProfilePopup);
profileCloseButton.addEventListener('click', function() {
    closePopup(popupProfile);
});
profileFormElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', function() {
    openPopup(popupCard);
});
cardCloseButton.addEventListener('click', function() {
    closePopup(popupCard);
});
cardFormElement.addEventListener('submit', cardFormSubmitHandler); 