import { burgerApi } from '../../utils/burger-api';

export const DATA_INGREDIENTS = 'DATA_INGREDIENTS';
export const DATA_BUN = 'DATA_BUN';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function setBun({ bun }) {
  return function (dispatch) {
    dispatch({
      type: 'DATA_BUN',
      bun: bun,
    });
  };
}

export function setIngredients({ ingredients }) {
  return function (dispatch) {
    dispatch({
      type: 'DATA_INGREDIENTS',
      ingredients: ingredients,
    });
  };
}

export function sendOrder(bun, ingredients) {
  const ingredientsOrder = ingredients
    .filter((item) => !(item.type === 'bun'))
    .map((item) => item._id);
  if (bun) {
    const order = {
      ingredients: [bun._id, ...ingredientsOrder, bun._id],
    };
    return function (dispatch) {
      dispatch({
        type: SEND_ORDER_REQUEST,
      });
      burgerApi
        .sendOrder(order)
        .then(
          (result) =>
            result &&
            dispatch({
              type: SEND_ORDER_SUCCESS,
              resultOrder: result,
            })
        )
        .catch((err) => {
          err === 400
            ? dispatch({
                type: SEND_ORDER_FAILED,
                statusRequest: err,
                messageError: 'Переданы некорректные данные',
              })
            : dispatch({
                type: SEND_ORDER_FAILED,
                statusRequest: err,
                messageError: 'Внутренняя ошибка сервера',
              });
        });
    };
  }
}
