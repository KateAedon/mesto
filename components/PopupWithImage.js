import { Popup } from '../components/Popup.js';
import { popupImageName } from '../utils/constants.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    openPopup(data) {
        this._imageName = data.name;
        this._imageLink = data.link;

        this._popupBigImage = this._popup.querySelector('.popup-image__image');
        this._popupBigImage.alt = `${this._imageName}`;
        this._popupBigImage.src = this._imageLink;
        popupImageName.textContent = this._imageName;
        super.openPopup()
    }

}