import PropTypes from 'prop-types';

import stylesIngredient from './ingredient.module.css';

import { IngredientDetails } from '../ingredient-details/ingredient-details';

export const Ingredient = () => {
  return (
    <div className={stylesIngredient.container}>
      <div className={stylesIngredient.title}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
      </div>
      <IngredientDetails />
    </div>
  );
};
