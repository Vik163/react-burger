import { getCookie } from './cookie';

class BurgerApi {
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

  getIngredients() {
    return this._request('/ingredients', {
      headers: this._settings.headers,
    });
  }

  sendOrder(order) {
    return this._request('/orders', {
      method: 'POST',
      headers: this._settings.headers,
      body: JSON.stringify(order),
    });
  }

  forgotPassword(email) {
    return this._request('/password-reset', {
      method: 'POST',
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
        email: email,
      }),
    });
  }

  resetPassword(form) {
    return this._request('/password-reset/reset', {
      method: 'POST',
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
        password: form.password,
        token: form.token,
      }),
    });
  }
}

//
export const burgerApi = new BurgerApi({
  baseUrl: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
