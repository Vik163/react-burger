import { burgerApi } from '../../utils/burger-api';

import { getCookie } from '../../utils/cookie';

import { addErrorLogout } from './actionCreators';

import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from './constants';

import { AppDispatch } from '../../utils/types';

export function logout() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    burgerApi
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
