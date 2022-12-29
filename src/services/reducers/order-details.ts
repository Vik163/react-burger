import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  DELETE_RESULT_ORDER,
} from '../actions/constants';
import { TResultOrder } from '../../utils/types';
import { TTypesActions } from '../../utils/types';

export type TOrderDetailsInitialState = {
  dataOrderRequest: boolean;
  dataOrderFailed: boolean;
  resultOrder: null | TResultOrder;
  statusRequest: string | null;
  messageError: string;
  loader: boolean;
};

const initialState: TOrderDetailsInitialState = {
  dataOrderRequest: false,
  dataOrderFailed: false,
  resultOrder: null,
  statusRequest: null,
  messageError: '',
  loader: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TTypesActions
): TOrderDetailsInitialState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        dataOrderRequest: true,
        loader: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        dataOrderFailed: false,
        dataOrderRequest: false,
        resultOrder: action.resultOrder,
        loader: false,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        dataOrderFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        dataOrderRequest: false,
        loader: false,
      };
    }
    case DELETE_RESULT_ORDER: {
      return {
        ...state,
        resultOrder: action.resultOrder,
      };
    }
    default: {
      return state;
    }
  }
};
