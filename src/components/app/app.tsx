import { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { ErrorsPage } from '../pages/errors-page/errors-page';
import { Preloader } from '../preloader/preloader';
import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { StoryOrders } from '../story-orders/story-orders';
import { Modal } from '../modal/modal';import { getCookie } from '../../utils/cookie';

import { getCards } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/get-user';
import { requestToken } from '../../services/actions/update-token';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
              // @ts-ignore
  const background = location.state && location.state.background ;
  const userData = JSON.parse(`${localStorage.getItem('userData')}`);
  const token = getCookie('token');
  const { cards, messageError, loader, loggedIn } = useSelector((store: any) => ({
    cards: store.burgerIngredients.cards,
    userData: store.dataUser.messageError,
    messageError:
      store.burgerIngredients.messageError ||
      store.orderDetails.messageError ||
      store.authorizationInfo.messageError ||
      store.dataUser.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
    loggedIn: store.authorizationInfo.loggedIn,
  }));

  // Проверка токена ------------------------
  const checkToken = () => {
    // @ts-ignore
    !token && dispatch(requestToken());
  };

  useEffect(() => {
    checkToken();
  }, [token]);
  // ----------------------------------------------

  useEffect(() => {
    // @ts-ignore
    dispatch(getCards());
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (!userData) {
        // @ts-ignore
        token ? dispatch(getUser()) : checkToken();
      }
    }
  }, [userData, loggedIn, token]);

  useEffect(() => {
    if (messageError) {
      history.push('/errors');
    }
  }, [messageError, userData]);

  const handleModalClose = () => {
    dispatch(deleteIngredientDetails());
    history.goBack();
  };

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {loader && <Preloader />}
      <Switch location={background || location}>
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
        <ProtectedRoute path='/forgot-password' onlyAuth={false}>
          <ForgotPassword />
        </ProtectedRoute>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <ProtectedRoute path='/sign-in' onlyAuth={false}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path='/sign-up' onlyAuth={false}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' onlyAuth={true}>
          <Profile>
            <Route path='/profile/orders'>
              <StoryOrders />
            </Route>
          </Profile>
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact>
          <IngredientDetails />
        </Route>
        {messageError && (
          <Route path='/errors'>
            <ErrorsPage />
          </Route>
        )}
      </Switch>
      {background && (
            <Route path='/ingredients/:id' exact>
                <Modal closeModal={handleModalClose}>
                  <IngredientDetails />
                </Modal>
            </Route>
          )
        }
    </div>
  );
}

export default App;
