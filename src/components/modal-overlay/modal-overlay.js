import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import './modal-overlay.css';

export function ModalOverlay({ closeModal }) {
  const history = useHistory();

  const closeOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
      history.push('/');
    }
  };

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func,
};
