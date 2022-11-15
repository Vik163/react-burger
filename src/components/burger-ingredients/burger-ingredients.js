import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ingredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { BurgerIngredientsTypes } from './burger-ingredients-types/burger-ingredients-types.js';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

export function BurgerIngredients() {
  const dispatch = useDispatch();
  const { cards } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
  }));
  const bunRef = useRef();
  const sauceRef = useRef();
  const fillingRef = useRef();

  // Данные по видам--------------------------------------------
  const sauce = cards.filter((item) => item.type === 'sauce');
  const bun = cards.filter((item) => item.type === 'bun');
  const filling = cards.filter((item) => item.type === 'main');

  const [current, setCurrent] = useState('Булки');
  const [scroll, setScroll] = useState('Булки');
  const [isModal, setIsModal] = useState(false);

  //Переход по ссылке между видами--------------------------------------------
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

  const onScroll = (e) => {
    const scroll = e.currentTarget.scrollTop;
    setScroll(scroll);
  };

  const positionBlocks = () => {
    if (bunRef.current) {
      const positionBun = bunRef.current.offsetTop;
      const positionSauce = sauceRef.current.offsetTop;
      const positionFilling = fillingRef.current.offsetTop;
      const position = {
        bun: (positionSauce - positionBun) / 1.7,
        sauce:
          positionSauce - positionBun + (positionFilling - positionSauce) / 1.7,
      };
      return position;
    }
  };

  useEffect(() => {
    if (bunRef.current) {
      const blocks = positionBlocks();

      if (scroll > blocks.bun && scroll <= blocks.sauce) {
        setCurrent('Соусы');
      } else if (scroll > blocks.sauce) {
        setCurrent('Начинки');
      } else {
        setCurrent('Булки');
      }
    }
  }, [scroll]);

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    dispatch(deleteIngredientDetails());
  };

  return (
    <section className={` ${ingredientsStyles.ingredients} mb-10`}>
      <h1 className='text text_type_main-large mt-10 mb-7'>Соберите бургер</h1>
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
      <div
        className={ingredientsStyles.ingredients__container}
        onScroll={onScroll}
      >
        {isModal && (
          <Modal
            closeModal={closeModal}
            isModal={isModal}
            title={'Детали ингредиента'}
          >
            <IngredientDetails />
          </Modal>
        )}
        <BurgerIngredientsTypes
          title='Булки'
          data={bun}
          ref={bunRef}
          openModal={openModal}
        />
        <BurgerIngredientsTypes
          title='Соусы'
          data={sauce}
          ref={sauceRef}
          openModal={openModal}
        />
        <BurgerIngredientsTypes
          title='Начинки'
          data={filling}
          ref={fillingRef}
          openModal={openModal}
        />
      </div>
    </section>
  );
}
