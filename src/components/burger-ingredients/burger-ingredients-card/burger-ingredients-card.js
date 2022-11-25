import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import ingredientsCardStyles from './burger-ingredients-card.module.css';

import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { setIngredientDetails } from '../../../services/actions/ingredient-details';

import { dataPropTypes } from '../../../utils/types';

export function BurgerIngredientsCard({ card }) {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => ({
    bun: store.burgerConstructor.bun,
    ingredients: store.burgerConstructor.ingredients,
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
      if (bun) {
        if (bun.name === card.name) {
          return 2;
        }
      }
      if (ingredients) {
        return ingredients.filter((i) => i.name === card.name).length;
      }
    };
    card.name && setIsCounter({ ...isCounter, [card.name]: sameCards() });
  }, [bun, ingredients]);

  const openModalIngredients = () => {
    // Отправка данных в попап
    localStorage.setItem('modal', JSON.stringify(true));
    dispatch(setIngredientDetails(card));
  };

  return (
    <Link
      to={`/ingredients/${card._id}`}
      className={ingredientsCardStyles.link}
      onClick={openModalIngredients}
    >
      <li className={ingredientsCardStyles.card} ref={drag}>
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
    </Link>
  );
}

BurgerIngredientsCard.propTypes = {
  card: dataPropTypes.isRequired,
};
