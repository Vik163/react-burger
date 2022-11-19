import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import { Register } from '../register/register';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { ResetPassword } from '../reset-password/reset-password';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { Ingredient } from '../ingredient/ingredient';
import { ProtectedRoute } from '../protected-route';

function App() {
  const dispatch = useDispatch();

  const { cards, messageError, loader } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    messageError:
      store.burgerIngredients.messageError || store.orderDetails.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
  }));
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    dispatch(getCards());
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      <Switch>
        <Route path='/ingredients/:id' loggedIn={loggedIn}>
          <Ingredient />
        </Route>
        <Route path='/profile' loggedIn={loggedIn}>
          <Profile />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <Route path='/sign-in'>
          <Login />
        </Route>
        <Route path='/sign-up'>
          <Register />
        </Route>
        {loader && (
          <>
            <Preloader />
            <ModalOverlay />
          </>
        )}
        <Route exact path='/' loggedIn={loggedIn}>
          <DndProvider backend={HTML5Backend}>
            {cards.length > 0 && (
              <main className={appStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            )}
          </DndProvider>
        </Route>
        {messageError && (
          <Route path='/*'>
            <ErrorsPage />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
