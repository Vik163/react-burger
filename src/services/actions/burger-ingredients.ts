import { burgerApi } from '../../utils/burger-api';

import { addErrorIngredients } from './actionCreators';

import { GET_CARDS_REQUEST, GET_CARDS_SUCCESS } from './constants';
import { AppDispatch } from '../../utils/types';

export function getCards() {
  return function (dispatch: AppDispatch) {
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
          ? dispatch(addErrorIngredients(err, 'Запрашиваемые файлы не найдены'))
          : dispatch(addErrorIngredients(err, 'Внутренняя ошибка сервера'));
      });
  };
}
