import { v4 as uuidv4 } from 'uuid';

export const CARD_ORDER = 'CARD_ORDER';

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
      type: 'CARD_ORDER',
      cardOrder: { ...item, _id: isIdRepeat() ? uuidv4() : item._id },
    });
  };
}
