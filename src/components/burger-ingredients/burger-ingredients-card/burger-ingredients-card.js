import React from 'react';

import './burger-ingredients-card.css';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsCard(props) {
  const { card } = props;
  return (
    <li className='burger-ingredients-card'>
      <Counter count={1} size='default' />
      <img
        className='burger-ingredients-card__image'
        src={card.image}
        alt={card.name}
      />
      <div className='burger-ingredients-card__price-container mt-1 mb-1'>
        <p className='text text_type_digits-default mr-2'>{card.price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className='text text_type_main-default'>{card.name}</p>
    </li>
  );
}

export default BurgerIngredientsCard;
