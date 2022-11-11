import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import PropTypes from 'prop-types';

import constructorStyles from './burger-constructor.module.css';

import {
  setCardOrder,
  setCardOrderId,
} from '../../services/actions/burger-ingredients-card';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { DragCard } from './drag-item';
import {
  sendOrder,
  setDataOrder,
} from '../../services/actions/burger-constructor';

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const { dataOrder, resultOrder, cardOrder } = useSelector((store) => ({
    cardOrder: store.burgerIngredientsCard.cardOrder,
    dataOrder: store.burgerConstructor.dataOrder,
    resultOrder: store.burgerConstructor.resultOrder,
  }));
  const bun = dataOrder.bun;
  const ingredients = dataOrder.ingredients;
  const [ingredientsMove, setIngredientsMove] = useState(ingredients);
  const [totalSum, setTotalSum] = useState(0);

  const [, drop] = useDrop({
    accept: 'item',
    drop(item) {
      item.card && dispatch(setCardOrder(item.card, cardOrder, dataOrder));
    },
  });

  useEffect(() => {
    const cardCancelAdd =
      ingredients && ingredients.some((i) => i === cardOrder);
    if (!cardCancelAdd && cardOrder) {
      if (cardOrder.type === 'bun') {
        dispatch(setDataOrder({ ...dataOrder, bun: cardOrder }));
      } else {
        if (!dataOrder.ingredients) {
          dispatch(
            setDataOrder({
              ...dataOrder,
              ...dataOrder.ingredients,
              ingredients: [cardOrder],
            })
          );
        } else {
          dispatch(
            setDataOrder({
              ...dataOrder,
              ...dataOrder.ingredients,
              ingredients: [...ingredients, cardOrder],
            })
          );
        }
      }
    }
  }, [cardOrder]);

  useEffect(() => {
    setIngredientsMove(dataOrder.ingredients);
  }, [dataOrder.ingredients]);

  //логика подсчета суммы----------------------------------------
  useMemo(() => {
    const totalSumIngredients =
      ingredients &&
      ingredients.reduce((sum, current) => sum + current.price, 0);
    if (bun || ingredients) {
      if (bun && !ingredients) {
        setTotalSum(bun.price * 2);
      } else if (!bun && ingredients) {
        setTotalSum(totalSumIngredients);
      } else {
        setTotalSum(totalSumIngredients + bun.price * 2);
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

  //Удаление из заказа--------------------------------------
  const deleteItem = (e, id) => {
    if (e.target.closest('.constructor-element__action')) {
      dispatch(
        setDataOrder({
          ...dataOrder,
          ingredients: ingredients.filter((i) => !(i._id === id)),
        })
      );
    }
  };

  // Перетаскивать детали заказа---------------------------
  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = ingredientsMove[dragIndex];
      const hoverItem = ingredientsMove[hoverIndex];

      // Меняет местами dragItem и hoverItem в массиве
      setIngredientsMove((ingredientsMove) => {
        const updatedIngredientsMove = [...ingredientsMove];

        updatedIngredientsMove[dragIndex] = hoverItem;
        updatedIngredientsMove[hoverIndex] = dragItem;
        return updatedIngredientsMove;
      });
    },
    [ingredientsMove]
  );

  return (
    <section className={constructorStyles.constructor} ref={drop}>
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
          {ingredientsMove &&
            ingredientsMove.map((item, index) => (
              <DragCard
                key={item._id}
                index={index}
                item={item}
                moveItem={moveItem}
                deleteItem={deleteItem}
              >
                {children}
              </DragCard>
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
