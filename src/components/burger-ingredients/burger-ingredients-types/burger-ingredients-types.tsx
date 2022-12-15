import { forwardRef } from 'react';

import ingredientsTypesStyles from './burger-ingredients-types.module.css';

import { BurgerIngredientsCard } from '../burger-ingredients-card/burger-ingredients-card';

import { TCard } from '../../../utils/types'

type TProps = {
  readonly title: string; 
  readonly data: Array<TCard>
}
type IngredientsTypesProps = React.PropsWithChildren<TProps>


export const BurgerIngredientsTypes = forwardRef<HTMLElement, IngredientsTypesProps>((props, ref) => {
  const { title, data } = props

  return (
    <section className={` ${ingredientsTypesStyles.type} pl-4`} ref={ref}>
      <h2 className='text text_type_main-medium mt-10 mb-6'>{title}</h2>
      <ul className={ingredientsTypesStyles.type__container}>
        {data.map((card: TCard) => (
          <BurgerIngredientsCard card={card} key={card._id} />
        ))}
      </ul>
    </section>
  );
});

