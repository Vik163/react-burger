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
