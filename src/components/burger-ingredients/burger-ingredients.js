import { useState } from 'react';

import './burger-ingredients.css';

import BurgerIngredientsView from './burger-ingredients-view/burger-ingredients-view.js';
import { bun, sauce, filling } from '../../utils/data';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients() {
  const [current, setCurrent] = useState('');

  return (
    <section className='burger-ingredients mb-10'>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <nav style={{ display: 'flex' }}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </nav>
      <div className='burger-ingredients__container'>
        <BurgerIngredientsView title='Булки' data={bun} />
        <BurgerIngredientsView title='Соусы' data={sauce} />
        <BurgerIngredientsView title='Начинки' data={filling} />
      </div>
    </section>
  );
}

export default BurgerIngredients;
