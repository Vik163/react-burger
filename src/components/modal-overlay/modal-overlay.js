import { useDispatch } from 'react-redux';

import './modal-overlay.css';

import {
  setModalIngredientsClose,
  setModalConstructorClose,
} from '../../services/actions/modal';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

export function ModalOverlay() {
  const dispatch = useDispatch();

  const closeOverlay = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setModalIngredientsClose());
      dispatch(deleteIngredientDetails());
      dispatch(setModalConstructorClose());
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}
