import type { Middleware, MiddlewareAPI } from 'redux';

import { getCookie } from '../../utils/cookie';

import type { AppDispatch, RootState } from '../../utils/types';
import type { TWsProfileConnection } from '../actions/ws-orders-profile';

export const socketOrdersProfileMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsProfileConnection) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === 'WS_PROFILE_CONNECTION_START') {
        socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: 'WS_PROFILE_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: 'WS_PROFILE_CONNECTION_ERROR', payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({
            type: 'WS_PROFILE_GET_MESSAGE',
            payload: JSON.parse(data),
          });
        };
        socket.onclose = (event) => {
          dispatch({ type: 'WS_PROFILE_CONNECTION_CLOSED', payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
