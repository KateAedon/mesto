import { openPopup, popupImage} from './index.js';

export class Card {
    constructor(name, link, cardSelector) {
        this._text = name;
        this._image = link;
        this._cardSelector = cardSelector;
    }
    // метод создания шаблона карточки
    _getTemplate() {
        const cardTemplate = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
        return cardTemplate;
    }

    // метод для заполнения нового шаблона данными
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').src = this._image;
        this._element.querySelector('.card__image').alt = this._image;
        this._element.querySelector('.card__name').textContent = this._text;

        this._setEventListeners();

        return this._element;
    }

    // метод установки слушателей событий (лайк, удаление, показать большое изображение)
    _setEventListeners() {
        this._element.querySelector('.card__button-like').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._element.querySelector('.card__button-delete').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        }); 
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._showBigImage();
        });
    }

    // метод переключения состояния кнопки "лайк"
    _likeCard(evt) {
        evt.target.classList.toggle('card__button-like_active');
    }

    //метод удаления карточки
    _deleteCard(event) {
        event.target.closest('.card').remove();
    }

    //метод вызова попапа с большим изображением 
    _showBigImage() {
        const popupImageElement = popupImage.querySelector('.popup-image__image');
        popupImageElement.alt = this._text;
        popupImageElement.src = this._image;
        popupImage.querySelector('.popup-image__name').textContent = this._text;
        openPopup(popupImage);
    }
}