import { Dispatch } from 'redux';

import { burgerApi } from '../../utils/burger-api';

import { addErrorOrder } from './actionCreators';

import { SEND_ORDER_REQUEST, SEND_ORDER_SUCCESS } from './constants';

import { setIngredients, setBun } from './burger-constructor';
import { setCardOrder } from './burger-constructor-card';

import { TCard } from '../../utils/types'


export function sendOrder(bun: TCard, ingredients: Array<TCard>) {
  if (bun) {
    const order = {
      ingredients: [bun._id, ...ingredients, bun._id],
    };
    return function (dispatch: Dispatch) {
      dispatch({
        type: SEND_ORDER_REQUEST,
      });
      burgerApi
        .sendOrder(order)
        .then((result) => {
          if (result) {
            dispatch({
              type: SEND_ORDER_SUCCESS,
              resultOrder: result,
            });
            dispatch(setCardOrder(null));
            dispatch(setBun({ bun: null }));
            dispatch(
              setIngredients({
                ingredients: [],
              })
            );
          }
        })
        .catch((err) => {
          if (err === 400) {
            dispatch(addErrorOrder(err, 'Переданы некорректные данные'));
          } else if (err === 404) {
            dispatch(addErrorOrder(err, 'Страница не найдена'));
          } else {
            dispatch(addErrorOrder(err, 'Внутренняя ошибка сервера'));
          }
        });
    };
  }
}
