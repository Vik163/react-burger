import { useSelector } from 'react-redux';

import errorsStyles from './errors-page.module.css';

export function ErrorsPage() {
  const { statusRequest, messageError } = useSelector((store) => ({
    statusRequest: store.burgerIngredients.statusRequest,
    messageError: store.burgerIngredients.messageError,
  }));

  //Пока функциональность не полная
  return (
    <div className={errorsStyles.page}>
      <p className={errorsStyles.status}>{statusRequest}</p>
      <p>{messageError}</p>
    </div>
  );
}
