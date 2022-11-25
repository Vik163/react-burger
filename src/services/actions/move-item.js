import { CARD_MOVE } from './constants';

export function setCardMove(dragIndex, hoverIndex) {
  return {
    type: CARD_MOVE,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
}
