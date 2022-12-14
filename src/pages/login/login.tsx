import { useEffect, useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import loginStyles from './login.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { authorization } from '../../services/actions/login';
import { useForm } from '../../components/hooks/use-form';

type TLogin = {
  email: string; 
  password: string;
}

export function Login() {
  const dispatch = useDispatch();
  const { formReset } = useSelector((store: any) => ({
    formReset: store.authorizationInfo.formReset,
  }));
  const [toggle, setToggle] = useState(false);
  const {values, handleChange, setValues} = useForm<TLogin>({ email: '', password: '' });
  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => (inputRef.current as HTMLInputElement).focus(), 0);
    setToggle(!toggle);
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValues({ email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(authorization(values));
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
          value={values.email ?? ''}
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
          value={values.password ?? ''}
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
        <Link to='/sign-up'>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            extraClass='pl-2 pb-2'
          >
            Зарегистрироваться
          </Button>
        </Link>
      </p>
      <p className={`${loginStyles.caption} text text_type_main-default `}>
        Забыли пароль?
        <Link to='/forgot-password'>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            extraClass='pl-2 pt-2'
          >
            Восстановить пароль
          </Button>
        </Link>
      </p>
    </div>
  );
}
