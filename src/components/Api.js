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

    getInitialData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
    }

    putLike() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this.headers
        }).then(this._handleResponse)
    }

    deleteLike() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this.headers
        }).then(this._handleResponse)
    }

    saveProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })  
        }).then(this._handleResponse)
    }

    addCard(data){
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        }).then(this._handleResponse)
    }

    deleteCard(id){
        return fetch(`${this.url}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(this._handleResponse)
    }
}
