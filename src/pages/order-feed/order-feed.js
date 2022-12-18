import { useSelector } from 'react-redux';

import orderFeedStyles from './order-feed.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';
import { Order } from '../../components/order/order';

export function OrderFeed() {
  const { cards } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
  }));
  const ordersFeed = [
    {
      _id: 1,
      number: '#345396',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
    },
    {
      _id: 2,
      number: '#dfgdtfghfg',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Interstellar бургер',
      orders: cards,
    },
    {
      _id: 3,
      number: '#456657gasd',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Black Hole Singularity острый бургер',
      orders: cards,
    },
    {
      _id: 4,
      number: 'a4w545g',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Supernova Infinity бургер',
      orders: cards,
    },
    {
      _id: 5,
      number: 'ae454',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
    },
  ];

  return (
    <section className={orderFeedStyles.orders}>
      <h1
        className={`${orderFeedStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </h1>
      <div className={orderFeedStyles.list}>
        <ScrollContainer>
          {ordersFeed &&
            ordersFeed.map((card) => <Order key={card._id} card={card} />)}
        </ScrollContainer>
      </div>
      <div className={orderFeedStyles.report}></div>
    </section>
  );
}
