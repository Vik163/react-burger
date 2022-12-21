import { useSelector } from 'react-redux';

import storyOrdersStyles from './story-orders.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';
import { OrderItem } from '../../components/order-item/order-item';

export function StoryOrders() {
  const { cards } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
  }));
  const ordersFeed = [
    {
      _id: '1',
      number: '#345396',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: '2',
      number: '#dfgdtfghfg',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Interstellar бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: '3',
      number: '#456657gasd',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Black Hole Singularity острый бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: '4',
      number: 'a4w545g',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Supernova Infinity бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: '5',
      number: 'ae454',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
    },
  ];

  return (
    <div className={storyOrdersStyles.orders}>
      <ScrollContainer>
        {ordersFeed &&
          ordersFeed.map((card) => <OrderItem key={card._id} card={card} />)}
      </ScrollContainer>
    </div>
  );
}
