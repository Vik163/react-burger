import {
  GET_CARDS_FAILED,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
} from '../actions/constants';
import { TIngredientsInitialState } from './reducers-types';
import { TTypesActions } from '../actions/actions-types';

const initialState: TIngredientsInitialState = {
  cards: [],
  cardsRequest: false,
  cardsFailed: false,
  statusRequest: null,
  messageError: '',
  loader: false,
};

export const burgerIngredientsReducer = (
  state = initialState,
  action: TTypesActions
): TIngredientsInitialState => {
  switch (action.type) {
    case GET_CARDS_REQUEST: {
      return {
        ...state,
        cardsRequest: true,
        loader: true,
      };
    }
    case GET_CARDS_SUCCESS: {
      return {
        ...state,
        cardsFailed: false,
        cards: action.cards,
        cardsRequest: false,
        loader: false,
      };
    }
    case GET_CARDS_FAILED: {
      return {
        ...state,
        cardsFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        cardsRequest: false,
        loader: false,
      };
    }
    default: {
      return state;
    }
  }
};
