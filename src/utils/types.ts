import * as H from 'history';
import { SyntheticEvent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { store } from '../services/store';
import { TCardOder } from '../services/actions/burger-constructor-card';
import { TBurgerConstructor } from '../services/actions/burger-constructor';
import { TBurgerIngredientsAction } from '../services/actions/burger-ingredients';
import { TForgotPasswordAction } from '../services/actions/forgot-password';
import { TGetUserAction } from '../services/actions/get-user';
import { TIngredientDetailsAction } from '../services/actions/ingredient-details';
import { TLoginAction } from '../services/actions/login';
import { TLogoutAction } from '../services/actions/logout';
import { TCardMove } from '../services/actions/move-item';
import { TSendOrderAction } from '../services/actions/order-details';
import { TRegisterAction } from '../services/actions/register';
import { TResetPasswordAction } from '../services/actions/reset-password';
import { TTokenAction } from '../services/actions/update-token';
import { TUpdateUserAction } from '../services/actions/update-user';
import { TWsConnection } from '../services/actions/ws-order-feed';

export type TTypesActions =
  | TCardOder
  | TBurgerConstructor
  | TBurgerIngredientsAction
  | TForgotPasswordAction
  | TGetUserAction
  | TIngredientDetailsAction
  | TLoginAction
  | TLogoutAction
  | TCardMove
  | TSendOrderAction
  | TRegisterAction
  | TResetPasswordAction
  | TTokenAction
  | TUpdateUserAction
  | TWsConnection;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkDispatch<Promise<void>, RootState, TTypesActions>;

export type TCard = {
  length: number;
  readonly _id: string;
  readonly uuid: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
};

export type TOrderItem = {
  _id: string;
  number: number;
  createdAt: string;
  name: string;
  ingredients: string[];
  status: string;
  updatedAt: string;
};

export type TItem = {
  readonly card: TCard;
};

export type TCloseModal = {
  closeModal: () => void | undefined;
};

export type TCloseOverlay = {
  closeOverlay: (e: SyntheticEvent) => void;
};

export type TChildren = {
  children?: JSX.Element[] | JSX.Element;
};

export type TModalState = {
  background: H.Location;
};

export type TModal = {
  title?: string | null;
} & TCloseModal &
  TChildren;

export type TProtected = {
  children: JSX.Element[] | JSX.Element;
  readonly onlyAuth: boolean;
  readonly path: string;
  exact?: boolean;
};

export type TLocation = {
  from: { pathname: string };
};

export type TDataRegister = {
  name: string;
  email: string;
  password: string;
};

export type TDragCard = {
  item: TCard;
  index: number;
  deleteItem: (e: { target: EventTarget }, id: string) => void;
} & TChildren;

export type TLogin = {
  readonly email: string;
  readonly password: string;
};

export type TRegister = {
  readonly name: string;
} & TLogin;

export type TResultOrder = {
  readonly name: string;
  readonly order: { number: number };
  readonly success: boolean;
};

export type TOrder = {
  ingredients: string[];
};

export type TId = {
  id: string;
};
