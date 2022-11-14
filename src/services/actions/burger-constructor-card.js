import { v4 as uuidv4 } from 'uuid';

import { CARD_ORDER } from './constants';

export function setCardOrder(item, cardOrder, ingredients) {
  return function (dispatch) {
    const isIdRepeat = () => {
      if (ingredients && cardOrder) {
        return (
          item._id === cardOrder._id ||
          ingredients.some((i) => i._id === item._id)
        );
      }
      return false;
    };

    dispatch({
      type: CARD_ORDER,
      cardOrder: { ...item, uuid: isIdRepeat() && uuidv4() },
    });
  };
}
