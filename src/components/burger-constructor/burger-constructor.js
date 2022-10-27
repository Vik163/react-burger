import { useState } from 'react';

import './burger-constructor.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const { data } = props;
  const [isVisible, setIsVisible] = useState({
    visibility: 'visible',
  });

  return (
    <section className='burger-constructor'>
      <ul className='burger-constructor__container mt-25 mb-10 ml-4'>
        {data.map((item, index) => {
          const type = () => {
            if (index === 0) {
              return 'top';
            } else if (index === data.length - 1) {
              return 'bottom';
            }
            return '';
          };
          return (
            <li className='burger-constructor__item' key={item._id}>
              <div className='burger-constructor__icon' style={isVisible}>
                <DragIcon type='primary' />
              </div>
              <ConstructorElement
                type={type()}
                isLocked={true}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          );
        })}
      </ul>
      <div className='burger-constructor__total-price-container mr-4'>
        <p className='text text_type_digits-medium mr-2'>610</p>
        <CurrencyIcon type='primary' />
        <Button type='primary' size='large' value={'Оформить заказ' ?? ''}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
