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
import { Preloader } from '../preloader/preloader';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { ResetPassword } from '../reset-password/reset-password';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { Ingredient } from '../ingredient/ingredient';
import { ProtectedRoute } from '../protected-route';
import { getCookie } from '../../utils/cookie';

import { getCards } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/get-user';
import { requestToken } from '../../services/actions/update-token';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(useSelector((store) => console.log(store)));
  const userData = JSON.parse(localStorage.getItem('userData'));

  const { cards, messageError, loader } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    messageError:
      store.burgerIngredients.messageError ||
      store.orderDetails.messageError ||
      store.registerInfo.messageError ||
      store.authorizationInfo.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
  }));

  // console.log(userData);

  const [loggedIn, setLoggedIn] = useState(false);
  const token = getCookie('token');

  // Проверка авторизации ------------------------
  const checkToken = () => {
    if (token) {
      setLoggedIn(true);
      history.push('/');
    } else {
      setLoggedIn(false);
      dispatch(requestToken());
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);
  // ----------------------------------------------

  useEffect(() => {
    dispatch(getCards());
    history.push('/');
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (!userData) {
        dispatch(getUser());
      }
    }
  }, [userData]);

  useEffect(() => {
    if (messageError) {
      history.push('/errors');
    }
  }, [messageError]);

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      <Switch>
        <Route exact path='/'>
          <DndProvider backend={HTML5Backend}>
            {cards.length > 0 && (
              <main className={appStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            )}
          </DndProvider>
        </Route>
        <Route path='/ingredients/:id' loggedIn={loggedIn}>
          <Ingredient />
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
        <ProtectedRoute path='/profile' loggedIn={loggedIn}>
          <Profile />
        </ProtectedRoute>
        {messageError && (
          <Route path='/errors'>
            <ErrorsPage />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
