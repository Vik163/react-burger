import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';

import storyOrdersStyles from './story-orders.module.css';

import { ScrollContainer } from '../scroll-container/scroll-container';
import { OrderItem } from '../order-item/order-item';
import { WS_PROFILE_CONNECTION_START } from '../../services/actions/constants';
import { TOrderItem, TWsProfile } from '../../utils/types';

export function StoryOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => ({
    orders: store.ordersProfile.data as TWsProfile,
  }));

  const ordersFeed = orders && orders.orders;

  useEffect(() => {
    dispatch({ type: WS_PROFILE_CONNECTION_START });
  }, []);

  return (
    <div className={storyOrdersStyles.orders}>
      <ScrollContainer>
        {orders &&
          ordersFeed.map((card: TOrderItem) => (
            <OrderItem key={card._id} card={card} />
          ))}
      </ScrollContainer>
    </div>
  );
}
