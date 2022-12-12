import { Link, useLocation } from 'react-router-dom';

import headerStyles from './app-header.module.css';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={headerStyles.header}>
      <Link
        to='/'
        className={`${headerStyles.header__link} header__link_type_constructor pl-5 pr-5 pb-4 pt-4`}
      >
        <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
        <p
          className='text text_type_main-default'
          style={{ color: pathname === '/' ? 'white' : '#8585ad' }}
        >
          Конструктор
        </p>
      </Link>
      <Link
        to='#'
        className={`${headerStyles.header__link} header__link_type_list pl-5 pr-5 pb-4 pt-4`}
      >
        <ListIcon type={pathname === '#' ? 'primary' : 'secondary'} />
        <p
          className='text text_type_main-default'
          style={{ color: pathname === '#' ? 'white' : '#8585ad' }}
        >
          Лента заказов
        </p>
      </Link>
      <Logo />
      <Link
        to='/profile'
        className={`${headerStyles.header__link} header__link_type_profile pl-5 pr-5 pb-4 pt-4`}
      >
        <ProfileIcon
          type={pathname.includes('profile') ? 'primary' : 'secondary'}
        />
        <p
          className='text text_type_main-default'
          style={{ color: pathname.includes('profile') ? 'white' : '#8585ad' }}
        >
          Личный кабинет
        </p>
      </Link>
    </header>
  );
}
