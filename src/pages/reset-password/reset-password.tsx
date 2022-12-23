import { useEffect, useState, useRef, FormEvent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';

import resetPasswordStyles from './reset-password.module.css';

import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { resetPassword } from '../../services/actions/reset-password';
import { useForm } from '../../components/hooks/use-form';

type TResetPassword = {
  password: string;
  token: string;
};

export function ResetPassword() {
  const dispatch = useDispatch();
  const { resetPasswordAnswer, forgotPasswordAnswer } = useSelector(
    (store) => ({
      resetPasswordAnswer: store.dataUser.resetPasswordAnswer,
      forgotPasswordAnswer: store.dataUser.forgotPasswordAnswer,
    })
  );
  const [toggle, setToggle] = useState(false);
  const { values, handleChange, setValues } = useForm<TResetPassword>({
    password: '',
    token: '',
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const onIconClick = () => {
    setTimeout(() => (inputRef.current as HTMLInputElement).focus(), 0);
    setToggle(!toggle);
  };

  // Сброс -------------------------------
  useEffect(() => {
    if (resetPasswordAnswer) {
      setValues({ password: '', token: '' });
    }
  }, [resetPasswordAnswer]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values));
  };

  if (!forgotPasswordAnswer) {
    return <Redirect to='/forgot-password' />;
  }

  return (
    <div className={resetPasswordStyles.reset}>
      <h2 className={`${resetPasswordStyles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <form className={resetPasswordStyles.form} onSubmit={handleSubmit}>
        <Input
          type={!toggle ? 'password' : 'text'}
          placeholder={'Введите новый пароль'}
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
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.token ?? ''}
          name={'token'}
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
          extraClass={resetPasswordStyles.button}
        >
          Сохранить
        </Button>
      </form>
      <p
        className={`${resetPasswordStyles.caption} text text_type_main-default mt-20`}
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
