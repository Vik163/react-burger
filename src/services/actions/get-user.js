import { auth } from '../../utils/auth';

import { addErrorGetUser } from './actionCreators';

import { GET_USER_REQUEST, GET_USER_SUCCESS } from './constants';

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    auth
      .getUser()
      .then((data) => {
        if (data.success) {
          localStorage.setItem('userData', JSON.stringify(data.user));
          dispatch({
            type: GET_USER_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(addErrorGetUser(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(addErrorGetUser(err, 'Страница не найдена'));
        } else {
          dispatch(addErrorGetUser(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
