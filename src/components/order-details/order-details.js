import PropTypes from 'prop-types';

import ok from '../../images/ok.png';

export function OrderDetails(props) {
  const { numberOrder } = props;

  return (
    <>
      <p className='text text_type_digits-large mt-4 mb-8'>{numberOrder}</p>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={ok} alt='ok' />
      <p className='text text_type_main-default mt-15 mb-2'>
        Ваш заказ начали готовить
      </p>
      <p
        className='text text_type_main-default mb-30'
        style={{ color: '#8585ad' }}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

OrderDetails.propTypes = {
  numberOrder: PropTypes.number.isRequired,
};
