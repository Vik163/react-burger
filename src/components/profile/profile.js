import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import profileStyles from './profile.module.css';

import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { logout } from '../../services/actions/logout';
import { updateUser } from '../../services/actions/update-user';

export function Profile({ children }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [isActive, setIsActive] = useState(false);
  const [isValue, setIsValue] = useState(false);
  const [value, setValue] = useState({ name: '', email: '', password: '' });

  //Ввод данных и валидация
  const handleChange = (event) => {
    const target = event.target;
    const valueItem = target.value;
    const name = target.name;
    setIsValue(valueItem);
    setValue({ ...value, [name]: valueItem });
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (userData) {
      setValue({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
    } else {
      setValue({ name: '', email: '', password: '' });
    }
  }, []);

  const signout = () => {
    dispatch(logout());
    setIsActive(true);
  };

  const cancelIn = () => {
    setIsValue(false);
    setValue({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(value));
  };

  return (
    <div className={profileStyles.profile}>
      <ul className={profileStyles.nav}>
        <Link to='/profile' className={profileStyles.link}>
          <li
            className={`${profileStyles.navItem} text text_type_main-medium`}
            style={{ color: pathname === '/profile' ? 'white' : '#8585ad' }}
          >
            Профиль
          </li>
        </Link>
        <Link to='/profile/orders' className={profileStyles.link}>
          <li
            className={`${profileStyles.navItem} text text_type_main-medium`}
            style={{
              color: pathname === '/profile/orders' ? 'white' : '#8585ad',
            }}
          >
            История заказов
          </li>
        </Link>
        <li
          className={`${profileStyles.navItem} text text_type_main-medium`}
          onClick={signout}
          style={{ color: isActive ? 'white' : '#8585ad' }}
        >
          Выход
        </li>
        <li
          className={`${profileStyles.text} text text_type_main-default mt-20`}
        >
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </li>
      </ul>
      {!(pathname === '/profile/orders') && (
        <form className={profileStyles.form} onSubmit={handleSubmit}>
          <EmailInput
            onChange={handleChange}
            value={value.name ?? ''}
            name={'name'}
            placeholder='Имя'
            error={false}
            isIcon={true}
            extraClass='mb-6'
          />
          <EmailInput
            onChange={handleChange}
            value={value.email ?? ''}
            name={'email'}
            placeholder='Логин'
            isIcon={true}
            extraClass='mb-6'
            error={false}
          />
          <PasswordInput
            type={'password'}
            onChange={handleChange}
            value={value.password ?? ''}
            name={'password'}
            icon='EditIcon'
            error={false}
          />
          {isValue && (
            <div>
              <Button
                htmlType='button'
                type='secondary'
                size='medium'
                onClick={cancelIn}
              >
                Отмена
              </Button>
              <Button
                htmlType='submit'
                type='primary'
                size='medium'
                disabled={false}
                extraClass='mt-6'
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      )}
      {children}
    </div>
  );
}
