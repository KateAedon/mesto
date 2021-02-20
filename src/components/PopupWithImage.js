import { Popup } from '../components/Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageName = this._popup.querySelector('.popup-image__name');
        this._popupBigImage = this._popup.querySelector('.popup-image__image');
    }

    openPopup(name, image, alt) {
        this._imageName = name;
        this._imageLink = image;

        this._popupBigImage.alt = alt; //`${this._imageName}`;
        this._popupBigImage.src = image;
        this._popupImageName.textContent = name;
        super.openPopup()
    }

}