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

export const addErrorOrder = (err, messageError) => {
  return {
    type: SEND_ORDER_FAILED,
    statusRequest: err,
    messageError,
  };
};

export function addErrorIngredients(err, messageError) {
  return {
    type: GET_CARDS_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorRegister(err, messageError) {
  return {
    type: REGISTER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorLogin(err, messageError) {
  return {
    type: LOGIN_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorLogout(err, messageError) {
  return {
    type: LOGOUT_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function addErrorGetUser(err, messageError) {
  return {
    type: GET_USER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function updateToken(err, messageError) {
  return {
    type: TOKEN_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function updateUserErrors(err, messageError) {
  return {
    type: UPDATE_USER_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function forgotPasswordErrors(err, messageError) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    statusRequest: err,
    messageError,
  };
}

export function resetPasswordErrors(err, messageError) {
  console.log(err);

  return {
    type: RESET_PASSWORD_FAILED,
    statusRequest: err,
    messageError,
  };
}
