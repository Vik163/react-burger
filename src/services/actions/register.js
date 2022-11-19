import { auth } from '../../utils/auth';

import { addErrorRegister } from './actionCreators';

import { REGISTER_REQUEST, REGISTER_SUCCESS } from './constants';

export function registration(form) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    auth
      .signUp(form)
      .then(
        (result) =>
          result &&
          dispatch({
            type: REGISTER_SUCCESS,
            resultOrder: result,
          })
      )
      .catch((err) => {
        if (err === 400) {
          dispatch(addErrorRegister(err, 'Переданы некорректные данные'));
        } else if (err === 404) {
          dispatch(addErrorRegister(err, 'Страница не найдена'));
        } else {
          dispatch(addErrorRegister(err, 'Внутренняя ошибка сервера'));
        }
      });
  };
}
