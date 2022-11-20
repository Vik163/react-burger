import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../actions/constants';

const initialState = {
  getUserRequest: false,
  updateUserRequest: false,
  getUserFailed: false,
  updateUserFailed: false,
  statusRequest: null,
  messageError: '',
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
    default: {
      return state;
    }
  }
};
