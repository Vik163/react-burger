import {
  GET_CARDS_FAILED,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
} from '../actions/burger-ingredients';
import {
  MODAL_INGREDIENTS_OPEN,
  MODAL_INGREDIENTS_CLOSE,
} from '../actions/modal';

const initialState = {
  cards: [],
  isOpen: false,
  title: '',
  cardsRequest: false,
  cardsFailed: false,
  statusRequest: null,
  messageError: '',
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_INGREDIENTS_OPEN:
      return {
        ...state,
        isOpen: true,
        title: action.title,
      };
    case MODAL_INGREDIENTS_CLOSE:
      return {
        ...state,
        isOpen: false,
        title: action.title,
      };
    case GET_CARDS_REQUEST: {
      return {
        ...state,
        cardsRequest: true,
      };
    }
    case GET_CARDS_SUCCESS: {
      return {
        ...state,
        cardsFailed: false,
        cards: action.cards,
        cardsRequest: false,
      };
    }
    case GET_CARDS_FAILED: {
      return {
        ...state,
        cardsFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        cardsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
