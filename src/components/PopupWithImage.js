import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageName = this._popup.querySelector('.popup-image__name');
        this._popupBigImage = this._popup.querySelector('.popup-image__image');
    }

    openPopup(data) {
        this._imageName = data.name;
        this._imageLink = data.link;

        this._popupBigImage.alt = `${this._imageName}`;
        this._popupBigImage.src = this._imageLink;
        this._popupImageName.textContent = this._imageName;
        super.openPopup()
    }

}