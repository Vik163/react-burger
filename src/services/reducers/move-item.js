import { CARD_MOVE } from '../actions/move-item';

const initialState = {
  // ingredientsMove: null,
  dragIndex: null,
  hoverIndex: null,
  ingredients: null,
};

export const moveItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_MOVE:
      const ingredientsMove = [...action.ingredients];

      ingredientsMove.splice(
        action.dragIndex,
        0,
        ingredientsMove.splice(action.hoverIndex, 1)[0]
      );

      return {
        ...state,
        ingredientsMove: action.ingredientsMove,
      };

    default: {
      return state;
    }
  }
};
