import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import modalSwitchStyles from './modal-switch.module.css';

import { Register } from '../pages/register/register';
import { Login } from '../pages/login/login';
import { Profile } from '../pages/profile/profile';
import { ResetPassword } from '../pages/reset-password/reset-password';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { Ingredient } from '../pages/ingredient/ingredient';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { StoryOrders } from '../story-orders/story-orders';
import { Modal } from '../modal/modal';

import { deleteIngredientDetails } from '../../services/actions/ingredient-details';

export function ModalSwitch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isModal = JSON.parse(localStorage.getItem('modal'));

  const closeModal = () => {
    localStorage.removeItem('modal');
    dispatch(deleteIngredientDetails());
    history.push('/');
  };

  return (
    <div className={modalSwitchStyles.overlay}>
      <Switch>
        {isModal && (
          <Modal
            closeModal={closeModal}
            isModal={isModal}
            title={'Детали ингредиента'}
          >
            <Route exact path='/ingredients/:id'>
              <IngredientDetails />
            </Route>
          </Modal>
        )}
        <Route path='/ingredients/:id'>
          <Ingredient>
            <IngredientDetails />
          </Ingredient>
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
      </Switch>
    </div>
  );
}
