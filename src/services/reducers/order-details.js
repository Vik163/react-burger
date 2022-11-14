import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from '../actions/constants';

const initialState = {
  dataOrderRequest: false,
  dataOrderFailed: false,
  resultOrder: null,
  statusRequest: null,
  messageError: '',
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
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
