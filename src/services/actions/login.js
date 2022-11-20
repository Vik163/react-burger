import { auth } from '../../utils/auth';

import { addErrorLogin } from './actionCreators';

import { LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';

export function authorization(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    auth
      .signIn(form)
      .then((data) => {
        let authToken;
        console.log(data.accessToken);
        if (data.accessToken.indexOf('Bearer') === 0) {
          authToken = data.accessToken.split('Bearer ')[1];
        }
        if (authToken) {
          document.cookie = `token=${authToken}; max-age=30`;
        }
        if (data.refreshToken) {
          document.cookie = `refreshToken=${data.refreshToken}`;
        }

        if (data.success) {
          localStorage.setItem('userData', JSON.stringify(data.user));

          dispatch({
            type: LOGIN_SUCCESS,
          });
        }
      })
      .catch((err) => {
        if (err === 400) {
          dispatch(addErrorLogin(err, 'Переданы некорректные данные'));
        } else if (err === 401) {
          dispatch(
            addErrorLogin(err, 'Вы ввели неправильный логин или пароль')
          );
        } else if (err === 404) {
          dispatch(addErrorLogin(err, 'Страница не найдена'));
        } else {
          dispatch(addErrorLogin(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}