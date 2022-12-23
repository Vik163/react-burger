import * as H from 'history';
import { SyntheticEvent } from 'react';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../services/store';
import { TTypesActions } from '../services/actions/actions-types';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TTypesActions>
>;

export type TCard = {
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
  readonly _id: string;
  readonly name: string;
  readonly date: string;
  readonly number: string;
  readonly totalSum: number;
  orders: Array<TCard>;
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
  title?: string;
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
