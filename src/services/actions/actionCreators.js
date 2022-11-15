import { SEND_ORDER_FAILED, GET_CARDS_FAILED } from './constants';

export const addErrorOrder = (err, messageError) => {
  return {
    type: SEND_ORDER_FAILED,
    statusRequest: err,
    messageError,
  };
};

export function addErrorIngredients(err, messageError) {
  return {
    type: GET_CARDS_FAILED,
    statusRequest: err,
    messageError,
  };
}
