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

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const addButton = document.querySelector('.profile__add-button');
const templateElement = document.querySelector('.card-template');
const cardsContainer = document.querySelector('.cards__list');
const popupImage = document.querySelector('.popup-image');
const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const cardNameInput = document.querySelector('.form__input_type_place');
const cardLinkInput = document.querySelector('.form__input_type_link');
const profileFormElement = document.querySelector('.popup-profile__container');
const profileInput = profileFormElement.querySelector('.form__input_type_name');
const cardFormElement = document.querySelector('.popup-card__container');

const showBigImage = (link, name) => {
    openPopup(popupImage);
    const text = document.querySelector('.popup-image__name');
    const image = document.querySelector('.popup-image__image');
    text.textContent = name;
    image.alt = name;
    image.src = link;
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfile);;
}

function cardFormSubmitHandler(evt) {
    evt.preventDefault();
    addElement(createCard(cardNameInput.value, cardLinkInput.value));
    closePopup(popupCard);
    const form = document.querySelector('.card-form');
    form.reset();
}

function createCard(name, link) { 
    const element = templateElement.content.cloneNode(true);
    const image = element.querySelector('.card__image');
    image.src = link;
    image.alt = name;
    element.querySelector('.card__name').textContent = name;
    const deleteButton = element.querySelector('.card__button-delete');
    deleteButton.addEventListener('click', deleteCard); 
    const likeButton = element.querySelector('.card__button-like');
    likeButton.addEventListener('click', likeCard);
    image.addEventListener('click', function() {
        showBigImage(link, name)
    });
    return(element);
} 

function addElement (item) {
    cardsContainer.prepend(item);
  }

function renderList() {
    initialCards.forEach( function (card) {
    addElement(createCard(card.name, card.link));
    });
}

function openPopup(popupType) {
    popupType.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
    document.addEventListener('click', closeByOverlayClick);
}

const closePopupEscape = (evt) => {
    if (evt.key === 'Escape') {
        const activePopup = document.querySelector('.popup_opened');
        closePopup(activePopup);
    }
}

const closeByOverlayClick = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(evt.target);
     }
  }

const imageCloseButton = document.querySelector('.popup-image__close-button');
const cardCloseButton = document.querySelector('.popup-card__close-button');
const profileCloseButton = document.querySelector('.popup-profile__close-button');

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
    document.removeEventListener('click', closeByOverlayClick);
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

function likeCard(evt) {
    evt.target.closest('.card__button-like').classList.toggle('card__button-like_active');
}

function deleteCard(event) {
    event.target.parentNode.remove();
}

editButton.addEventListener('click', function() {
    openPopup(popupProfile);
    profileName.value = nameInput.textContent ;
    profileDescription.value = descriptionInput.textContent;
});

profileFormElement.addEventListener('submit', formSubmitHandler);

addButton.addEventListener('click', function() {
    openPopup(popupCard);
});

cardFormElement.addEventListener('submit', cardFormSubmitHandler); 

renderList();