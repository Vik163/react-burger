import {
  INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
} from '../actions/constants';
import { TIngredientDetailsInitialState } from './reducers-types';
import { TTypesActions } from '../actions/actions-types';

const initialState: TIngredientDetailsInitialState = {
  ingredientDetails: JSON.parse(localStorage.getItem('card') as string) || {},
};

export const ingredientDetailsReducer = (
  state = initialState,
  action: TTypesActions
): TIngredientDetailsInitialState => {
  switch (action.type) {
    case INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.ingredientDetails,
      };
    }
    case DELETE_INGREDIENT_DETAILS: {
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
