import orderStyles from './order.module.css';

import { ScrollContainer } from '../../components/scroll-container/scroll-container';

export function Order({ card }) {
  console.log(card);
  return (
    <section className={orderStyles.order}>
      <div className={orderStyles.container_type_date}>
        <p className='text text_type_digits-default'>{card.number}</p>
        <p className='text text_type_main-default text_color_inactive'>
          {card.date}.
        </p>
      </div>
      <h1
        className={`${orderStyles.title} text text_type_main-medium mt-6 mb-6`}
      >
        {card.name}
      </h1>
      <div className={orderStyles.list}>
        <ScrollContainer></ScrollContainer>
      </div>
      <div className={orderStyles.container_type_total}>
        <ul className={orderStyles.container_type_image}>
          {card.orders.map((item, index) => {
            if (index < 6) {
              return (
                <>
                  {index > 4 && (
                    <p
                      className={`${orderStyles.mask} text text_type_main-default`}
                    >{`+${card.orders.length - 5}`}</p>
                  )}
                  <li
                    className={orderStyles.item}
                    key={item._id}
                    style={{
                      zIndex: !(index === 5) && 100 - index,
                      left: 48 * index,
                    }}
                  >
                    <img
                      className={orderStyles.image}
                      src={item.image}
                      alt={item.name}
                    />
                  </li>
                </>
              );
            }
          })}
        </ul>
      </div>
    </section>
  );
}
