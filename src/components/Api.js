export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _handleResponse(res) {
        if (!res.ok ) {
            return Promise.reject(console.log(`Ой, что-то пошло не так. Ошибка ${res.status}`));
        }
        return res.json();
    }

    getProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then(this._handleResponse)
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: "GET",
            headers: this.headers
        }).then(this._handleResponse)
    }

    addLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this.headers
        }).then(this._handleResponse)
    }

    deleteLike(cardId) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this.headers
        }).then(this._handleResponse)
    }

    saveProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data)  
        }).then(this._handleResponse)
    }

    saveAvatar(url) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({ 
            avatar: url
            })  
        }).then(this._handleResponse)
    }

    addCard(data) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(this._handleResponse)
    }

    deleteCard(cardId){
        return fetch(`${this.url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(this._handleResponse)
    }
}
