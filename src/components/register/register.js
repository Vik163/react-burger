import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import registerStyles from './register.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registration } from '../../services/actions/register';

export function Register(props) {
  const { handleRegister, formReset } = props;
  const dispatch = useDispatch();
  const { resultOrder, cardOrder, ingredients, bun } = useSelector((store) => ({
    cardOrder: store.burgerConstructor.cardOrder,
    bun: store.burgerConstructor.bun,
    ingredients: store.burgerConstructor.ingredients,
    resultOrder: store.orderDetails.resultOrder,
  }));

  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  const [inputEventTarget, setInputEventTarget] = useState({});

  //Ввод данных
  const handleChange = (event) => {
    // setInputEventTarget(event.target);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValue({ ...value, [name]: value });
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValue({ name: '', email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleRegister(value);
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
          icon={''}
          value={''}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='ml-1 mb-6'
        />
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
        <Button htmlType='submit' type='primary' size='medium' disabled={false}>
          Зарегистрироваться
        </Button>
      </form>
      <p
        className={`${registerStyles.caption} text text_type_main-default mt-20`}
      >
        Уже зарегистрированы?
        <Link className='register__caption-link button-hover' to='/sign-in'>
          <span className={registerStyles.link}>Войти</span>
        </Link>
      </p>
    </div>
  );
}
