import { FC, MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

import './modal-overlay.css';

import { TCloseModal } from '../../utils/types'

export const ModalOverlay = () => {
  const history = useHistory();

  const closeOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      // localStorage.removeItem('modal');
      history.push('/');
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}


