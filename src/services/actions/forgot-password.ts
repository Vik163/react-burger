import { burgerApi } from '../../utils/burger-api';

import { forgotPasswordErrors } from './actionCreators';

import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from './constants';
import { AppDispatch } from '../../utils/types';
import { TForgotPasswordFailedAction } from './actionCreators';

export type TForgotPasswordRequest = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

export type TForgotPasswordAction =
  | TForgotPasswordRequest
  | TForgotPasswordSuccessAction
  | TForgotPasswordFailedAction;

export function forgotPassword(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    burgerApi
      .forgotPassword(email)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(forgotPasswordErrors(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(forgotPasswordErrors(err, 'Страница не найдена'));
        } else {
          dispatch(forgotPasswordErrors(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
