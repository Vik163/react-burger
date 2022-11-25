import { burgerApi } from '../../utils/burger-api';

import { forgotPasswordErrors } from './actionCreators';

import { FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from './constants';

export function forgotPassword(email) {
  return function (dispatch) {
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
