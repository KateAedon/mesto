export class Card {
    constructor(data, { handleCardClick }, cardSelector ) {
        this._text = data.name;
        this._image = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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

        this._setEventListeners('.card__image');

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
            this._handleCardClick(this._text, this._image, this._alt);
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

}
