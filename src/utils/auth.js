class Auth {
  constructor(settings) {
    this._settings = settings;
  }

  // Проверка полученного ответа -------------------------
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(`${this._settings.baseUrl}${url}`, options).then(
      this._checkResponse
    );
  }

  signUp(form) {
    return this._request('/register', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        name: form.name,
        password: form.password,
        email: form.email,
      }),
    });
  }

  registration(name, password, email) {
    return fetch(`${this._settings.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  authorization(password, email) {
    return fetch(`${this._settings.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  checkToken(jwt) {
    return fetch(`${this._settings.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: jwt,
      },
    }).then(this._checkResponse);
  }
}

//
export const auth = new Auth({
  baseUrl: 'https://norma.nomoreparties.space/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});
