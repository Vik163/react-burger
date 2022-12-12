class BurgerApi {
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

  getIngredients() {
    return this._request('/ingredients', {
      headers: this._settings.headers,
    });
  }

  sendOrder(order: Array<string>) {
    return this._request('/orders', {
      method: 'POST',
      headers: this._settings.headers,
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

  resetPassword(form: {password: string; token: string}) {
    return this._request('/password-reset/reset', {
      method: 'POST',
      headers: this._settings.headers,
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
