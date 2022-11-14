import { useSelector } from 'react-redux';

import errorsStyles from './errors-page.module.css';

export function ErrorsPage() {
  const {
    statusRequest,
    messageError,
    messageErrorOrderDetails,
    statusRequestOrderDetails,
  } = useSelector((store) => ({
    statusRequest: store.burgerIngredients.statusRequest,
    messageError: store.burgerIngredients.messageError,
    statusRequestOrderDetails: store.orderDetails.statusRequest,
    messageErrorOrderDetails: store.orderDetails.messageError,
  }));

  //Пока функциональность не полная
  return (
    <div className={errorsStyles.page}>
      <p className={errorsStyles.status}>
        {statusRequest || statusRequestOrderDetails}
      </p>
      <p>{messageError || messageErrorOrderDetails}</p>
    </div>
  );
}
