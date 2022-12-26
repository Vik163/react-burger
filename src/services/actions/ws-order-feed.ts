import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from './constants';

export type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
};

export type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: any;
};

export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
};

export type TWsConnection =
  | TWsConnectionStart
  | TWsConnectionSuccess
  | TWsConnectionError
  | TWsConnectionClosed
  | TWsGetMessage;

// export const wsConnectionSuccess = () => {
//   return {
//     type: WS_CONNECTION_SUCCESS,
//   };
// };

// export const wsConnectionError = () => {
//   return {
//     type: WS_CONNECTION_ERROR,
//   };
// };

// export const wsConnectionClosed = () => {
//   return {
//     type: WS_CONNECTION_CLOSED,
//   };
// };

// export const wsGetMessage = () => {
//   return {
//     type: WS_GET_MESSAGE,
//   };
// };

// export const wsActions = {
//   wsInit: WS_CONNECTION_START,
//   // wsSendMessage: WS_SEND_MESSAGE,
//   onOpen: WS_CONNECTION_SUCCESS,
//   onClose: WS_CONNECTION_CLOSED,
//   onError: WS_CONNECTION_ERROR,
//   onMessage: WS_GET_MESSAGE,
// };

// export const wsGetMessage = (message) => {
//   return {
//     type: WS_GET_MESSAGE,
//     payload: message,
//   };
// };

// export const wsSendMessage = (message) => {
//   return {
//     type: WS_SEND_MESSAGE,
//     payload: message,
//   };
// };

// export const wsUserNameUpdate = (userName) => {
//   return {
//     type: WS_USER_NAME_UPDATE,
//     payload: userName,
//   };
// };
