import { burgerApi } from '../../utils/burger-api';

import { resetPasswordErrors } from './actionCreators';

import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from './constants';

export function resetPassword(form) {
  return function (dispatch) {
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
