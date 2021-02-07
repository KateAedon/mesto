export class UserInfo {
    constructor( profileName, profileDescription ) {
        this._name = profileName;
        this._description = profileDescription;
     }

    getUserInfo() {
        const data = {
            name: this._name.textContent,
            description: this._description.textContent
        };
        return data;
    }

    setUserInfo({name, description}) {
        this._name.textContent = name;
        this._description.textContent = description;
    }
}