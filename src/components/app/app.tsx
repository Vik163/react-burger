import { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../utils/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { ErrorsPage } from '../../pages/errors-page/errors-page';
import { Preloader } from '../preloader/preloader';
import { Register } from '../../pages/register/register';
import { Login } from '../../pages/login/login';
import { Profile } from '../../pages/profile/profile';
import { ResetPassword } from '../../pages/reset-password/reset-password';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IngredientDetailsPage } from '../../pages/ingredient-details-page/ingredient-details-page';
import { OrderDetailsPage } from '../../pages/order-details-page/order-details-page';
import { OrderProcessDetails } from '../../components/order-process-details/order-process-details';
import { StoryOrders } from '../story-orders/story-orders';
import { OrderFeed } from '../../pages/order-feed/order-feed';
import { Modal } from '../modal/modal';
import { getCookie } from '../../utils/cookie';

import { getCards } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/get-user';
import { requestToken } from '../../services/actions/update-token';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';
import {
  WS_CONNECTION_CLOSED,
  WS_PROFILE_CONNECTION_CLOSED,
} from '../../services/actions/constants';

import { TModalState, TWsProfile } from '../../utils/types';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TModalState>();
  const { pathname } = useLocation();

  const background = location.state && location.state.background;
  const userData = JSON.parse(`${localStorage.getItem('userData')}`);
  const orderNumber = JSON.parse(`${localStorage.getItem('orderNumber')}`);
  const token = getCookie('token');
  const {
    cards,
    messageError,
    loader,
    loggedIn,
    orders,
    ordersProfile,
    wsProfileConnected,
    wsConnected,
  } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    userData: store.dataUser.messageError,
    messageError:
      store.burgerIngredients.messageError ||
      store.orderDetails.messageError ||
      store.authorizationInfo.messageError ||
      store.dataUser.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
    loggedIn: store.authorizationInfo.loggedIn,
    orders: store.orderFeed.data as TWsProfile,
    wsConnected: store.orderFeed.wsConnected,
    ordersProfile: store.ordersProfile.data as TWsProfile,
    wsProfileConnected: store.ordersProfile.wsProfileConnected,
  }));

  const ordersProfileConnected = ordersProfile && ordersProfile.orders;
  const ordersConnected = orders && orders.orders;

  // Проверка токена ------------------------
  const checkToken = () => {
    !token && dispatch(requestToken());
  };

  useEffect(() => {
    checkToken();
  }, [token]);
  // ----------------------------------------------

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    !pathname.includes('/feed') &&
      wsConnected &&
      dispatch({ type: WS_CONNECTION_CLOSED });

    !pathname.includes('/profile/orders') &&
      wsProfileConnected &&
      dispatch({ type: WS_PROFILE_CONNECTION_CLOSED });
  }, [pathname, wsProfileConnected, wsConnected]);

  useEffect(() => {
    if (loggedIn) {
      if (!userData) {
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
    localStorage.removeItem('orderNumber');
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
        <Route path='/feed' exact>
          <OrderFeed />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderDetailsPage />
        </Route>
        <ProtectedRoute path='/forgot-password' onlyAuth={false} exact>
          <ForgotPassword />
        </ProtectedRoute>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
        <ProtectedRoute path='/sign-in' onlyAuth={false} exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path='/sign-up' onlyAuth={false} exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path='/profile' onlyAuth={true} exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' onlyAuth={true} exact>
          <Profile>
            <StoryOrders />
          </Profile>
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:id' onlyAuth={true} exact>
          <OrderDetailsPage />
        </ProtectedRoute>
        <Route path='/ingredients/:id' exact>
          <IngredientDetailsPage />
        </Route>
        {messageError && (
          <Route path='/errors' exact>
            <ErrorsPage />
          </Route>
        )}
      </Switch>
      {background && (
        <Route path='/ingredients/:id' exact>
          <Modal closeModal={handleModalClose} title='Детали ингредиента'>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && ordersConnected && (
        <Route
          path='/feed/:id'
          exact
          render={() => (
            <Modal closeModal={handleModalClose} title={orderNumber}>
              <OrderProcessDetails modal={true} />
            </Modal>
          )}
        />
      )}
      {background && ordersProfileConnected && (
        <ProtectedRoute path='/profile/orders/:id' exact onlyAuth={true}>
          <Modal closeModal={handleModalClose} title={orderNumber}>
            <OrderProcessDetails modal={true} />
          </Modal>
        </ProtectedRoute>
      )}
    </div>
  );
}

export default App;
