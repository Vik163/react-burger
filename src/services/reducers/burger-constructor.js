import {
  DATA_ORDER,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from '../actions/burger-constructor';

const initialState = {
  dataOrder: {},
  bun: {},
  ingredients: [],
  dataOrderRequest: false,
  dataOrderFailed: false,
  resultOrder: null,
  statusRequest: null,
  messageError: '',
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_ORDER: {
      return {
        ...state,
        dataOrder: {
          bun: action.dataOrder.bun,
          ingredients: action.dataOrder.ingredients,
        },
      };
    }

    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        dataOrderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        dataOrderFailed: false,
        //       dataOrder: action.cards,
        dataOrderRequest: false,
        resultOrder: action.resultOrder,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        dataOrderFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        dataOrderRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
