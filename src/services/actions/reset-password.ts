import { burgerApi } from '../../utils/burger-api';

import { resetPasswordErrors } from './actionCreators';

import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from './constants';
import { AppDispatch } from '../../utils/types';
import { TResetPasswordFailedAction } from './actionCreators';

type TResetPassword = {
  password: string;
  token: string;
};

export type TResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly messageError?: string;
};

export type TResetPasswordAction =
  | TResetPasswordRequestAction
  | TResetPasswordSuccessAction
  | TResetPasswordFailedAction;

export function resetPassword(form: TResetPassword) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    burgerApi
      .resetPassword(form)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(resetPasswordErrors(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(resetPasswordErrors(err, 'Страница не найдена'));
        } else {
          dispatch(resetPasswordErrors(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
