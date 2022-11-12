export const MODAL_INGREDIENTS_OPEN = 'MODAL_INGREDIENTS_OPEN';
export const MODAL_INGREDIENTS_CLOSE = 'MODAL_INGREDIENTS_CLOSE';
export const MODAL_CONSTRUCTOR_OPEN = 'MODAL_CONSTRUCTOR_OPEN';
export const MODAL_CONSTRUCTOR_CLOSE = 'MODAL_CONSTRUCTOR_CLOSE';

export function setModalIngredientsOpen() {
  return function (dispatch) {
    dispatch({
      type: 'MODAL_INGREDIENTS_OPEN',
      title: 'Детали ингредиента',
    });
  };
}

export function setModalIngredientsClose() {
  return function (dispatch) {
    dispatch({
      type: 'MODAL_INGREDIENTS_CLOSE',
      title: null,
    });
  };
}

export function setModalConstructorOpen() {
  return function (dispatch) {
    dispatch({
      type: 'MODAL_CONSTRUCTOR_OPEN',
    });
  };
}

export function setModalConstructorClose() {
  return function (dispatch) {
    dispatch({
      type: 'MODAL_CONSTRUCTOR_CLOSE',
    });
  };
}
