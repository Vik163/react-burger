import { getCookie } from './cookie';

class Auth {
  private _settings: {
    baseUrl: string; headers: {
      'Content-Type': string;
    };
  };
  constructor(settings: { baseUrl: string; headers: { 'Content-Type': string; }; }) {
    this._settings = settings;
  }

  // Проверка полученного ответа -------------------------
  _checkResponse(res: any) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url: string, options: any) {
    return fetch(`${this._settings.baseUrl}${url}`, options).then(
      this._checkResponse
    );
  }

  signUp(form: {name: string; password: string; email: string}) {
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

  signIn(form: {password: string; email: string}) {
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

  updateUser(form: {name: string; password: string; email: string}) {
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
