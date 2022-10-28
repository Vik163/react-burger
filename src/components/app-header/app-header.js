import { useState } from 'react';

import './app-header.css';

import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const [isActive, setIsActive] = useState({
    constructor: true,
    list: false,
    profile: false,
  });

  const activeLink = (e) => {
    const target = e.currentTarget;
    if (target.classList.contains('header__link_type_constructor')) {
      setIsActive({ constructor: true, list: false, profile: false });
    } else if (target.classList.contains('header__link_type_list')) {
      setIsActive({ constructor: false, list: true, profile: false });
    } else if (target.classList.contains('header__link_type_profile')) {
      setIsActive({ constructor: false, list: false, profile: true });
    }
  };
  return (
    <header className='header'>
      <div
        className='header__link header__link_type_constructor pl-5 pr-5 pb-4 pt-4'
        onClick={activeLink}
      >
        <BurgerIcon type={isActive.constructor ? 'primary' : 'secondary'} />
        <p
          className='text text_type_main-default'
          style={{ color: isActive.constructor && 'white' }}
        >
          Конструктор
        </p>
      </div>
      <div
        className='header__link header__link_type_list pl-5 pr-5 pb-4 pt-4'
        onClick={activeLink}
      >
        <ListIcon type={isActive.list ? 'primary' : 'secondary'} />
        <p
          className='text text_type_main-default'
          style={{ color: isActive.list && 'white' }}
        >
          Лента заказов
        </p>
      </div>
      <Logo />
      <div
        className='header__link header__link_type_profile pl-5 pr-5 pb-4 pt-4'
        onClick={activeLink}
      >
        <ProfileIcon type={isActive.profile ? 'primary' : 'secondary'} />
        <p
          className='text text_type_main-default'
          style={{ color: isActive.profile && 'white' }}
        >
          Личный кабинет
        </p>
      </div>
    </header>
  );
}

export default AppHeader;
