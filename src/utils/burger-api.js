class BurgerApi {
  constructor(settings) {
    this._settings = settings;
  }

  // Проверка полученного ответа -------------------------
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getIngredients() {
    return fetch(`${this._settings.baseUrl}/ingredients`).then(
      this._checkResponse
    );
  }
}

//
export const burgerApi = new BurgerApi({
  baseUrl: 'https://norma.nomoreparties.space/api',
});
