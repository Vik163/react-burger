import { CARD_MOVE } from './constants';

export function setCardMove(dragIndex, hoverIndex) {
  return function (dispatch) {
    dispatch({
      type: CARD_MOVE,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  };
}
