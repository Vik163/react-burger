import { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';

import profileStyles from './profile.module.css';

import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookie';
import { requestToken } from '../../services/actions/update-token';

import { logout } from '../../services/actions/logout';
import { updateUser } from '../../services/actions/update-user';

import { TChildren, TDataRegister } from '../../utils/types';

export const Profile: FC<TChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userData = JSON.parse(`${localStorage.getItem('userData')}`);
  const token = getCookie('token');
  const [isActive, setIsActive] = useState(false);
  const [isValue, setIsValue] = useState('');
  const [isUpdateToken, setIsUpdateToken] = useState(false);
  const [value, setValue] = useState<TDataRegister>({
    name: '',
    email: '',
    password: '',
  });
  const { updateUserAnswer } = useSelector((store) => ({
    updateUserAnswer: store.dataUser.updateUserAnswer,
  }));

  //Ввод данных и валидация
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const valueItem = target.value;
    const name = target.name;
    setIsValue(valueItem);
    setValue({ ...value, [name]: valueItem });
  };

  useEffect(() => {
    if (isUpdateToken && token) {
      // @ts-ignore
      dispatch(updateUser(value));
      setIsUpdateToken(false);
    }
  }, [token]);

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
    // @ts-ignore
    dispatch(logout());
    setIsActive(true);
  };

  const cancelIn = () => {
    setIsValue('');
    setValue({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (token) {
      // @ts-ignore
      dispatch(updateUser(value));
      setIsValue('');
    } else {
      setIsUpdateToken(true);
      // @ts-ignore
      dispatch(requestToken());
    }
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
            isIcon={true}
            extraClass='mb-6'
            // @ts-ignore
            error={false}
          />
          <EmailInput
            onChange={handleChange}
            value={value.email ?? ''}
            name={'email'}
            placeholder='Логин'
            isIcon={true}
            extraClass='mb-6'
          />
          <PasswordInput
            onChange={handleChange}
            value={value.password ?? ''}
            name={'password'}
            icon='EditIcon'
            // @ts-ignore
            type={'password'}
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
          {updateUserAnswer && !isValue && (
            <p
              className={`${profileStyles.caption} text text_type_main-default mt-20`}
            >
              Данные успешно обновлены
            </p>
          )}
        </form>
      )}
      {children}
    </div>
  );
};
