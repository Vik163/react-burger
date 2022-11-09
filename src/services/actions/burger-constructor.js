import { burgerApi } from '../../utils/burger-api';

export const DATA_ORDER = 'DATA_ORDER';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export function setDataOrder(dataOrder) {
  return function (dispatch) {
    dispatch({
      type: 'DATA_ORDER',
      dataOrder: { bun: dataOrder.bun, ingredients: dataOrder.ingredients },
    });
  };
}

export function sendOrder(dataOrder) {
  return function (dispatch) {
    const ingredients = dataOrder.ingredients
      .filter((item) => !(item.type === 'bun'))
      .map((item) => item._id);
    if (dataOrder) {
      const order = {
        ingredients: [dataOrder.bun._id, ...ingredients, dataOrder.bun._id],
      };

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
    }
  };
}
