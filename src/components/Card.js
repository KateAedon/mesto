export class Card {
    constructor( { name, link, likes, owner, _id, userId }, handleCardClick, handleDeleteCard, addLike, deleteLike, cardSelector ) {
        this._text = name;
        this._image = link;
        this._alt = name;
        this._cardOwnerId = owner._id;
        this._cardId = _id;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._likes = likes;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this._likeButton = this._likeButton.bind(this);
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
        this._element.querySelector('.card__name').textContent = this._text;

        this._deleteButton = this._element.querySelector('.card__button-delete');

        this._element.querySelector('.likes-counter').textContent = this._likes.length;
        this._likes.forEach((like) => {
            if (like._id === this._userId) {
                this._element.querySelector('.card__button-like').classList.add('card__button-like_active');
            }
        })

        this._checkCardOwner();
        this._setEventListeners();

        return this._element;
    }

    _checkCardOwner() {
        if (this._cardOwnerId !== this._userId) {
            this._deleteButton.remove();
        }
    }

    setLikesNumber(counter) {
        this._element.querySelector('.likes-counter').textContent = counter;
    }

    // метод установки слушателей событий (лайк, удаление, показать большое изображение)
    _setEventListeners() {
        this._element.querySelector('.card__button-like').addEventListener('click', this._likeButton);
        this._deleteButton.addEventListener('click', this._handleDeleteCard);
        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick(this._text, this._image, this._alt);
      });
    }

    _likeButton(evt) {
        if (!evt.target.classList.contains('card__button-like_active')) {
            this._element.querySelector('.card__button-like').classList.add('card__button-like_active');
            this._addLike();
        } else {
            this._element.querySelector('.card__button-like').classList.remove('card__button-like_active');
            this._deleteLike();
        }
    }

    //метод удаления карточки
    deleteCard() {
        this._element.remove();
    }

    returnCardId() {
        return this._cardId;
    }
}