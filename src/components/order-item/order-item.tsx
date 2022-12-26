import { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';

import orderStyles from './order-item.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TOrderItem, TCard } from '../../utils/types';
import { useSelector } from '../../utils/hooks';

type TOrderCard = {
  card: TOrderItem;
};

export const OrderItem: FC<TOrderCard> = ({ card }) => {
  const { pathname } = useLocation();
  const location = useLocation();
  const { cards } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
  }));
  const date = new Date(card.createdAt);

  const dateOrder = date.toLocaleString('ru', {
    day: '2-digit',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  const cardsFeed =
    cards &&
    cards.filter((item) => {
      return card.ingredients.some((id: string) => item._id === id);
    });

  const totalSum =
    cardsFeed &&
    cardsFeed.reduce(
      (sum: number, current: TCard) =>
        sum + (current.type === 'bun' ? current.price * 2 : current.price),
      0
    );

  return (
    <Link
      className={orderStyles.link}
      to={{
        pathname:
          pathname === '/feed'
            ? `/feed/${card._id}`
            : `/profile/orders/${card._id}`,
        state: { background: location },
      }}
    >
      <section
        className={orderStyles.order}
        style={
          {
            width: pathname === '/profile/orders' && 844,
          } as React.CSSProperties
        }
      >
        <div className={orderStyles.container_type_date}>
          <p className='text text_type_digits-default'>{`#${card.number}`}</p>
          <p className='text text_type_main-default text_color_inactive'>
            {dateOrder}.
          </p>
        </div>
        <h1
          className={`${orderStyles.title} text text_type_main-medium mt-6 mb-6`}
        >
          {card.name}
        </h1>
        <div className={orderStyles.container_type_total}>
          <ul className={orderStyles.container_type_image}>
            {cardsFeed.map(
              (item, index) =>
                index < 6 && (
                  <div key={item._id}>
                    {index > 4 && (
                      <p
                        className={`${orderStyles.mask} text text_type_main-default`}
                      >{`+${cardsFeed.length - 5}`}</p>
                    )}
                    <li
                      className={orderStyles.item}
                      style={
                        {
                          zIndex: !(index === 5) && 100 - index,
                          left: 48 * index,
                        } as React.CSSProperties
                      }
                    >
                      <img
                        className={orderStyles.image}
                        src={item.image}
                        alt={item.name}
                      />
                    </li>
                  </div>
                )
            )}
          </ul>
          <p className='text text_type_digits-default mr-2'>{totalSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </section>
    </Link>
  );
};
