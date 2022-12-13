import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import appStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { ErrorsPage } from '../pages/errors-page/errors-page';
import { Preloader } from '../preloader/preloader';
import { ModalSwitch } from '../modal-switch/modal-switch';
import { getCookie } from '../../utils/cookie';

import { getCards } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/get-user';
import { requestToken } from '../../services/actions/update-token';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {loader && <Preloader />}
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
        {messageError && (
          <Route path='/errors'>
            <ErrorsPage />
          </Route>
        )}
        <ModalSwitch />
      </Switch>
    </div>
  );
}

export default App;
