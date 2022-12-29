import { CARD_MOVE } from './constants';

export type TCardMove = {
  readonly type: typeof CARD_MOVE;
  readonly dragIndex: number;
  readonly hoverIndex: number;
};

export function setCardMove(dragIndex: number, hoverIndex: number) {
  return {
    type: CARD_MOVE,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  };
}
