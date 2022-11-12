import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import modal from './modal.module.css';

import { ModalOverlay } from '../modal-overlay/modal-overlay';
import {
  setModalIngredientsClose,
  setModalConstructorClose,
} from '../../services/actions/modal';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Modal = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const { title, isOpen, isOpenConstructor } = useSelector((store) => ({
    title: store.burgerIngredients.title,
    isOpen: store.burgerIngredients.isOpen,
    isOpenConstructor: store.burgerConstructor.isOpenConstructor,
  }));

  //Корневой элемент
  const modalRoot = document.querySelector('#modals');

  const closeModal = () => {
    dispatch(setModalIngredientsClose());
    dispatch(deleteIngredientDetails());
    dispatch(setModalConstructorClose());
  };

  useEffect(() => {
    if (!isOpen && !isOpenConstructor) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        dispatch(setModalIngredientsClose());
        dispatch(deleteIngredientDetails());
        dispatch(setModalConstructorClose());
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [isOpen, isOpenConstructor]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
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
