import { FC } from 'react';
import orderElementStyles from './order-item-element.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TCard } from '../../utils/types';

type TOrderElement = {
  card: TCard;
};

export const OrderItemElement: FC<TOrderElement> = ({ card }) => {
  return (
    <li className={orderElementStyles.container_type_card}>
      <div className={orderElementStyles.item}>
        <img
          className={orderElementStyles.image}
          src={card.image}
          alt={card.name}
        />
      </div>
      <p className='text text_type_main-default'>{card.name}</p>
      <div className={orderElementStyles.container_type_price}>
        <p className='text text_type_digits-default mr-2'>
          {card.type === 'bun' ? `2 x ${card.price}` : `1 x ${card.price}`}
        </p>
        <CurrencyIcon type='primary' />
      </div>
    </li>
  );
};
