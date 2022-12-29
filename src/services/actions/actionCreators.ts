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

export type TGetCardFailedAction = {
  readonly type: typeof GET_CARDS_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TSendOrderFailedAction = {
  readonly type: typeof SEND_ORDER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TTokenFailedAction = {
  readonly type: typeof TOKEN_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TUpdateUserFailedAction = {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

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
