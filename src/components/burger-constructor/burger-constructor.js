import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import constructorStyles from './burger-constructor.module.css';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { sendOrder } from '../../services/actions/burger-constructor';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor() {
  const dispatch = useDispatch();
  const { dataOrder, resultOrder } = useSelector((store) => ({
    dataOrder: store.burgerConstructor.dataOrder,
    resultOrder: store.burgerConstructor.resultOrder,
  }));

  const bun = dataOrder.bun;
  const ingredients = dataOrder.ingredients;
  const [totalSum, setTotalSum] = useState(0);

  useMemo(() => {
    const totalSumIngredients =
      ingredients &&
      ingredients.reduce((sum, current) => sum + current.price, 0);

    if (bun && ingredients.length > 0) {
      if (bun && bun.price) {
        setTotalSum(totalSumIngredients + bun.price * 2);
      } else {
        setTotalSum(totalSumIngredients);
      }
    }
  }, [dataOrder, bun]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    dispatch(sendOrder(dataOrder));
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
          {isModalOpen && resultOrder && (
            <Modal closeModal={closeModal} isModalOpen={isModalOpen}>
              <OrderDetails />
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

// BurgerConstructor.propTypes = {
//   sendOrder: PropTypes.func.isRequired,
//   result: PropTypes.result,
// };
