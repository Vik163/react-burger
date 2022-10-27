import React from 'react';

import './app-header.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className='header'>
      <div className='header__link pl-5 pr-5 pb-4 pt-4'>
        <BurgerIcon type='primary' />
        <p className='text text_type_main-default'>Конструктор</p>
      </div>
      <div className='header__link pl-5 pr-5 pb-4 pt-4'>
        <ListIcon type='secondary' />
        <p className='text text_type_main-default text_type_color-dark'>
          Лента заказов
        </p>
      </div>
      <Logo />
      <div className='header__link pl-5 pr-5 pb-4 pt-4'>
        <ProfileIcon type='secondary' />
        <p className='text text_type_main-default text_type_color-dark'>
          Личный кабинет
        </p>
      </div>
    </header>
  );
}

export default AppHeader;
