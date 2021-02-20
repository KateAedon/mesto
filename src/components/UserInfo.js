export class UserInfo {
    constructor({ profileName, profileDescription, profileAvatar }) {
        this._name = profileName;
        this._about = profileDescription;
        this._avatar = profileAvatar;
     }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    setUserInfo( data ) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
       // this.setUserAvatar(data);
    }

    setUserAvatar(data) {
        this._avatar.src = data.newAvatar === '' ? this._avatar.src : data.newAvatar;
      }

    setUserId(id) {
        this._userId = id;
    }
    returnUserId() {
        return this._userId;
    }
}