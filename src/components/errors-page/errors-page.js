import { useSelector } from 'react-redux';

import errorsStyles from './errors-page.module.css';

export function ErrorsPage() {
  const {
    statusRequest,
    messageError,
    messageErrorConstructor,
    statusRequestConstructor,
  } = useSelector((store) => ({
    statusRequest: store.burgerIngredients.statusRequest,
    messageError: store.burgerIngredients.messageError,
    statusRequestConstructor: store.burgerConstructor.statusRequest,
    messageErrorConstructor: store.burgerConstructor.messageError,
  }));

  //Пока функциональность не полная
  return (
    <div className={errorsStyles.page}>
      <p className={errorsStyles.status}>
        {statusRequest || statusRequestConstructor}
      </p>
      <p>{messageError || messageErrorConstructor}</p>
    </div>
  );
}
