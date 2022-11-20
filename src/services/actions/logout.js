import { auth } from '../../utils/auth';

import { deleteCookie } from '../../utils/cookie';

import { addErrorLogout } from './actionCreators';

import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from './constants';

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    auth
      .signOut()
      .then((data) => {
        if (data.success) {
          deleteCookie('token');
          deleteCookie('refreshToken');
          localStorage.removeItem('userData');

          dispatch({
            type: LOGOUT_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(addErrorLogout(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(addErrorLogout(err, 'Страница не найдена'));
        } else {
          dispatch(addErrorLogout(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
