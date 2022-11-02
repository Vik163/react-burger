import { useState } from 'react';
import PropTypes from 'prop-types';

import ingredientsStyles from './burger-ingredients.module.css';

import { BurgerIngredientsTypes } from './burger-ingredients-types/burger-ingredients-types.js';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import { dataPropTypes } from '../../utils/types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredients(props) {
  const { data } = props;
  // Данные по видам
  const sauce = data.filter((item) => item.type === 'sauce');
  const bun = data.filter((item) => item.type === 'bun');
  const filling = data.filter((item) => item.type === 'main');

  const [current, setCurrent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataIngredients, setIsDataIngredients] = useState({});

  const openModal = (card) => {
    setIsModalOpen(true);
    setIsDataIngredients(card);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={` ${ingredientsStyles.ingredients} mb-10`}>
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
      <div className={ingredientsStyles.ingredients__container}>
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            title='Детали ингредиента'
            isModalOpen={isModalOpen}
          >
            <IngredientDetails isDataIngredients={isDataIngredients} />
          </Modal>
        )}
        <BurgerIngredientsTypes
          title='Булки'
          data={bun}
          openModal={openModal}
        />
        <BurgerIngredientsTypes
          title='Соусы'
          data={sauce}
          openModal={openModal}
        />
        <BurgerIngredientsTypes
          title='Начинки'
          data={filling}
          openModal={openModal}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
