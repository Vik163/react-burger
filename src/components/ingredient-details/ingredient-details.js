import detailsStyles from './ingredient-details.module.css';

import { dataPropTypes } from '../../utils/types';

export function IngredientDetails(props) {
  const { isDataIngredients } = props;

  return (
    <>
      <img
        className={detailsStyles.image}
        src={isDataIngredients.image}
        alt={isDataIngredients.name}
      />
      <p className='text text_type_main-medium mt-4 '>
        {isDataIngredients.name}
      </p>
      <ul className={` ${detailsStyles.container} mt-8 mb-15`}>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Калории,ккал</p>
          <p className='text text_type_main-default'>
            {isDataIngredients.calories}
          </p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Белки, г</p>
          <p className='text text_type_main-default'>
            {isDataIngredients.proteins}
          </p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Жиры, г</p>
          <p className='text text_type_main-default'>{isDataIngredients.fat}</p>
        </li>
        <li className={detailsStyles.item}>
          <p className='text text_type_main-default mb-2'>Углеводы, г</p>
          <p className='text text_type_main-default'>
            {isDataIngredients.carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  isDataIngredients: dataPropTypes.isRequired,
};
