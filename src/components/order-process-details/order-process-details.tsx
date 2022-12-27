import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from '../../utils/hooks';

import orderDetailsStyles from './order-process-details.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { OrderItemElement } from '../../components/order-item-element/order-item-element';

import { TCard, TWsProfile } from '../../utils/types';

type TIsModal = {
  modal?: boolean;
};

export function OrderProcessDetails({ modal }: TIsModal) {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const { cards, orders, ordersProfile } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    orders: store.orderFeed.data.orders,
    ordersProfile: store.ordersProfile.data as TWsProfile,
  }));

  const ordersProfileConnected = ordersProfile.orders;

  const orderDetailsCard =
    pathname.includes('/feed') && orders
      ? orders.filter((item: { _id: string }) => item._id === id)[0]
      : ordersProfile &&
        ordersProfileConnected.filter(
          (item: { _id: string }) => item._id === id
        )[0];

  const cardsFeed =
    cards &&
    (orders || ordersProfile) &&
    cards.filter((item) => {
      return orderDetailsCard.ingredients.some((id: string) => item._id === id);
    });

  const totalSum =
    cardsFeed &&
    cardsFeed.reduce(
      (sum: number, current: TCard) =>
        sum + (current.type === 'bun' ? current.price * 2 : current.price),
      0
    );

  const date =
    (orders || ordersProfile) && new Date(orderDetailsCard.createdAt);

  const dateOrder =
    (orders || ordersProfile) &&
    date.toLocaleString('ru', {
      day: '2-digit',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    });

  const statusInfo = (status: string) => {
    switch (status) {
      case 'done':
        return 'Готов';
      case 'created':
        return 'Создан';
      case 'pending':
        return 'Готовится';
      default:
        return status;
    }
  };

  return (
    <section className={orderDetailsStyles.page}>
      {(orders || ordersProfile) && (
        <>
          {!modal && (
            <p
              className={`${orderDetailsStyles.number} text text_type_digits-default mb-2`}
            >
              {`#${orderDetailsCard.number}`}
            </p>
          )}
          <p className='text text_type_main-medium mt-10 mb-3'>
            {orderDetailsCard.name}
          </p>
          <p
            className={`${orderDetailsStyles.status} text text_type_main-default mb-15`}
          >
            {statusInfo(orderDetailsCard.status)}
          </p>
          <p className='text text_type_main-medium mt-10 mb-3'>Состав:</p>
          <div
            className={orderDetailsStyles.container_type_orders}
            style={
              {
                paddingRight: cardsFeed.length > 4 && 16,
              } as React.CSSProperties
            }
          >
            {cardsFeed &&
              cardsFeed.map((card: TCard) => (
                <OrderItemElement key={card._id} card={card} />
              ))}
          </div>
          <div className={orderDetailsStyles.container_type_date}>
            <p className='text text_type_main-default text_color_inactive'>
              {dateOrder}.
            </p>
            <div className={orderDetailsStyles.container_type_price}>
              <p className='text text_type_digits-default mr-2'>{totalSum}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
