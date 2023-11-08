class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._password = options.password;
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
      password: this._password,
    }).then(this._handleResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      password: this._password,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse)
  }

  getCardsInfo() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      password: this._password,
    }).then(this._handleResponse)
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()]);
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      password: this._password,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse)
  }

  pressLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      password: this._password,
      headers: this._headers
    }).then(this._handleResponse)
  }

  unpressLike(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      password: this._password,
      headers: this._headers
    }).then(this._handleResponse)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      password: this._password,
      headers: this._headers
    }).then(this._handleResponse)
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      password: this._password,
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.unpressLike(id);
    } else {
      return this.pressLike(id);
    }
  }


};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  password: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;