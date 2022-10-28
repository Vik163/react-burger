import React from 'react';
import PropTypes from 'prop-types';

import constructorStyles from './burger-constructor.module.css';

import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

function BurgerConstructor(props) {
  const { data } = props;

  return (
    <section className={constructorStyles.constructor}>
      <ul
        className={` ${constructorStyles.constructor__container} mt-25 mb-10 ml-4`}
      >
        <li
          className={constructorStyles.constructor__item}
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
        <div className={constructorStyles.constructor__scrollbar}>
          {data.map((item) => (
            <li className={constructorStyles.constructor__item} key={item._id}>
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
          className={constructorStyles.constructor__item}
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
      <div className={` ${constructorStyles.constructor__price} mr-4`}>
        <p className='text text_type_digits-medium mr-2'>610</p>
        <CurrencyIcon type='primary' />
        <Button type='primary' size='large' htmlType='submit'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes),
};

export default BurgerConstructor;
