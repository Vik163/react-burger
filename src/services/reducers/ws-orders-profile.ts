import {
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_MESSAGE,
} from '../actions/constants';
import type { TWsProfileConnection } from '../actions/ws-orders-profile';
import { TWsProfile } from '../../utils/types';

export type TWsOrderProfileInitialState = {
  wsProfileConnected: boolean;
  data: TWsProfile | null;
  error: undefined | Event;
};

const initialState: TWsOrderProfileInitialState = {
  wsProfileConnected: false,
  data: null,
  error: undefined,
};

export const wsOrdersProfileReducer = (
  state = initialState,
  action: TWsProfileConnection
): TWsOrderProfileInitialState => {
  switch (action.type) {
    case WS_PROFILE_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsProfileConnected: true,
      };
    case WS_PROFILE_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsProfileConnected: false,
      };
    case WS_PROFILE_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsProfileConnected: false,
      };
    case WS_PROFILE_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: action.payload as TWsProfile,
      };
    default:
      return state;
  }
};
