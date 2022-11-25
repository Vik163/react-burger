import { getCookie } from './cookie';

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

  signIn(form) {
    return this._request('/login', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        password: form.password,
        email: form.email,
      }),
    });
  }

  signOut() {
    return this._request('/logout', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    });
  }

  updateToken() {
    return this._request('/token', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    });
  }

  getUser() {
    return this._request('/user', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
  }

  updateUser(form) {
    return this._request('/user', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name: form.name,
        password: form.password,
        email: form.email,
      }),
    });
  }
}

//
export const auth = new Auth({
  baseUrl: 'https://norma.nomoreparties.space/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});
