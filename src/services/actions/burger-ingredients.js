import { burgerApi } from '../../utils/burger-api';

export const GET_CARDS_REQUEST = 'GET_CARDS_REQUEST';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILED = 'GET_CARDS_FAILED';

export const GET_RECOMMENDED_CARDS_REQUEST = 'GET_RECOMMENDED_CARDS_REQUEST';
export const GET_RECOMMENDED_CARDS_SUCCESS = 'GET_RECOMMENDED_CARDS_SUCCESS';
export const GET_RECOMMENDED_CARDS_FAILED = 'GET_RECOMMENDED_CARDS_FAILED';

export const TAB_SWITCH = 'TAB_SWITCH';

export function getCards() {
  return function (dispatch) {
    dispatch({
      type: GET_CARDS_REQUEST,
    });
    burgerApi
      .getIngredients()
      .then(
        (res) =>
          res &&
          dispatch({
            type: GET_CARDS_SUCCESS,
            cards: res.data,
          })
      )
      .catch((err) => {
        err === 404
          ? dispatch({
              type: GET_CARDS_FAILED,
              statusRequest: err,
              messageError: 'Запрашиваемые файлы не найдены',
            })
          : dispatch({
              type: GET_CARDS_FAILED,
              statusRequest: err,
              messageError: 'Внутренняя ошибка сервера',
            });
      });
  };
}

// cardsFailed &&
// (statusRequest === 404
//   ? setError({
//       status: statusRequest,
//       message: 'Запрашиваемые файлы не найдены',
//     })
//   : setError({
//       status: statusRequest,
//       message: 'Внутренняя ошибка сервера',
//     }));

// export function getRecommendedCARDS() {
//   return function (dispatch) {
//     dispatch({
//       type: GET_RECOMMENDED_CARDS_REQUEST,
//     });
//     getRecommendedCARDSRequest().then((res) => {
//       if (res && res.success) {
//         dispatch({
//           type: GET_RECOMMENDED_CARDS_SUCCESS,
//           CARDS: res.data,
//         });
//       } else {
//         dispatch({
//           type: GET_RECOMMENDED_CARDS_FAILED,
//         });
//       }
//     });
//   };
// }
