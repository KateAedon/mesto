export class Card {
    constructor(data, { handleCardClick, handleDeleteCard, handleLikeClick }, cardSelector ) {
        this._text = data.name;
        this._image = data.link;
        this._alt = data.name;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._likeCounter = data.likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
      }

       // метод создания шаблона карточки
    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true); 
        return cardTemplate;
    }

    // метод для заполнения нового шаблона данными
    generateCard() {
        this._element = this._getTemplate();
        const cardImage = this._element.querySelector('.card__image');
        cardImage.src = this._image;
        cardImage.alt = this._alt;
        this._element.querySelector('.likes-counter').textContent = this._likeCounter.length;
        this._element.querySelector('.card__name').textContent = this._text;
        
        this._setEventListeners('.card__image');

          return this._element;
    }

    // метод установки слушателей событий (лайк, удаление, показать большое изображение)
    _setEventListeners() {
          this._element.querySelector('.card__button-like').addEventListener('click', (evt) => {
            this._likeCard(evt);
        });
        this._element.querySelector('.card__button-delete').addEventListener('click', () => {
            this._handleDeleteCard(this._id);
        }); 
      this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image, this._alt);
      });
    }

    // метод переключения состояния кнопки "лайк"
    _likeCard(evt) {
        evt.target.classList.toggle('card__button-like_active');
    }

    //метод удаления карточки
    deleteCard() {
        this._element.remove();
    }
}