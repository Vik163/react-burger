import React from 'react';
import PropTypes from 'prop-types';

import ingredientsTypesStyles from './burger-ingredients-types.module.css';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card.js';

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

function BurgerIngredientsTypes(props) {
  const { title, data } = props;
  return (
    <section className={` ${ingredientsTypesStyles.type} pl-4`}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{title}</h2>
      <ul className={ingredientsTypesStyles.type__container}>
        {data.map((card) => (
          <BurgerIngredientsCard card={card} key={card._id} />
        ))}
      </ul>
    </section>
  );
}

BurgerIngredientsTypes.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes),
};

export default BurgerIngredientsTypes;
