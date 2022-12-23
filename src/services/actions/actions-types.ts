import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILED,
  DATA_INGREDIENTS,
  DATA_BUN,
  CARD_ORDER,
  CARD_MOVE,
  GET_CARDS_FAILED,
  GET_CARDS_REQUEST,
  GET_CARDS_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  DELETE_RESULT_ORDER,
} from './constants';
import { TCard, TResultOrder } from '../../utils/types';

export type TRegisterAction = {
  readonly type: typeof REGISTER_REQUEST;
};

export type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS;
};

export type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TLoginAction = {
  readonly type: typeof LOGIN_REQUEST;
};

export type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS;
};

export type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TLogoutAction = {
  readonly type: typeof LOGOUT_REQUEST;
};

export type TLogoutSuccessAction = {
  readonly type: typeof LOGOUT_SUCCESS;
};

export type TLogoutFailedAction = {
  readonly type: typeof LOGOUT_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TTokenAction = {
  readonly type: typeof TOKEN_REQUEST;
};

export type TTokenSuccessAction = {
  readonly type: typeof TOKEN_SUCCESS;
};

export type TTokenFailedAction = {
  readonly type: typeof TOKEN_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TDataIngredients = {
  readonly type: typeof DATA_INGREDIENTS;
  readonly ingredients: Array<TCard> | [];
};

export type TDataBun = {
  readonly type: typeof DATA_BUN;
  readonly bun: TCard | null;
};

export type TCardOder = {
  readonly type: typeof CARD_ORDER;
  readonly cardOrder: TCard | null;
};

export type TCardMove = {
  readonly type: typeof CARD_MOVE;
  readonly dragIndex: number;
  readonly hoverIndex: number;
};

export type TUpdateUserAction = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

export type TUpdateUserSuccessAction = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly updateUserAnswer?: string;
};

export type TUpdateUserFailedAction = {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TGetUserAction = {
  readonly type: typeof GET_USER_REQUEST;
};

export type TGetUserSuccessAction = {
  readonly type: typeof GET_USER_SUCCESS;
};

export type TGetUserFailedAction = {
  readonly type: typeof GET_USER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TGetCardAction = {
  readonly type: typeof GET_CARDS_REQUEST;
};

export type TGetCardSuccessAction = {
  readonly type: typeof GET_CARDS_SUCCESS;
  readonly cards: Array<TCard> | [];
};

export type TGetCardFailedAction = {
  readonly type: typeof GET_CARDS_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TForgotPasswordAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
};

export type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
};

export type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TResetPasswordAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};

export type TResetPasswordSuccessAction = {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly messageError?: string;
};

export type TResetPasswordFailedAction = {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TIngredientDetailsAction = {
  readonly type: typeof INGREDIENT_DETAILS;
  readonly ingredientDetails: TCard;
};

export type TDeleteIngredientDetailsAction = {
  readonly type: typeof DELETE_INGREDIENT_DETAILS;
  readonly ingredientDetails: {};
};

export type TSendOrderAction = {
  readonly type: typeof SEND_ORDER_REQUEST;
};

export type TSendOrderSuccessAction = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly resultOrder: TResultOrder;
};

export type TSendOrderFailedAction = {
  readonly type: typeof SEND_ORDER_FAILED;
  readonly statusRequest: string;
  readonly messageError: string;
};

export type TDeleteResultOrderAction = {
  readonly type: typeof DELETE_RESULT_ORDER;
  readonly resultOrder: null;
};

export type TTypesActions =
  | TLoginAction
  | TLoginSuccessAction
  | TLoginFailedAction
  | TRegisterAction
  | TRegisterSuccessAction
  | TRegisterFailedAction
  | TLogoutAction
  | TLogoutSuccessAction
  | TLogoutFailedAction
  | TTokenAction
  | TTokenSuccessAction
  | TTokenFailedAction
  | TCardOder
  | TDataIngredients
  | TDataBun
  | TCardMove
  | TGetCardAction
  | TGetCardSuccessAction
  | TGetCardFailedAction
  | TGetUserAction
  | TGetUserSuccessAction
  | TGetUserFailedAction
  | TUpdateUserAction
  | TUpdateUserSuccessAction
  | TUpdateUserFailedAction
  | TForgotPasswordAction
  | TForgotPasswordSuccessAction
  | TForgotPasswordFailedAction
  | TResetPasswordAction
  | TResetPasswordSuccessAction
  | TResetPasswordFailedAction
  | TIngredientDetailsAction
  | TDeleteIngredientDetailsAction
  | TSendOrderAction
  | TSendOrderSuccessAction
  | TSendOrderFailedAction
  | TDeleteResultOrderAction;
