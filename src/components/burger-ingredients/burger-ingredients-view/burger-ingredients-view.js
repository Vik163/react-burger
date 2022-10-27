import React from 'react';

import './burger-ingredients-view.css';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card.js';

function BurgerIngredientsView(props) {
  const { title, data } = props;
  return (
    <section className='burger-ingredients-view pl-4' id={title}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{title}</h2>
      <ul className='burger-ingredients-view__container'>
        {data.map((card) => (
          <BurgerIngredientsCard card={card} key={card._id} />
        ))}
      </ul>
    </section>
  );
}
export default BurgerIngredientsView;
