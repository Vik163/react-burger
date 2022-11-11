import { CARD_ORDER } from '../actions/burger-ingredients-card';

const initialState = {
  cardOrder: null,
};

export const burgerIngredientsCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_ORDER: {
      return {
        ...state,
        cardOrder: action.cardOrder,
      };
    }
    default: {
      return state;
    }
  }
};
