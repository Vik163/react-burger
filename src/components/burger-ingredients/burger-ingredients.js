import { useState } from 'react';

import ingredientsStyles from './burger-ingredients.module.css';

import BurgerIngredientsTypes from './burger-ingredients-types/burger-ingredients-types.js';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients(props) {
  const { data } = props;
  const sauce = data.filter((item) => item.type === 'sauce');
  const bun = data.filter((item) => item.type === 'bun');
  const filling = data.filter((item) => item.type === 'main');

  const [current, setCurrent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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
        <ModalOverlay isModalOpen={isModalOpen} closeModal={closeModal} />
        {isModalOpen && <Modal />}

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

export default BurgerIngredients;
