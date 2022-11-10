import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import ingredientsCardStyles from './burger-ingredients-card.module.css';

import { setCardOrder } from '../../../services/actions/burger-ingredients-card';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../../utils/types';

export function BurgerIngredientsCard(props) {
  const dispatch = useDispatch();
  const { card, openModal } = props;
  const { dataOrder, cardOrder } = useSelector((store) => ({
    cardOrder: store.burgerIngredientsCard.cardOrder,
    dataOrder: store.burgerConstructor.dataOrder,
  }));
  const [isVisibleCounter, setIsVisibleCounter] = useState({
    display: 'block',
  });

  const onDragHandler = (e) => {
    e.preventDefault();
    dispatch(setCardOrder(card, dataOrder));
  };

  const openModalIngredients = () => {
    // Отправка данных в попап
    openModal(card);
  };

  return (
    <>
      <li
        className={ingredientsCardStyles.card}
        onClick={openModalIngredients}
        draggable
        onDrag={(e) => onDragHandler(e)}
      >
        <div style={isVisibleCounter}>
          <Counter count={1} size='default' />
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
