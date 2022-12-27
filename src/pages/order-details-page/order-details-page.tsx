import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import orderDetailsPageStyles from './order-details-page.module.css';

import { useDispatch } from '../../utils/hooks';

import { OrderProcessDetails } from '../../components/order-process-details/order-process-details';
import {
  WS_CONNECTION_START,
  WS_PROFILE_CONNECTION_START,
} from '../../services/actions/constants';

export function OrderDetailsPage() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    pathname.includes('/feed')
      ? dispatch({ type: WS_CONNECTION_START })
      : dispatch({ type: WS_PROFILE_CONNECTION_START });
  }, [pathname]);

  return (
    <section className={orderDetailsPageStyles.page}>
      <OrderProcessDetails />
    </section>
  );
}
