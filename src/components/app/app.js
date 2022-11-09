import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './app.module.css';

import { AppHeader } from '../app-header/app-header.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { ErrorsPage } from '../errors-page/errors-page';
import { burgerApi } from '../../utils/burger-api';
import { getCards } from '../../services/actions/burger-ingredients';

import { BurgerContext } from '../../contexts/burgerContext';

function App() {
  const dispatch = useDispatch();

  const {
    cards,
    cardsFailed,
    statusRequest,
    messageError,
    promoDiscount,
    cardsRequest,
    promoFailed,
    itemsRequest,
  } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    cardsFailed: store.burgerIngredients.cardsFailed,
    cardsRequest: store.burgerIngredients.cardsRequest,
    statusRequest: store.burgerIngredients.statusRequest,
    messageError: store.burgerIngredients.messageError,
    promoFailed: store.promoFailed,
    itemsRequeste: store.itemsRequest,
    promoDiscount: store.promoDiscount,
  }));

  const [dataOrder, setDataOrder] = useState([]);
  const [resultOrder, setResultOrder] = useState({});
  const [error, setError] = useState({
    status: '',
    message: '',
  });

  useEffect(() => {
    dispatch(getCards());
  }, []);

  function sendOrder() {
    if (dataOrder) {
      const bun = dataOrder.filter((item) => item.type === 'bun')[0];
      const ingredients = dataOrder
        .filter((item) => !(item.type === 'bun'))
        .map((item) => item._id);
      const order = {
        ingredients: [bun._id, ...ingredients, bun._id],
      };

      burgerApi
        .sendOrder(order)
        .then((result) => {
          setResultOrder(result);
        })
        .catch((err) => {
          err === 400
            ? setError({
                status: err,
                message: 'Переданы некорректные данные',
              })
            : setError({ status: err, message: 'Внутренняя ошибка сервера' });
        });
    }
  }

  return (
    <div className={appStyles.page} id='page'>
      <BurgerContext.Provider value={{ dataOrder }}>
        <AppHeader />
        {cards.length > 0 && (
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor
              sendOrder={sendOrder}
              numberOrder={resultOrder.order && resultOrder.order.number}
            />
          </main>
        )}
      </BurgerContext.Provider>
      {messageError && <ErrorsPage />}
    </div>
  );
}

export default App;
