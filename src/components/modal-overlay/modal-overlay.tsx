import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router-dom';

import './modal-overlay.css';

export const ModalOverlay = () => {
  const history = useHistory();

  const closeOverlay: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      history.push('/');
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}


