import { useEffect, useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import registerStyles from './register.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registration } from '../../../services/actions/register';
import { useForm } from '../../hooks/use-form';

import { TDataRegister } from '../../../utils/types'


export function Register() {
  const dispatch = useDispatch();
  const { formReset } = useSelector((store: any) => ({
    formReset: store.authorizationInfo.formReset,
  }));
  const {values, handleChange, setValues} = useForm<TDataRegister>({ name: '', email: '', password: '' });
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(false);
  const onIconClick = () => {
    setTimeout(() => (inputRef.current as HTMLInputElement).focus(), 0);
    setToggle(!toggle);
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValues({ name: '', email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(registration(value));
  };

  return (
    <div className={registerStyles.register}>
      <h2 className={`${registerStyles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <form className={registerStyles.form} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
          value={values.name ?? ''}
          name={'name'}
          error={false}
          ref={inputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1 mb-6'
        />
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
        <Button htmlType='submit' type='primary' size='medium' disabled={false}>
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.caption} text text_type_main-default mt-20`}
      >
        Уже зарегистрированы?
        <Link to='/sign-in'>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            extraClass='pl-2'
          >
            Войти
          </Button>
        </Link>
      </p>
    </div>
  );
}
