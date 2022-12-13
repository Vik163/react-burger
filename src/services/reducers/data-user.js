import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from '../actions/constants';

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordAnswer: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordAnswer: false,
  getUserRequest: false,
  updateUserRequest: false,
  getUserFailed: false,
  updateUserFailed: false,
  statusRequest: null,
  messageError: '',
  updateUserAnswer: '',
  loader: false,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        loader: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserFailed: false,
        getUserRequest: false,
        loader: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        getUserRequest: false,
        loader: false,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        loader: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserFailed: false,
        updateUserRequest: false,
        updateUserAnswer: 'Данные пользователя успешно обновлены',
        loader: false,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        updateUserRequest: false,
        loader: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        loader: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordAnswer: true,
        loader: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        forgotPasswordRequest: false,
        loader: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        loader: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPasswordAnswer: true,
        messageError: 'Пароль успешно обновлен',
        loader: false,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        statusRequest: action.statusRequest,
        messageError: action.messageError,
        loader: false,
      };
    }
    default: {
      return state;
    }
  }
};
