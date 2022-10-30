import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import modal from './modal.module.css';

const Modal = (props) => {
  const { text, isOpen, name, title, onClose, onSubmit, children } = props;
  const modalRoot = document.querySelector('#page');

  return ReactDOM.createPortal(
    <div className={modal.modal}>
      <div
        className={
          name === 'image'
            ? `popup__container-image`
            : `popup__container popup__container_type_${name}`
        }
      >
        {children}
        <button
          className='popup__close button-hover'
          aria-label='close'
          type='button'
          onClick={onClose}
        />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
