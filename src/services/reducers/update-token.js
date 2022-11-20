import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from '../actions/constants';

const initialState = {
  tokenRequest: false,
  tokenFailed: false,
  statusRequest: null,
  messageError: '',
};

export const updateTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        tokenFailed: false,
        tokenRequest: false,
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        tokenRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
