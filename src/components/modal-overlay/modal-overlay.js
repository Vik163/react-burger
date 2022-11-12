import { useDispatch } from 'react-redux';

import './modal-overlay.css';

import {
  setModalIngredientsClose,
  setModalConstructorClose,
} from '../../services/actions/modal';

export function ModalOverlay() {
  const dispatch = useDispatch();
  //Клик по ModalOverlay
  const closeOverlay = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setModalIngredientsClose());
      dispatch(setModalConstructorClose());
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}
