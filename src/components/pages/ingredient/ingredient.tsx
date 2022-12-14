import { useEffect, FC } from 'react';

import stylesIngredient from './ingredient.module.css';

import { TChildren } from '../../../utils/types'

export const Ingredient: FC<TChildren> = ({ children }) => {

  return (
    <div 
    className={stylesIngredient.container}
    >
      <div className={stylesIngredient.title}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
      </div>
      {children}
    </div>
  );
};
