import orderDetailsPageStyles from './order-details-page.module.css';

import { OrderProcessDetails } from '../../components/order-process-details/order-process-details';

export function OrderDetailsPage() {
  return (
    <section className={orderDetailsPageStyles.page}>
      <OrderProcessDetails />
    </section>
  );
}
