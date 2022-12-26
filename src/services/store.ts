import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { socketOrderFeedMiddleware } from './middleware/socket-order-feed';
import { BASE_URL_WS } from '../utils/constants';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketOrderFeedMiddleware(`${BASE_URL_WS}/all`))
);

export const store = createStore(rootReducer, enhancer);
