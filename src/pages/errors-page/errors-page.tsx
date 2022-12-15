import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import errorsStyles from './errors-page.module.css';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ErrorsPage() {
  const { statusRequest, messageError } = useSelector((store: any) => ({
    statusRequest:
      store.burgerIngredients.statusRequest ||
      store.orderDetails.statusRequest ||
      store.authorizationInfo.statusRequest ||
      store.dataUser.statusRequest,
    messageError:
      store.burgerIngredients.messageError ||
      store.orderDetails.messageError ||
      store.authorizationInfo.messageError ||
      store.dataUser.messageError,
  }));

  return (
    <div className={errorsStyles.page}>
      {!(messageError === 'Пароль успешно обновлен') && (
        <p className={errorsStyles.status}>{statusRequest}</p>
      )}
      <p>{messageError}</p>
      <Link to='/'>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass='pl-2 pr-1'
        >
          Вернуться на главную страницу
        </Button>
      </Link>
    </div>
  );
}
