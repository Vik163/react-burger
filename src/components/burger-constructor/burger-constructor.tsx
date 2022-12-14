import { useState, useEffect, useMemo, FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useDrop } from 'react-dnd';

import constructorStyles from './burger-constructor.module.css';

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { DragCard } from './drag-item';
import { ScrollContainer } from '../scroll-container/scroll-container';

import { setCardOrder } from '../../services/actions/burger-constructor-card';
import {
  setIngredients,
  setBun,
} from '../../services/actions/burger-constructor';
import {
  sendOrder,
  deleteResultOrder,
} from '../../services/actions/order-details';

import { TChildren, TCard, TItem } from '../../utils/types';

export const BurgerConstructor: FC<TChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resultOrder, cardOrder, ingredients, bun, loggedIn } = useSelector(
    (store: any) => ({
      cardOrder: store.burgerConstructor.cardOrder,
      bun: store.burgerConstructor.bun,
      ingredients: store.burgerConstructor.ingredients,
      resultOrder: store.orderDetails.resultOrder,
      loggedIn: store.authorizationInfo.loggedIn,
    })
  );

  const [cards, setCards] = useState<Array<TCard>>(ingredients);
  const [totalSum, setTotalSum] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const [, drop] = useDrop({
    accept: 'item',
    drop(item: TItem) {
      item.card && dispatch(setCardOrder(item.card));
    },
  });

  // Отображение ингредиентов-------------------------------------------
  useEffect(() => {
    const cardCancelAdd = cards && cards.some((i: TCard) => i === cardOrder);
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
    resultOrder && setIsModal(true);
  }, [resultOrder]);

  useEffect(() => {
    setCards(ingredients);
  }, [ingredients]);

  //логика подсчета суммы----------------------------------------
  useMemo(() => {
    const totalSumIngredients =
      cards &&
      cards.reduce((sum: number, current: TCard) => sum + current.price, 0);
    if (bun || cards) {
      if (bun && !cards) {
        setTotalSum(bun.price * 2);
      } else if (!bun && cards) {
        setTotalSum(totalSumIngredients);
      } else if (bun && cards) {
        setTotalSum(totalSumIngredients + bun.price * 2);
      }
    }
  }, [bun, cards]);

  const sendOrderClick = () => {
    if (loggedIn) {
      if (bun) {
        dispatch(sendOrder(bun, ingredients));
      }
    } else {
      history.push('/sign-in');
    }
  };

  const closeModal = () => {
    setIsModal(false);
    dispatch(deleteResultOrder());
  };

  //Удаление из заказа--------------------------------------
  const deleteItem = (e: { target: EventTarget }, id: string) => {
    if ((e.target as HTMLElement).closest('.constructor-element__action')) {
      dispatch(
        setIngredients({
          ingredients: ingredients.filter((i: TCard) => !(i.uuid === id)),
        })
      );
    }
  };

  return (
    <section className={`${constructorStyles.constructor}`} ref={drop}>
      {isModal && (
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <ul
        className={` ${constructorStyles.constructor__container} mt-25 mb-10 ml-4`}
      >
        {bun && (
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
          <ScrollContainer>
            {cards &&
              cards.map((item: TCard, index: number) => (
                <DragCard
                  key={item.uuid}
                  index={index}
                  item={item}
                  deleteItem={(e) => deleteItem(e, item.uuid)}
                >
                  {children}
                </DragCard>
              ))}
          </ScrollContainer>
        </div>
        {bun && (
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
          onClick={sendOrderClick}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
