import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions/constants';
import type { TWsConnection } from '../actions/ws-order-feed';

// type TWSState = {
//   wsConnected: boolean;
//   messages: IMessage[];

//   error?: Event;
// };

const initialState = {
  wsConnected: false,
  data: '',
};

export const wsOrderFeedReducer = (
  state = initialState,
  action: TWsConnection
) => {
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

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
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
