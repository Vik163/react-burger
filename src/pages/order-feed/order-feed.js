import { useSelector } from 'react-redux';

import orderFeedStyles from './order-feed.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';
import { OrderItem } from '../../components/order-item/order-item';

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
      totalSum: 609,
    },
    {
      _id: 2,
      number: '#dfgdtfghfg',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Interstellar бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 3,
      number: '#456657gasd',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Black Hole Singularity острый бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 4,
      number: 'a4w545g',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Supernova Infinity бургер',
      orders: cards,
      totalSum: 609,
    },
    {
      _id: 5,
      number: 'ae454',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
    },
  ];

  return (
    <section className={orderFeedStyles.orders}>
      <p
        className={`${orderFeedStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        Лента заказов
      </p>
      <div className={orderFeedStyles.list}>
        <ScrollContainer>
          {ordersFeed &&
            ordersFeed.map((card) => <OrderItem key={card._id} card={card} />)}
        </ScrollContainer>
      </div>
      <div className={orderFeedStyles.report}>
        <div className={orderFeedStyles.container_type_process}>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6'>Готовы:</p>
            {ordersFeed &&
              ordersFeed.map((card) => (
                <li
                  className={`${orderFeedStyles.numbers} text text_type_digits-default mb-2`}
                  key={card._id}
                >
                  {card.number}
                </li>
              ))}
          </ul>
          <ul className={orderFeedStyles.container_type_numbers}>
            <p className='text text_type_main-medium mb-6'>В работе:</p>
            {ordersFeed &&
              ordersFeed.map((card) => (
                <li
                  className='text text_type_digits-default mb-2'
                  key={card._id}
                >
                  {card.number}
                </li>
              ))}
          </ul>
        </div>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за все время:
        </p>
        <p className='text text_type_digits-large'>28 752</p>
        <p className='text text_type_main-medium mt-15'>
          Выполнено за сегодня:
        </p>
        <p className='text text_type_digits-large'>752</p>
      </div>
    </section>
  );
}
