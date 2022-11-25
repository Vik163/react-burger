import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import detailsStyles from './ingredient-details.module.css';

export function IngredientDetails() {
  const { pathname } = useLocation();
  const { card, cards } = useSelector((store) => ({
    card: store.ingredientDetails.ingredientDetails,
    cards: store.burgerIngredients.cards,
  }));
  const ingredientDetails =
    cards.filter((item) => item._id === pathname.slice(13))[0] || card;

  return (
    <>
      <img
        className={detailsStyles.image}
        src={ingredientDetails.image}
        alt={ingredientDetails.name}
      />
      <p className='text text_type_main-medium mt-4 '>
        {ingredientDetails.name}
      </p>
      <ul className={` ${detailsStyles.container} mt-8 mb-15`}>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Калории,ккал</p>
          <p className='text text_type_main-default'>
            {ingredientDetails.calories}
          </p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Белки, г</p>
          <p className='text text_type_main-default'>
            {ingredientDetails.proteins}
          </p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Жиры, г</p>
          <p className='text text_type_main-default'>{ingredientDetails.fat}</p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Углеводы, г</p>
          <p className='text text_type_main-default'>
            {ingredientDetails.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}
