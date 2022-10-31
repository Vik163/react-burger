import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import modal from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = (props) => {
  const { isModalOpen, title, closeModal, children } = props;
  //Корневой элемент
  const modalRoot = document.querySelector('#page');

  useEffect(() => {
    if (!isModalOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isModalOpen, closeModal]);

  return ReactDOM.createPortal(
    <div className={modal.modal}>
      <div className={`${modal.title_container} ml-10 mt-10 mr-10`}>
        <p className='text text_type_main-large'>{title}</p>
        <CloseIcon type='primary' onClick={closeModal} />
      </div>
      {children}
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
