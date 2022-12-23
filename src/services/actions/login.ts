import { burgerApi } from '../../utils/burger-api';

import { addErrorLogin } from './actionCreators';

import { LOGIN_REQUEST, LOGIN_SUCCESS } from './constants';
import { AppDispatch, TLogin } from '../../utils/types';

export function authorization(form: TLogin) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    burgerApi
      .signIn(form)
      .then((data) => {
        let authToken;
        if (data.accessToken.indexOf('Bearer') === 0) {
          authToken = data.accessToken.split('Bearer ')[1];
        }
        if (authToken) {
          document.cookie = `token=${authToken}; max-age=1200`;
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
