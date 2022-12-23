import { burgerApi } from '../../utils/burger-api';

import { updateUserErrors } from './actionCreators';

import { UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './constants';
import { AppDispatch, TRegister } from '../../utils/types';

export function updateUser(form: TRegister) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    burgerApi
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
