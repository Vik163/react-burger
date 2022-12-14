import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';

import orderFeedStyles from './order-feed.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';
import { OrderItem } from '../../components/order-item/order-item';
import { TOrderItem, TWsProfile } from '../../utils/types';
import { WS_CONNECTION_START } from '../../services/actions/constants';

export function OrderFeed() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => ({
    orders: store.orderFeed.data as TWsProfile,
  }));

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  const ordersFeed = orders && orders.orders;

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
            ordersFeed.map((card: TOrderItem) => (
              <OrderItem key={card._id} card={card} />
            ))}
        </ScrollContainer>
      </div>
      <div className={orderFeedStyles.report}>
        <div className={orderFeedStyles.container_type_process}>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6 mr-30'>Готовы:</p>
            {orders &&
              ordersFeed.map(
                (card: TOrderItem, index: number) =>
                  index < 20 && (
                    <li
                      className={`${orderFeedStyles.numbers} text text_type_digits-default mb-2 mr-10`}
                      key={card._id}
                    >
                      {card.status === 'done' && card.number}
                    </li>
                  )
              )}
          </ul>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            {orders &&
              ordersFeed.map(
                (card: TOrderItem, index: number) =>
                  index < 20 && (
                    <li
                      className='text text_type_digits-default mb-2'
                      key={card._id}
                    >
                      {!(card.status === 'done') && card.number}
                    </li>
                  )
              )}
          </ul>
        </div>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за все время:
        </p>
        <p className='text text_type_digits-large'>{orders && orders.total}</p>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за сегодня:
        </p>
        <p className='text text_type_digits-large'>
          {orders && orders.totalToday}
        </p>
      </div>
    </section>
  );
}
