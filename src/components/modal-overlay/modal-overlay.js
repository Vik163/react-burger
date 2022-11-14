import PropTypes from 'prop-types';

import './modal-overlay.css';

export function ModalOverlay({ closeModal }) {
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
