import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import loginStyles from './login.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { authorization } from '../../services/actions/login';

export function Login() {
  const dispatch = useDispatch();
  const { formReset } = useSelector((store) => ({
    formReset: store.authorizationInfo.formReset,
  }));
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState({ email: '', password: '' });
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setToggle(!toggle);
  };

  //Ввод данных
  const handleChange = (event) => {
    const target = event.target;
    const valueItem = target.value;
    const name = target.name;
    setValue({ ...value, [name]: valueItem });
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValue({ email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorization(value));
  };

  return (
    <div className={loginStyles.login}>
      <h2 className={`${loginStyles.title} text text_type_main-medium`}>
        Вход
      </h2>
      <form className={loginStyles.form} onSubmit={handleSubmit}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
          icon={''}
          value={value.email ?? ''}
          name={'email'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1 mb-6'
        />
        <Input
          type={!toggle ? 'password' : 'text'}
          placeholder={'Пароль'}
          onChange={handleChange}
          icon={!toggle ? 'ShowIcon' : 'HideIcon'}
          value={value.password ?? ''}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1 mb-6'
        />
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={false}
          extraClass={loginStyles.button}
        >
          Войти
        </Button>
      </form>
      <p className={`${loginStyles.caption} text text_type_main-default mt-20`}>
        Вы — новый пользователь?
        <Link className='register__caption-link button-hover' to='/sign-up'>
          <span className={loginStyles.link}>Зарегистрироваться</span>
        </Link>
      </p>
      <p className={`${loginStyles.caption} text text_type_main-default mt-4`}>
        Забыли пароль?
        <Link
          className='register__caption-link button-hover'
          to='/forgot-password'
        >
          <span className={loginStyles.link}>Восстановить пароль</span>
        </Link>
      </p>
    </div>
  );
}
