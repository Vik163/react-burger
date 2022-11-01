import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './modal-overlay.css';

export function ModalOverlay(props) {
  const { closeModal } = props;

  //Клик по ModalOverlay
  const closeOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
