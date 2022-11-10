import { v4 as uuidv4 } from 'uuid';

export const CARD_ORDER = 'CARD_ORDER';

export function setCardOrder(cardOrder, dataOrder) {
  const isIdRepeat =
    dataOrder.ingredients &&
    dataOrder.ingredients.some((i) => i._id === cardOrder._id);

  return function (dispatch) {
    dispatch({
      type: 'CARD_ORDER',
      cardOrder: { ...cardOrder, _id: isIdRepeat ? uuidv4() : cardOrder._id },
    });
  };
}
