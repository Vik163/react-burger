import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import constructorStyles from './burger-constructor.module.css';

import { setCardOrder } from '../../services/actions/burger-constructor-card';
import { setModalConstructorOpen } from '../../services/actions/modal';

import { setCardMove } from '../../services/actions/move-item';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { DragCard } from './drag-item';
import {
  sendOrder,
  setIngredients,
  setBun,
} from '../../services/actions/burger-constructor';

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerConstructor(props) {
  const { children } = props;
  const dispatch = useDispatch();
  const {
    resultOrder,
    cardOrder,
    ingredients,
    bun,
    ingredientsMove,
    isOpenConstructor,
  } = useSelector((store) => ({
    isOpenConstructor: store.burgerConstructor.isOpenConstructor,
    cardOrder: store.burgerConstructor.cardOrder,
    bun: store.burgerConstructor.bun,
    ingredients: store.burgerConstructor.ingredients,
    resultOrder: store.burgerConstructor.resultOrder,
    ingredientsMove: store.moveItem.ingredientsMove,
  }));
  const [cards, seCards] = useState(ingredients);
  const [totalSum, setTotalSum] = useState(0);
  const [, drop] = useDrop({
    accept: 'item',
    drop(item) {
      item.card && dispatch(setCardOrder(item.card, cardOrder, ingredients));
    },
  });
  const a = ingredientsMove ? ingredientsMove : ingredients;

  useEffect(() => {
    const cardCancelAdd = cards && cards.some((i) => i === cardOrder);
    if (!cardCancelAdd && cardOrder) {
      if (cardOrder.type === 'bun') {
        dispatch(setBun({ bun: cardOrder }));
      } else {
        if (ingredients.length > 0) {
          dispatch(
            setIngredients({
              ingredients: [...cards, cardOrder],
            })
          );
        } else {
          dispatch(
            setIngredients({
              ingredients: [cardOrder],
            })
          );
        }
      }
    }
  }, [cardOrder]);

  useEffect(() => {
    seCards(ingredients);
    // ingredientsMove && setIngredients(ingredientsMove);
  }, [ingredients]);

  //логика подсчета суммы----------------------------------------
  useMemo(() => {
    const totalSumIngredients =
      cards && cards.reduce((sum, current) => sum + current.price, 0);
    if (bun || cards) {
      if (bun && !cards) {
        setTotalSum(bun.price * 2);
      } else if (!bun && cards) {
        setTotalSum(totalSumIngredients);
      } else {
        setTotalSum(totalSumIngredients + bun.price * 2);
      }
    }
  }, [ingredients, bun]);

  const openModal = () => {
    dispatch(setModalConstructorOpen());
    dispatch(sendOrder(bun, ingredients));
  };

  //Удаление из заказа--------------------------------------
  const deleteItem = (e, id) => {
    if (e.target.closest('.constructor-element__action')) {
      dispatch(
        setIngredients({
          ingredients: ingredients.filter((i) => !(i._id === id)),
        })
      );
    }
  };

  console.log(resultOrder);
  //Перетаскивать детали заказа---------------------------
  // const moveItem = useCallback(
  //   (dragIndex, hoverIndex) => {
  // setIngredients((ingredients) => {
  //   dispatch(
  //     setCardMove(dragIndex, hoverIndex, ingredients, ingredientsMove)
  //   );
  //   //   const ingredients = [...ingredientsMove];
  //   //   ingredients.splice(dragIndex, 0, ingredients.splice(hoverIndex, 1)[0]);
  //   //   return ingredients;
  // });
  //   },
  //   [ingredients]
  // );

  // const moveItem = useCallback(
  //   (dragIndex, hoverIndex) => {
  //     setIngredients((ingredients) => {
  //       const ingredientsMove = [...ingredients];

  //       ingredientsMove.splice(
  //         dragIndex,
  //         0,
  //         ingredientsMove.splice(hoverIndex, 1)[0]
  //       );
  //       return ingredientsMove;
  //     });
  //   },
  //   [ingredients]
  // );
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
          {isOpenConstructor && resultOrder && (
            <Modal>
              <OrderDetails />
            </Modal>
          )}
          {cards &&
            cards.map((item, index) => (
              <DragCard
                key={item._id}
                index={index}
                item={item}
                // moveItem={moveItem}
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
