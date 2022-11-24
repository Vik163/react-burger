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
import { ModalSwitch } from '../modal-switch/modal-switch';
import { getCookie } from '../../utils/cookie';

import { getCards } from '../../services/actions/burger-ingredients';
import { getUser } from '../../services/actions/get-user';
import { requestToken } from '../../services/actions/update-token';
import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(useSelector((store) => console.log(store)));
  const userData = JSON.parse(localStorage.getItem('userData'));

  const { cards, messageError, loader, loggedIn } = useSelector((store) => ({
    cards: store.burgerIngredients.cards,
    messageError:
      store.burgerIngredients.messageError ||
      store.orderDetails.messageError ||
      store.authorizationInfo.messageError ||
      store.dataUser.messageError,
    loader: store.orderDetails.loader || store.burgerIngredients.loader,
    loggedIn: store.authorizationInfo.loggedIn,
  }));
  const [isModal, setIsModal] = useState(false);

  // console.log(userData);

  const token = getCookie('token');

  // Проверка авторизации ------------------------
  const checkToken = () => {
    if (token) {
      // history.push('/');
    } else {
      dispatch(requestToken());
    }
  };

  useEffect(() => {
    checkToken();
  }, [token]);
  // ----------------------------------------------

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    if (loggedIn) {
      if (!userData) {
        dispatch(getUser());
      }
    } else {
      // console.log('o');
      // history.push('/');
    }
  }, [userData, loggedIn]);
  // console.log(loggedIn);

  useEffect(() => {
    if (messageError) {
      history.push('/errors');
    }
  }, [messageError]);

  const openModal = () => {
    console.log('i');
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    dispatch(deleteIngredientDetails());
    history.push('/');
  };

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      <Switch>
        <Route exact={true} path='/'>
          <DndProvider backend={HTML5Backend}>
            {cards.length > 0 && (
              <main className={appStyles.main}>
                <BurgerIngredients openModal={openModal} />
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
        {loader && (
          <>
            <Preloader />
            <ModalOverlay />
          </>
        )}
        <ModalSwitch closeModal={closeModal} isModal={isModal} />
      </Switch>
    </div>
  );
}

export default App;
