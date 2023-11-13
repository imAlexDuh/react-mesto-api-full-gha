class Auth {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`);
        }
        return res.json();
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                password,
                email
            })
        }).then(this._handleResponse)
    }

    auth(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                password,
                email
            })
        }).then(this._handleResponse)
    }

    checkToken = () => {
        return fetch(`${this._url}/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: this._headers,
        }).then(this._handleResponse)
      };
}

const auth = new Auth({
    baseUrl: 'https://api.imalexduh.students.nomoredomainsmonster.ru',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  });
  
  export default auth;