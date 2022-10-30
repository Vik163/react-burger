import { useState } from 'react';
import PropTypes from 'prop-types';

import constructorStyles from './burger-constructor.module.css';

import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/types';

function BurgerConstructor(props) {
  const { data } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={constructorStyles.constructor}>
      <ul
        className={` ${constructorStyles.constructor__container} mt-25 mb-10 ml-4`}
      >
        <li
          className={constructorStyles.constructor__item}
          style={{ justifyContent: 'end' }}
        >
          <ConstructorElement
            type='top'
            isLocked={true}
            text='Краторная булка N-200i (верх)'
            price={200}
            thumbnail={data[0].image}
          />
        </li>
        <div className={constructorStyles.constructor__scrollbar}>
          <ModalOverlay isModalOpen={isModalOpen} closeModal={closeModal} />
          {isModalOpen && <Modal />}
          {data.map((item) => (
            <li
              className={constructorStyles.constructor__item}
              key={item._id}
              onClick={openModal}
            >
              <DragIcon type='primary' />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </div>
        <li
          className={constructorStyles.constructor__item}
          style={{ justifyContent: 'end' }}
        >
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text='Краторная булка N-200i (низ)'
            price={200}
            thumbnail={data[0].image}
          />
        </li>
      </ul>
      <div className={` ${constructorStyles.constructor__price} mr-4`}>
        <p className='text text_type_digits-medium mr-2'>610</p>
        <CurrencyIcon type='primary' />
        <Button type='primary' size='large' htmlType='submit'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};

export default BurgerConstructor;
