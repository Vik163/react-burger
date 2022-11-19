import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import loginStyles from './login.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Login(props) {
  const { handleLogin, errorMessage, formReset, resetErrors } = props;

  const [value, setValue] = useState('value');
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState(false);
  const [errors, setErrors] = React.useState({
    password: '',
  });
  const [inputEventTarget, setInputEventTarget] = React.useState({});
  const [disabled, setDisabled] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(false);
  const [passwordValid, setPasswordValid] = React.useState(false);

  //Ввод данных и валидация
  const handleChange = (event) => {
    resetErrors();
    setInputEventTarget(event.target);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setIsName(name);
    setValues({ ...values, [name]: value });
  };

  // Валидация email и password ----------------------------------------------
  useEffect(() => {
    if (values.email) {
      if (values.email.match(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,4}$/i) === null) {
        setEmailValid({
          valid: false,
          message: 'Некорректный адрес электронной почты ',
        });
      } else {
        setEmailValid({ valid: true });
      }
    }
    if (inputEventTarget.name === 'password') {
      setPasswordValid(inputEventTarget.closest('input').checkValidity());
      setErrors({
        ...errors,
        [inputEventTarget.name]: inputEventTarget.validationMessage,
      });
    }
  }, [values]);

  // Переключение активности кнопки submit ---
  useEffect(() => {
    if (emailValid.valid && passwordValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, passwordValid]);

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValues({ email: '', password: '' });
      setErrors({});
      setDisabled(true);
    }
  }, [formReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    setDisabled(false);
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
          onChange={(e) => setValue(e.target.value)}
          icon={''}
          value={''}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1 mb-6'
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={(e) => setValue(e.target.value)}
          icon={'ShowIcon'}
          value={''}
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
