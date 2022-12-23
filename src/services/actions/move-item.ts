import { CARD_MOVE } from './constants';

export function setCardMove(dragIndex: number, hoverIndex: number) {
  return {
    type: CARD_MOVE,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
}
