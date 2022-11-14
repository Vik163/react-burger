export const CARD_MOVE = 'CARD_MOVE';

export function setCardMove(dragIndex, hoverIndex) {
  return function (dispatch) {
    dispatch({
      type: 'CARD_MOVE',
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };
}
