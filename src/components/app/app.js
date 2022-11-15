import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import appStyles from './app.module.css';

import { AppHeader } from '../app-header/app-header.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { ErrorsPage } from '../errors-page/errors-page';
import { getCards } from '../../services/actions/burger-ingredients';
import { Preloader } from '../preloader/preloader';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

function App() {
  const dispatch = useDispatch();

  const { cards, messageError, loader } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    messageError:
      store.burgerIngredients.messageError || store.orderDetails.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
  }));

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        {loader && (
          <>
            <Preloader />
            <ModalOverlay />
          </>
        )}
        {cards.length > 0 && (
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </DndProvider>
      {messageError && <ErrorsPage />}
    </div>
  );
}

export default App;
