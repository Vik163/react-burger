import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import orderDetailsPageStyles from './order-details-page.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';

export function OrderDetailsPage() {
  const { id } = useParams();
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
      status: 'выполнен',
    },
    {
      _id: '2',
      number: '#dfgdtfghfg',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Interstellar бургер',
      orders: cards,
      totalSum: 609,
      status: 'готовиться',
    },
    {
      _id: '3',
      number: '#456657gasd',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Black Hole Singularity острый бургер',
      orders: cards,
      totalSum: 609,
      status: 'готовиться',
    },
    {
      _id: '4',
      number: 'a4w545g',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Supernova Infinity бургер',
      orders: cards,
      totalSum: 609,
      status: 'выполнен',
    },
    {
      _id: '5',
      number: 'ae454',
      date: 'Сегодня, 16:20 i-GMT+3',
      name: 'Death Star Starship Main бургер',
      orders: cards,
      totalSum: 609,
      status: 'выполнен',
    },
  ];

  const orderDetailsCard = ordersFeed.filter((item) => item._id === id)[0];

  return (
    <section className={orderDetailsPageStyles.page}>
      <p
        className={`${orderDetailsPageStyles.number} text text_type_digits-default mb-2`}
      >
        {orderDetailsCard.number}
      </p>
      <p className='text text_type_main-medium mt-10 mb-3'>
        {orderDetailsCard.name}
      </p>
      <p
        className={`${orderDetailsPageStyles.status} text text_type_main-default mb-15`}
      >
        {orderDetailsCard.status}
      </p>
      <p className='text text_type_main-medium mt-10 mb-3'>Состав:</p>
      <div className={orderDetailsPageStyles.container_type_orders}>
        <ScrollContainer>
          {cards &&
            cards.map((card) => (
              <li
                className={orderDetailsPageStyles.container_type_card}
                key={card._id}
                card={card}
              >
                <div className={orderDetailsPageStyles.item}>
                  <img
                    className={orderDetailsPageStyles.image}
                    src={card.image}
                    alt={card.name}
                  />
                </div>
                <p className='text text_type_main-default'>{card.name}</p>
                <div className={orderDetailsPageStyles.container_type_price}>
                  <p className='text text_type_digits-default mr-2'>
                    {card.type === 'bun'
                      ? `2 x ${card.price}`
                      : `1 x ${card.price}`}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </li>
            ))}
        </ScrollContainer>
      </div>
      <div className={orderDetailsPageStyles.container_type_date}>
        <p className='text text_type_main-default text_color_inactive'>
          {orderDetailsCard.date}.
        </p>
        <div className={orderDetailsPageStyles.container_type_price}>
          <p className='text text_type_digits-default mr-2'>
            {orderDetailsCard.totalSum}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
}
