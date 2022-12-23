import {
  SEND_ORDER_FAILED,
  GET_CARDS_FAILED,
  REGISTER_FAILED,
  LOGIN_FAILED,
  TOKEN_FAILED,
  LOGOUT_FAILED,
  GET_USER_FAILED,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_FAILED,
} from './constants';

export const addErrorOrder = (err: string, messageError: string) => {
  return {
    type: SEND_ORDER_FAILED,
    statusRequest: err,
    messageError,
  };
};

export function addErrorIngredients(err: string, messageError: string) {
  return {
    type: GET_CARDS_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorRegister(err: string, messageError: string) {
  return {
    type: REGISTER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorLogin(err: string, messageError: string) {
  return {
    type: LOGIN_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorLogout(err: string, messageError: string) {
  return {
    type: LOGOUT_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorGetUser(err: string, messageError: string) {
  return {
    type: GET_USER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function updateToken(err: string, messageError: string) {
  return {
    type: TOKEN_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function updateUserErrors(err: string, messageError: string) {
  return {
    type: UPDATE_USER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function forgotPasswordErrors(err: string, messageError: string) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function resetPasswordErrors(err: string, messageError: string) {
  return {
    type: RESET_PASSWORD_FAILED,
    statusRequest: err,
    messageError,
  };
}
