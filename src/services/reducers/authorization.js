import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../actions/constants';

const initialState = {
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  statusRequest: null,
  messageError: '',
  formReset: false,
  loader: false,
};

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loader: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        formReset: true,
        loader: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        loginRequest: false,
        loader: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        logoutRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
