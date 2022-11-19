import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';

import profileStyles from './profile.module.css';

import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function Profile(props) {
  const { handleLogin, errorMessage, formReset, resetErrors } = props;

  const [value, setValue] = React.useState('bob@example.com');
  const onChange = (e) => {
    setValue(e.target.value);
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
    <div className={profileStyles.profile}>
      {/* <h2 className={`${profileStyles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2> */}
      <form className={profileStyles.form} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <EmailInput
            onChange={onChange}
            value={value}
            name={'name'}
            placeholder='Имя'
            isIcon={true}
            extraClass='mb-6'
          />
          <EmailInput
            onChange={onChange}
            value={value}
            name={'email'}
            placeholder='Логин'
            isIcon={true}
            extraClass='mb-6'
          />
          <PasswordInput
            onChange={onChange}
            value={value}
            name={'password'}
            icon='EditIcon'
          />
        </div>

        {/* <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={false}
          extraClass={profileStyles.button}
        >
          Сохранить
        </Button> */}
      </form>
    </div>
  );
}
