import { getCookie } from '../../utils/cookie';
import { TTypesActions } from '../../utils/types';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
} from '../actions/constants';

export type TAuthorizationInitialState = {
  loggedIn: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  tokenRequest: boolean;
  tokenFailed: boolean;
  statusRequest: null | string;
  messageError: string;
  formReset: boolean;
  loader: boolean;
};

const initialState: TAuthorizationInitialState = {
  loggedIn: getCookie('token') ? true : false,
  registerRequest: false,
  registerFailed: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  tokenRequest: false,
  tokenFailed: false,
  statusRequest: null,
  messageError: '',
  formReset: false,
  loader: false,
};

export const authorizationReducer = (
  state = initialState,
  action: TTypesActions
): TAuthorizationInitialState => {
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
        formReset: true,
        loader: false,
        loggedIn: true,
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
        loggedIn: false,
      };
    }
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
        loggedIn: true,
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
        loggedIn: false,
      };
    }
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
        loggedIn: true,
      };
    }
    case TOKEN_FAILED: {
      return {
        ...state,
        tokenFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        tokenRequest: false,
        loggedIn: false,
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
        loggedIn: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        logoutRequest: false,
        loggedIn: true,
      };
    }
    default: {
      return state;
    }
  }
};
