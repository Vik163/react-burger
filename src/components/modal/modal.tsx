import { useEffect, useState, FC } from 'react';
import ReactDOM from 'react-dom';

import modal from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import { TModal } from '../../utils/types'

export const Modal: FC<TModal> = ({ children, closeModal }) => {
  
  const [isModal, setIsModal] = useState(JSON.parse(`${localStorage.getItem('modal')}`))

  //Корневой элемент
  const modalRoot = document.querySelector('#modals') as HTMLElement;

  useEffect(() => {
    if (!isModal) return;
    const closeByEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isModal]);


  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={modal.modal}>
        <div className={`${modal.title_container} ml-10 mt-10 mr-10`} 
        >
          <p className='text text_type_main-large'>Детали ингредиента</p>
          <CloseIcon type='primary' onClick={closeModal} />
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};
