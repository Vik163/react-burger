import { burgerApi } from '../../utils/burger-api';

import { addErrorIngredients } from './actionCreators';

import { GET_CARDS_REQUEST, GET_CARDS_SUCCESS } from './constants';
import { AppDispatch, TCard } from '../../utils/types';
import { TGetCardFailedAction } from './actionCreators';

export type TGetCardAction = {
  readonly type: typeof GET_CARDS_REQUEST;
};

export type TGetCardSuccessAction = {
  readonly type: typeof GET_CARDS_SUCCESS;
  readonly cards: Array<TCard> | [];
};

export type TBurgerIngredientsAction =
  | TGetCardAction
  | TGetCardSuccessAction
  | TGetCardFailedAction;

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
