export class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    getProfileInfo() {
        return fetch(`${this.url}/users/me`, {
            method: "GET",
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Сервер недоступен')
        });
    }

    putLike() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "PUT",
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Сервер недоступен')
        });
    }

    deleteLike() {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Сервер недоступен')
        });
    }

    saveProfileInfo(data) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })  
        })
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: "GET",
            headers: this.headers
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Сервер недоступен')
        });
    }

    addCard(data){
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('Что-то пошло не так')
        }); 
    }

    deleteCard(id){
        return fetch(`${this.url}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
        })
    }
}
