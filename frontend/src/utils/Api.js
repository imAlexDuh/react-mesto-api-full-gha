class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse)
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then(this._handleResponse)
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()]);
  }

  addCard({ name, link} ) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._handleResponse)
  }

  pressLike(cId) {
    return fetch(`${this._url}/cards/${cId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleResponse)
  }

  unpressLike(cId) {
    return fetch(`${this._url}/cards/${cId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleResponse)
  }

  deleteCard(cId) {
    return fetch(`${this._url}/cards/${cId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    }).then(this._handleResponse)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(
        avatar
      )
    }).then(this._handleResponse)
  }

  changeLikeCardStatus(cId, isLiked) {
    if (isLiked) {
      return this.unpressLike(cId);
    } else {
      return this.pressLike(cId);
    }
  }


}; 

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
      'Content-Type': 'application/json'
  }
});

export default api;