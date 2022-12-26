import { useEffect } from 'react';
import { useSelector } from '../../utils/hooks';

import orderFeedStyles from './order-feed.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';
import { OrderItem } from '../../components/order-item/order-item';
import { TOrderItem } from '../../utils/types';

export function OrderFeed() {
  const { cards, orders } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    orders: store.OrderFeed.data,
  }));

  console.log(orders);
  const ordersFeed = [
    {
      _id: 1,
      number: '#345396',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 2,
      number: '#dfgdtfghfg',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Interstellar бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 3,
      number: '#456657gasd',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Black Hole Singularity острый бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 4,
      number: 'a4w545g',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Supernova Infinity бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 5,
      number: 'ae454',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
    },
  ];

  return (
    <section className={orderFeedStyles.orders}>
      <p
        className={`${orderFeedStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </p>
      <div className={orderFeedStyles.list}>
        <ScrollContainer>
          {orders &&
            orders.orders.map((card: TOrderItem) => (
              <OrderItem key={card._id} card={card} />
            ))}
        </ScrollContainer>
      </div>
      <div className={orderFeedStyles.report}>
        <div className={orderFeedStyles.container_type_process}>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            {orders &&
              orders.orders.map((card: TOrderItem) => (
                <li
                  className={`${orderFeedStyles.numbers} text text_type_digits-default mb-2`}
                  key={card._id}
                >
                  {card.status === 'done' && card.number}
                </li>
              ))}
          </ul>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            {orders &&
              orders.orders.map((card: TOrderItem) => (
                <li
                  className='text text_type_digits-default mb-2'
                  key={card._id}
                >
                  {!(card.status === 'done') && card.number}
                </li>
              ))}
          </ul>
        </div>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за все время:
        </p>
        <p className='text text_type_digits-large'>{orders.total}</p>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за сегодня:
        </p>
        <p className='text text_type_digits-large'>{orders.totalToday}</p>
      </div>
    </section>
  );
}
