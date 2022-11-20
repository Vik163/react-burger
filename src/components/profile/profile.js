import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import profileStyles from './profile.module.css';

import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { logout } from '../../services/actions/logout';
import { updateUser } from '../../services/actions/update-user';

export function Profile() {
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [isActive, setIsActive] = useState({
    profile: true,
    list: false,
    exit: false,
  });
  const [value, setValue] = useState({ name: '', email: '', password: '' });

  //Ввод данных и валидация
  const handleChange = (event) => {
    const target = event.target;
    const valueItem = target.value;
    const name = target.name;
    setValue({ ...value, [name]: valueItem });
  };

  // Сброс -------------------------------
  useEffect(() => {
    userData
      ? setValue({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        })
      : setValue({ name: '', email: '', password: '' });
  }, []);

  const activeLink = (e) => {
    const target = e.currentTarget;
    if (target.textContent === 'Профиль') {
      setIsActive({ profile: true, list: false, exit: false });
    } else if (target.textContent === 'История заказов') {
      setIsActive({ profile: false, list: true, exit: false });
    } else if (target.textContent === 'Выход') {
      dispatch(logout());
      setIsActive({ profile: false, list: false, exit: true });
    }
  };

  const cancelIn = () => {
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
        <li
          className={`${profileStyles.navItem} text text_type_main-medium`}
          onClick={activeLink}
          style={{ color: isActive.profile ? 'white' : '#8585ad' }}
        >
          Профиль
        </li>
        <li
          className={`${profileStyles.navItem} text text_type_main-medium`}
          onClick={activeLink}
          style={{ color: isActive.list ? 'white' : '#8585ad' }}
        >
          История заказов
        </li>
        <li
          className={`${profileStyles.navItem} text text_type_main-medium`}
          onClick={activeLink}
          style={{ color: isActive.exit ? 'white' : '#8585ad' }}
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
      </form>
    </div>
  );
}
