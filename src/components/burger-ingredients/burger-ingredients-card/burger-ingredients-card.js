import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

import PropTypes from 'prop-types';

import ingredientsCardStyles from './burger-ingredients-card.module.css';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../../utils/types';

export function BurgerIngredientsCard(props) {
  const { card, openModal } = props;
  const { dataOrder, cardOrder } = useSelector((store) => ({
    cardOrder: store.burgerIngredientsCard.cardOrder,
    dataOrder: store.burgerConstructor.dataOrder,
  }));
  const [isCounter, setIsCounter] = useState({
    [card.name]: 0,
  });
  const [, drag] = useDrag({
    type: 'item',
    item: { card },
  });

  useEffect(() => {
    const sameCards = () => {
      if (dataOrder.bun) {
        if (dataOrder.bun.name === card.name) {
          return 2;
        }
      }
      if (dataOrder.ingredients) {
        return dataOrder.ingredients.filter((i) => i.name === card.name).length;
      }
    };
    card.name && setIsCounter({ ...isCounter, [card.name]: sameCards() });
  }, [dataOrder]);

  const openModalIngredients = () => {
    // Отправка данных в попап
    openModal(card);
  };

  return (
    <>
      <li
        className={ingredientsCardStyles.card}
        onClick={openModalIngredients}
        ref={drag}
      >
        <div style={{ display: isCounter[card.name] > 0 ? 'block' : 'none' }}>
          <Counter count={isCounter[card.name]} size='default' />
        </div>
        <img
          className={ingredientsCardStyles.card__image}
          src={card.image}
          alt={card.name}
        />
        <div className={` ${ingredientsCardStyles.card__price} mt-1 mb-1`}>
          <p className='text text_type_digits-default mr-2'>{card.price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p
          className={` ${ingredientsCardStyles.card__name} text text_type_main-default`}
        >
          {card.name}
        </p>
      </li>
    </>
  );
}

// BurgerIngredientsCard.propTypes = {
//   card: dataPropTypes.isRequired,
//   openModal: PropTypes.func.isRequired,
// };
