class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
         return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    updateUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)       
    }

    updateUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)       
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(cardID, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
                method: "Delete",
                headers: this._headers
            })
            .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
                method: "PUT",
                headers: this._headers
            })
            .then(this._checkResponse) 
        }
    }
}

const projectApi = new Api("https://around.nomoreparties.co/v1/group-12", 
{ authorization: "1ef576b8-6d38-4f6c-aed4-fbb58187f608", "Content-Type": "application/json" });

export default projectApi;
