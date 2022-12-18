import { useLocation, Link } from 'react-router-dom';

import orderStyles from './order.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function Order({ card }) {
  const { pathname } = useLocation();

  return (
    <Link
      className={orderStyles.link}
      to={
        pathname === '/feed'
          ? `/feed/${card._id}`
          : `/profile/orders/${card._id}`
      }
    >
      <section
        className={orderStyles.order}
        style={{ width: pathname === '/profile/orders' && 844 }}
      >
        <div className={orderStyles.container_type_date}>
          <p className='text text_type_digits-default'>{card.number}</p>
          <p className='text text_type_main-default text_color_inactive'>
            {card.date}.
          </p>
        </div>
        <h1
          className={`${orderStyles.title} text text_type_main-medium mt-6 mb-6`}
        >
          {card.name}
        </h1>
        <div className={orderStyles.container_type_total}>
          <ul className={orderStyles.container_type_image}>
            {card.orders.map(
              (item, index) =>
                index < 6 && (
                  <div key={item._id}>
                    {index > 4 && (
                      <p
                        className={`${orderStyles.mask} text text_type_main-default`}
                      >{`+${card.orders.length - 5}`}</p>
                    )}
                    <li
                      className={orderStyles.item}
                      style={{
                        zIndex: !(index === 5) && 100 - index,
                        left: 48 * index,
                      }}
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
          <p className='text text_type_digits-default mr-2'>{card.totalSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </section>
    </Link>
  );
}
