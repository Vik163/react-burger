import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../../utils/types';
import type { TWsConnection } from '../actions/ws-order-feed';

export const socketOrderFeedMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TWsConnection) => {
      const { dispatch } = store;
      const { type } = action;

      if (type === 'WS_CONNECTION_START') {
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };
        socket.onmessage = (event) => {
          const { data } = event;

          dispatch({ type: 'WS_GET_MESSAGE', payload: JSON.parse(data) });
        };
        socket.onclose = (event) => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
};
