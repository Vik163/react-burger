import { useSelector } from '../../utils/hooks';

import detailsStyles from './order-details.module.css';

import ok from '../../images/ok.png';

export function OrderDetails() {
  const resultOrder = useSelector((store) => store.orderDetails.resultOrder);

  return (
    <>
      <p className='text text_type_digits-large mt-4 mb-8'>
        {resultOrder && resultOrder.order.number}
      </p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={ok} alt='ok' />
      <p className='text text_type_main-default mt-15 mb-2'>
        Ваш заказ начали готовить
      </p>
      <p className={`${detailsStyles.text} text text_type_main-default mb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
