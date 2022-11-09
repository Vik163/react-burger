import { INGREDIENT_DETAILS } from '../actions/ingredient-details';

const initialState = {
  ingredientDetails: {},
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredientDetails,
      };
    }

    default: {
      return state;
    }
  }
};
