import { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import constructorStyles from './burger-constructor.module.css';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';

import { BurgerContext } from '../../contexts/burgerContext';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor(props) {
  const { sendOrder, numberOrder } = props;
  const data = useContext(BurgerContext).dataOrder;
  const [bun, setBun] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [totalSum, setTotalSum] = useState(0);

  useMemo(() => {
    const totalSumIngredients = ingredients.reduce(
      (sum, current) => sum + current.price,
      0
    );

    if (data && data.length > 0) {
      setBun(data.filter((item) => item.type === 'bun')[0]);
      setIngredients(data.filter((item) => !(item.type === 'bun')));
      if (bun && bun.price) {
        setTotalSum(totalSumIngredients + bun.price * 2);
      } else {
        setTotalSum(totalSumIngredients);
      }
    }
  }, [data, bun]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    sendOrder();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={constructorStyles.constructor}>
      <ul
        className={` ${constructorStyles.constructor__container} mt-25 mb-10 ml-4`}
      >
        {bun && !(bun.length === 0) && (
          <li className={constructorStyles.constructor__item}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
        <div className={constructorStyles.constructor__scrollbar}>
          {isModalOpen && numberOrder && (
            <Modal closeModal={closeModal} isModalOpen={isModalOpen}>
              <OrderDetails numberOrder={numberOrder} />
            </Modal>
          )}
          {ingredients &&
            ingredients.map((item) => (
              <li
                className={constructorStyles.constructor__item}
                key={item._id}
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
        {bun && !(bun.length === 0) && (
          <li className={constructorStyles.constructor__item}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
      </ul>
      <div className={` ${constructorStyles.constructor__price} mr-4`}>
        <p className='text text_type_digits-medium mr-2'>{totalSum}</p>
        <CurrencyIcon type='primary' />
        <Button
          type='primary'
          size='large'
          htmlType='submit'
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  sendOrder: PropTypes.func.isRequired,
  number: PropTypes.number,
};
