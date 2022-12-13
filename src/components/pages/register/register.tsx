import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import registerStyles from './register.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { registration } from '../../../services/actions/register';

import { TDataRegister } from '../../../utils/types'


export function Register() {
  const dispatch = useDispatch();
  const { formReset } = useSelector((store: any) => ({
    formReset: store.authorizationInfo.formReset,
  }));
  const [value, setValue] = useState<TDataRegister>({
    name: '',
    email: '',
    password: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [toggle, setToggle] = useState(false);
  const onIconClick = () => {
    setTimeout(() => (inputRef.current as HTMLInputElement).focus(), 0);
    setToggle(!toggle);
  };

  //Ввод данных
  const handleChange = (event: { target: HTMLInputElement; }) => {
    const target = event.target;
    const valueItem = target.value;
    const name = target.name;
    setValue({ ...value, [name]: valueItem });
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (formReset) {
      setValue({ name: '', email: '', password: '' });
    }
  }, [formReset]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
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
          value={value.name ?? ''}
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
