import { burgerApi } from '../../utils/burger-api';

import { updateToken } from './actionCreators';

import { TOKEN_REQUEST, TOKEN_SUCCESS } from './constants';

import { AppDispatch } from '../../utils/types';
import { TTokenFailedAction } from './actionCreators';

export type TTokenRequestAction = {
  readonly type: typeof TOKEN_REQUEST;
};

export type TTokenSuccessAction = {
  readonly type: typeof TOKEN_SUCCESS;
};

export type TTokenAction =
  | TTokenRequestAction
  | TTokenSuccessAction
  | TTokenFailedAction;

export function requestToken() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: TOKEN_REQUEST,
    });
    burgerApi
      .updateToken()
      .then((data) => {
        let authToken;
        if (data.accessToken.indexOf('Bearer') === 0) {
          authToken = data.accessToken.split('Bearer ')[1];
        }
        if (authToken) {
          document.cookie = `token=${authToken}; max-age=1200`;
        }
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}`;
        }

        if (data.success) {
          dispatch({
            type: TOKEN_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 401) {
          return;
        }
        if (err === 400) {
          dispatch(updateToken(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(updateToken(err, 'Страница не найдена'));
        } else {
          dispatch(updateToken(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
