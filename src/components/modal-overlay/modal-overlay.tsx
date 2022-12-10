import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import './modal-overlay.css';

import { TCloseModal } from '../../utils/types'

export const ModalOverlay:  FC<TCloseModal> = ({ closeModal }) => {
  const history = useHistory();

  const closeOverlay = (e: { target: EventTarget; currentTarget: EventTarget; }) => {
    if (e.target === e.currentTarget) {
      closeModal();
      history.push('/');
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}


