import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/constants';
import type { TWsConnection } from '../actions/ws-order-feed';
import { TWsProfile } from '../../utils/types';

export type TWsOrderProfileInitialState = {
  wsConnected: boolean;
  data: TWsProfile | null;
  error: undefined | Event;
};

const initialState: TWsOrderProfileInitialState = {
  wsConnected: false,
  data: null,
  error: undefined,
};

export const wsOrderFeedReducer = (
  state = initialState,
  action: TWsConnection
): TWsOrderProfileInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: action.payload,
      };
    default:
      return state;
  }
};
