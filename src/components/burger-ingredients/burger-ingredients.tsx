import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ingredientsStyles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { BurgerIngredientsTypes } from './burger-ingredients-types/burger-ingredients-types';

import { TCard } from '../../utils/types'


export const BurgerIngredients = () => {
  const { cards } = useSelector((store: any) => ({
    cards: store.burgerIngredients.cards,
  }));
  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const fillingRef = useRef<HTMLElement>(null);

  // Данные по видам--------------------------------------------
  const sauce = cards.filter((item: TCard) => item.type === 'sauce');
  const bun = cards.filter((item: TCard) => item.type === 'bun');
  const filling = cards.filter((item: TCard) => item.type === 'main');

  const [current, setCurrent] = useState('Булки');
  const [scroll, setScroll] = useState(0);

  //Переход по ссылке между видами--------------------------------------------
  const clickTab = (e: {target: EventTarget}) => {
    const tab = (e.target as HTMLElement).textContent;
    if (tab === 'Булки') {
      (bunRef.current as HTMLElement).scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (tab === 'Соусы') {
      (sauceRef.current as HTMLElement).scrollIntoView({ block: 'start', behavior: 'smooth' });
    } else if (tab === 'Начинки') {
      (fillingRef.current as HTMLElement).scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  };

  const onScroll = (e: {currentTarget: EventTarget}) => {
    const scroll = (e.currentTarget as HTMLElement).scrollTop;
    setScroll(scroll);
  };

  const positionBlocks = () => {
      const positionBun = (bunRef.current as HTMLElement).offsetTop;
      const positionSauce = (sauceRef.current as HTMLElement).offsetTop;
      const positionFilling = (fillingRef.current as HTMLElement).offsetTop;
      const position = {
        bun: (positionSauce - positionBun) / 1.7,
        sauce:
          positionSauce - positionBun + (positionFilling - positionSauce) / 1.7,
      };
      return position;
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

  return (
    <>
      <section className={` ${ingredientsStyles.ingredients} mb-10`}>
        <h1 className='text text_type_main-large mt-10 mb-7'>
          Соберите бургер
        </h1>
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
          <BurgerIngredientsTypes title='Булки' data={bun} ref={bunRef} />
          <BurgerIngredientsTypes title='Соусы' data={sauce} ref={sauceRef} />
          <BurgerIngredientsTypes
            title='Начинки'
            data={filling}
            ref={fillingRef}
          />
        </div>
      </section>
    </>
  );
}
