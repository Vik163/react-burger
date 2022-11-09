import { burgerApi } from '../../utils/burger-api';

export const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILED = 'GET_CARDS_FAILED';

export function getCards() {
  return function (dispatch) {
    dispatch({
      type: GET_CARDS_REQUEST,
    });
    burgerApi
      .getIngredients()
      .then(
        (res) =>
          res.data &&
          dispatch({
            type: GET_CARDS_SUCCESS,
            cards: res.data,
          })
      )
      .catch((err) => {
        err === 404
          ? dispatch({
              type: GET_CARDS_FAILED,
              statusRequest: err,
              messageError: 'Запрашиваемые файлы не найдены',
            })
          : dispatch({
              type: GET_CARDS_FAILED,
              statusRequest: err,
              messageError: 'Внутренняя ошибка сервера',
            });
      });
  };
}
