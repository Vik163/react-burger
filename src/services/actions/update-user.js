import { auth } from '../../utils/auth';

import { updateUserErrors } from './actionCreators';

import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './constants';

export function updateUser(form) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    auth
      .updateUser(form)
      .then((data) => {
        if (data.success) {
          localStorage.setItem('userData', JSON.stringify(data.user));

          dispatch({
            type: UPDATE_USER_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(updateUserErrors(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(updateUserErrors(err, 'Страница не найдена'));
        } else {
          dispatch(updateUserErrors(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
