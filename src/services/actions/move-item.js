export const CARD_MOVE = 'CARD_MOVE';

export function setCardMove(dragIndex, hoverIndex, ingredients) {
  return function (dispatch) {
    dispatch({
      type: 'CARD_MOVE',
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
      ingredients: ingredients,
    });
  };
}
