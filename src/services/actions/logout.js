import { auth } from '../../utils/auth';

import { getCookie } from '../../utils/cookie';

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
          document.cookie = `token=${getCookie('token')}; max-age=0`;
          document.cookie = `refreshToken=${getCookie(
            'refreshToken'
          )}; max-age=0`;
          localStorage.removeItem('userData');
          dispatch({
            type: LOGOUT_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 404) {
          dispatch(addErrorLogout(err, 'Страница не найдена'));
        } else {
          dispatch(addErrorLogout(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
