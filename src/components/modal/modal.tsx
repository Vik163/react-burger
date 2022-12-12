import { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import modal from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TModal } from '../../utils/types'

import { ModalOverlay } from '../modal-overlay/modal-overlay';

export const Modal: FC<TModal> = ({ children, closeModal, isModal, title }) => {
  const history = useHistory();

  //Корневой элемент
  const modalRoot = document.querySelector('#modals') as HTMLElement;

  useEffect(() => {
    if (!isModal) return;
    const closeByEscape = (e: { key: string; }) => {
      if (e.key === 'Escape') {
        closeModal();
        history.push('/');
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isModal]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={modal.modal}>
        <div className={`${modal.title_container} ml-10 mt-10 mr-10`}>
          <p className='text text_type_main-large'>{title}</p>
          <CloseIcon type='primary' onClick={closeModal} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
