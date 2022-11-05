class BurgerApi {
  constructor(settings) {
    this._settings = settings;
  }

  // Проверка полученного ответа -------------------------
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getIngredients() {
    return fetch(`${this._settings.baseUrl}/ingredients`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._checkResponse);
  }

  sendOrder(order) {
    return fetch(`${this._settings.baseUrl}/orders `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }).then(this._checkResponse);
  }
}

//
export const burgerApi = new BurgerApi({
  baseUrl: 'https://norma.nomoreparties.space/api',
});
