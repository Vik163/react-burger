import { useState } from 'react';

import './burger-constructor.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  const { data } = props;

  return (
    <section className='burger-constructor'>
      <ul className='burger-constructor__container mt-25 mb-10 ml-4'>
        <li
          className='burger-constructor__item'
          style={{ justifyContent: 'end' }}
        >
          <ConstructorElement
            type='top'
            isLocked={true}
            text='Краторная булка N-200i (верх)'
            price={200}
            thumbnail={data[0].image}
          />
        </li>
        <div className='burger-constructor__scrollbar'>
          {data.map((item) => (
            <li className='burger-constructor__item' key={item._id}>
              <DragIcon type='primary' />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          ))}
        </div>
        <li
          className='burger-constructor__item'
          style={{ justifyContent: 'end' }}
        >
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text='Краторная булка N-200i (низ)'
            price={200}
            thumbnail={data[0].image}
          />
        </li>
      </ul>
      <div className='burger-constructor__total-price-container mr-4'>
        <p className='text text_type_digits-medium mr-2'>610</p>
        <CurrencyIcon type='primary' />
        <Button type='primary' size='large' htmlType='submit'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
