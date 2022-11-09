import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ingredientsStyles from './burger-ingredients.module.css';

import { BurgerIngredientsTypes } from './burger-ingredients-types/burger-ingredients-types.js';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerIngredients() {
  const cards = useSelector((store) => store.burgerIngredients.cards);
  const bunRef = useRef();
  const sauceRef = useRef();
  const fillingRef = useRef();
  // Данные по видам
  const sauce = cards.filter((item) => item.type === 'sauce');
  const bun = cards.filter((item) => item.type === 'bun');
  const filling = cards.filter((item) => item.type === 'main');

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

  const clickTab = (e) => {
    const tab = e.target.textContent;
    if (tab === 'Булки') {
      bunRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (tab === 'Соусы') {
      sauceRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (tab === 'Начинки') {
      fillingRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  return (
    <section className={` ${ingredientsStyles.ingredients} mb-10`}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <nav className={ingredientsStyles.links} onClick={clickTab}>
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
          ref={bunRef}
        />
        <BurgerIngredientsTypes
          title='Соусы'
          data={sauce}
          openModal={openModal}
          ref={sauceRef}
        />
        <BurgerIngredientsTypes
          title='Начинки'
          data={filling}
          openModal={openModal}
          ref={fillingRef}
        />
      </div>
    </section>
  );
}
