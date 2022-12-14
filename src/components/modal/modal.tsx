import { useEffect, FC, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

import modal from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import { TModal } from '../../utils/types';

export const Modal: FC<TModal> = ({ children, closeModal, title }) => {
  //Корневой элемент
  const modalRoot = document.querySelector('#modals') as HTMLElement;

  useEffect(() => {
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  const closeOverlay = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeOverlay={closeOverlay} />
      <div className={modal.modal}>
        <div className={`${modal.title_container}`}>
          {typeof title === 'number' ? (
            <p className='text text_type_digits-default'>{`#${title}`}</p>
          ) : (
            <p className='text text_type_main-large'>{title}</p>
          )}
          <CloseIcon type='primary' onClick={closeModal} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
