import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/constants';

const initialState = {
  registerRequest: false,
  registerFailed: false,
  resultOrder: null,
  statusRequest: null,
  messageError: '',
  loader: false,
};

export const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        loader: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        resultOrder: action.resultOrder,
        loader: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        registerRequest: false,
        loader: false,
      };
    }
    default: {
      return state;
    }
  }
};
