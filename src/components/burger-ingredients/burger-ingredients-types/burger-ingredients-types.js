import React from 'react';
import PropTypes from 'prop-types';

import ingredientsTypesStyles from './burger-ingredients-types.module.css';

import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card.js';

import { dataPropTypes } from '../../../utils/types';

export const BurgerIngredientsTypes = React.forwardRef((props, ref) => {
  const { title, data } = props;

  return (
    <section className={` ${ingredientsTypesStyles.type} pl-4`} ref={ref}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{title}</h2>
      <ul className={ingredientsTypesStyles.type__container}>
        {data.map((card) => (
          <BurgerIngredientsCard card={card} key={card._id} />
        ))}
      </ul>
    </section>
  );
});

BurgerIngredientsTypes.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes),
  title: PropTypes.string.isRequired,
};
