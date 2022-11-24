import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import forgotPasswordStyles from './forgot-password.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { forgotPassword } from '../../services/actions/forgot-password';

export function ForgotPassword() {
  const dispatch = useDispatch();
  const { forgotPasswordAnswer } = useSelector((store) => ({
    forgotPasswordAnswer: store.dataUser.forgotPasswordAnswer,
  }));

  const [value, setValue] = useState('');

  // Сброс -------------------------------
  useEffect(() => {
    if (forgotPasswordAnswer) {
      setValue('');
    }
  }, [forgotPasswordAnswer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(value));
  };

  if (forgotPasswordAnswer) {
    return <Redirect to='/reset-password' />;
  }

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
          value={value ?? ''}
          name={'email'}
          error={false}
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
        <Link to='/sign-in'>
          <Button
            htmlType='button'
            type='secondary'
            size='medium'
            extraClass='pl-2 pr-1'
          >
            Войти
          </Button>
        </Link>
      </p>
    </div>
  );
}
