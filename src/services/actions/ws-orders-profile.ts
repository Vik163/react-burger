import {
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
} from './constants';
import { TOrderItem, TWsProfile } from '../../utils/types';

export type TWsProfileConnectionStart = {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
};

export type TWsProfileConnectionSuccess = {
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
};

export type TWsProfileConnectionError = {
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
  readonly payload: Event;
};

export type TWsProfileConnectionClosed = {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
};

export type TWsProfileGetMessage = {
  readonly type: typeof WS_PROFILE_GET_MESSAGE;
  readonly payload: TWsProfile;
};

export type TWsProfileConnection =
  | TWsProfileConnectionStart
  | TWsProfileConnectionSuccess
  | TWsProfileConnectionError
  | TWsProfileConnectionClosed
  | TWsProfileGetMessage;

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
