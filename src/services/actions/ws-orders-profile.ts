import {
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
} from './constants';
import { TWsProfile } from '../../utils/types';

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
