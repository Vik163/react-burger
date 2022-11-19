import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import forgotPasswordStyles from './forgot-password.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPassword(props) {
  const { handleLogin, errorMessage, formforgot, forgotErrors } = props;

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
    forgotErrors();
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
    if (formforgot) {
      setValues({ email: '', password: '' });
      setErrors({});
      setDisabled(true);
    }
  }, [formforgot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
    setDisabled(false);
  };

  return (
    <div className={forgotPasswordStyles.forgot}>
      <h2
        className={`${forgotPasswordStyles.title} text text_type_main-medium`}
      >
        Восстановление пароля
      </h2>
      <form className={forgotPasswordStyles.form} onSubmit={handleSubmit}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
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
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={false}
          extraClass={forgotPasswordStyles.button}
        >
          Восстановить
        </Button>
      </form>
      <p
        className={`${forgotPasswordStyles.caption} text text_type_main-default mt-20`}
      >
        Вспомнили пароль?
        <Link className='register__caption-link button-hover' to='/sign-in'>
          <span className={forgotPasswordStyles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}
