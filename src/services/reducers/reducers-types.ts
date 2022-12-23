import { TCard, TResultOrder } from '../../utils/types';

export type TAuthorizationInitialState = {
  loggedIn: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  tokenRequest: boolean;
  tokenFailed: boolean;
  statusRequest: null | string;
  messageError: string;
  formReset: boolean;
  loader: boolean;
};

export type TConstructorInitialState = {
  cardOrder: TCard | null;
  bun: TCard | null;
  ingredients: Array<TCard> | [];
  dragIndex: null;
  hoverIndex: null;
};

export type TIngredientsInitialState = {
  cards: Array<TCard> | [];
  cardsRequest: boolean;
  cardsFailed: boolean;
  statusRequest: string | null;
  messageError: string;
  loader: boolean;
};

export type TDataUserInitialState = {
  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordAnswer: boolean;
  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordAnswer: boolean;
  getUserRequest: boolean;
  updateUserRequest: boolean;
  getUserFailed: boolean;
  updateUserFailed: boolean;
  statusRequest: string | null;
  messageError: string;
  updateUserAnswer: string;
  loader: boolean;
};

export type TIngredientDetailsInitialState = {
  ingredientDetails: TCard | {};
};

export type TOrderDetailsInitialState = {
  dataOrderRequest: boolean;
  dataOrderFailed: boolean;
  resultOrder: TResultOrder | null;
  statusRequest: string | null;
  messageError: string;
  loader: boolean;
};
