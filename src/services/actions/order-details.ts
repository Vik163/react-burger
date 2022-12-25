import { burgerApi } from '../../utils/burger-api';

import { addErrorOrder } from './actionCreators';

import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  DELETE_RESULT_ORDER,
} from './constants';
import { TCard, AppDispatch, TOrder } from '../../utils/types';

import { setIngredients, setBun } from './burger-constructor';
import { setCardOrder } from './burger-constructor-card';
import { TResultOrder } from '../../utils/types';
import { TSendOrderFailedAction } from './actionCreators';

export type TSendOrderRequestAction = {
  readonly type: typeof SEND_ORDER_REQUEST;
};

export type TSendOrderSuccessAction = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly resultOrder: TResultOrder;
};

export type TDeleteResultOrderAction = {
  readonly type: typeof DELETE_RESULT_ORDER;
  readonly resultOrder: null;
};

export type TSendOrderAction =
  | TSendOrderRequestAction
  | TSendOrderSuccessAction
  | TSendOrderFailedAction
  | TDeleteResultOrderAction;

export const sendOrder = (bun: TCard, ingredients: Array<TCard>) => {
  const ingredientsId = ingredients.map((item) => item._id);
  const order = {
    ingredients: [bun._id, ...ingredientsId, bun._id],
  };

  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    burgerApi
      .sendOrder(order as TOrder)
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
};

export function deleteResultOrder() {
  return {
    type: DELETE_RESULT_ORDER,
    resultOrder: null,
  };
}
