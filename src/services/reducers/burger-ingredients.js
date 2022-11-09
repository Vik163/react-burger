import {
  GET_CARDS_FAILED,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  TAB_SWITCH,
  GET_RECOMMENDED_CARDS_FAILED,
  GET_RECOMMENDED_CARDS_REQUEST,
  GET_RECOMMENDED_CARDS_SUCCESS,
} from '../actions/burger-ingredients';

const initialState = {
  cards: [],
  cardsRequest: false,
  cardsFailed: false,
  statusRequest: null,
  messageError: '',
  recommendedCards: [],
  recommendedCardsRequest: false,
  recommendedCardsFailed: false,
  currentTab: 'cards',
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case TAB_SWITCH: {
      return {
        ...state,
        currentTab: state.currentTab === 'cards' ? 'postponed' : 'cards',
      };
    }
    case GET_RECOMMENDED_CARDS_REQUEST: {
      return {
        ...state,
        recommendedCardsRequest: true,
      };
    }
    case GET_RECOMMENDED_CARDS_SUCCESS: {
      return {
        ...state,
        recommendedCardsFailed: false,
        recommendedCards: action.CARDS,
        recommendedCardsRequest: false,
      };
    }
    case GET_RECOMMENDED_CARDS_FAILED: {
      return {
        ...state,
        recommendedCardsFailed: true,
        recommendedCardsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
