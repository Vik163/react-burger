export const CARD_ORDER = 'CARD_ORDER';

export function setCardOrder(cardOrder) {
  return function (dispatch) {
    dispatch({
      type: 'CARD_ORDER',
      cardOrder: cardOrder,
    });
  };
}
