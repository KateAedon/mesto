export class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
        this._name = profileName;
        this._about = profileDescription;
        this._avatar = profileAvatar;
     }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            about: this._about.textContent
        };
        return data;
    }

    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._about.textContent = about;
    }
}