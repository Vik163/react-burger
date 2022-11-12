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

function App() {
  const dispatch = useDispatch();

  const { cards, messageError, messageErrorConstructor } = useSelector(
    (store) => ({
      cards: store.burgerIngredients.cards,
      messageError: store.burgerIngredients.messageError,
      messageErrorConstructor: store.burgerConstructor.messageError,
    })
  );
  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        {cards.length > 0 && (
          <main className={appStyles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </DndProvider>
      {(messageError || messageErrorConstructor) && <ErrorsPage />}
    </div>
  );
}

export default App;
