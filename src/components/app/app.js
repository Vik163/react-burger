import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './app.module.css';

import { AppHeader } from '../app-header/app-header.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { ErrorsPage } from '../errors-page/errors-page';
import { getCards } from '../../services/actions/burger-ingredients';

function App() {
  const dispatch = useDispatch();

  const {
    cards,
    cardsFailed,
    statusRequest,
    messageError,
    dataOrder,
    cardsRequest,
    promoFailed,
    itemsRequest,
  } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    cardsFailed: store.burgerIngredients.cardsFailed,
    cardsRequest: store.burgerIngredients.cardsRequest,
    statusRequest: store.burgerIngredients.statusRequest,
    messageError: store.burgerIngredients.messageError,
    dataOrder: store.burgerConstructor.dataOrder,
    itemsRequeste: store.itemsRequest,
    promoDiscount: store.promoDiscount,
  }));

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {cards.length > 0 && (
        <main className={appStyles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      )}
      {messageError && <ErrorsPage />}
    </div>
  );
}

export default App;
