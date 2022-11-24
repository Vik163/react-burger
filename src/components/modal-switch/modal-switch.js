import { Switch, Route } from 'react-router-dom';

import modalSwitchStyles from './modal-switch.module.css';

import { Register } from '../register/register';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { ResetPassword } from '../reset-password/reset-password';
import { ForgotPassword } from '../forgot-password/forgot-password';
import { Ingredient } from '../ingredient/ingredient';
import { ProtectedRoute } from '../protected-route';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

export function ModalSwitch(props) {
  const { closeModal, isModal } = props;

  return (
    <div className={modalSwitchStyles.overlay}>
      <Switch>
        {isModal && (
          <Modal
            closeModal={closeModal}
            isModal={isModal}
            title={'Детали ингредиента'}
          >
            <Route path='/ingredients/:id' exact={true}>
              <IngredientDetails />
            </Route>
          </Modal>
        )}
        <Route path='/ingredients/:id'>
          <Ingredient>
            <IngredientDetails />
          </Ingredient>
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
        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>
      </Switch>
    </div>
  );
}
