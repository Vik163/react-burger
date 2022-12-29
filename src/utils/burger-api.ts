import { BASE_URL } from './constants';
import { getCookie } from './cookie';
import { TOrder } from './types';

class BurgerApi {
  private _settings: {
    baseUrl: string;
    headers: {
      'Content-Type': string;
    };
  };
  constructor(settings: {
    baseUrl: string;
    headers: { 'Content-Type': string };
  }) {
    this._settings = settings;
  }

  // Проверка полученного ответа -------------------------
  _checkResponse(res: Response) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  _request(url: string, options: RequestInit) {
    return fetch(`${this._settings.baseUrl}${url}`, options).then(
      this._checkResponse
    );
  }

  getIngredients() {
    return this._request('/ingredients', {
      headers: this._settings.headers,
    });
  }

  sendOrder(order: TOrder) {
    return this._request('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify(order),
    });
  }

  forgotPassword(email: string) {
    return this._request('/password-reset', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        email: email,
      }),
    });
  }

  resetPassword(form: { password: string; token: string }) {
    return this._request('/password-reset/reset', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        password: form.password,
        token: form.token,
      }),
    });
  }

  signUp(form: { name: string; password: string; email: string }) {
    return this._request('/auth/register', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        name: form.name,
        password: form.password,
        email: form.email,
      }),
    });
  }

  signIn(form: { password: string; email: string }) {
    return this._request('/auth/login', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        password: form.password,
        email: form.email,
      }),
    });
  }

  signOut() {
    return this._request('/auth/logout', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    });
  }

  updateToken() {
    return this._request('/auth/token', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify({
        token: getCookie('refreshToken'),
      }),
    });
  }

  getUser() {
    return this._request('/auth/user', {
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

  updateUser(form: { name: string; password: string; email: string }) {
    return this._request('/auth/user', {
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
export const burgerApi = new BurgerApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
