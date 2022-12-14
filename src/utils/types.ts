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

export type TItem = {
  readonly card: TCard;
}

export type TCloseModal = {
  closeModal: () => void | undefined, 
};

export type TChildren = {
  children?: JSX.Element[] | JSX.Element
} ;

export type TModal = TCloseModal & TChildren;

export type TProtected = {
  children: JSX.Element[] | JSX.Element;
  readonly onlyAuth: boolean;
  readonly path: string;
}

export type TLocation = {
  from: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: string | undefined
  }
} | undefined

export type TDataRegister = {
  name: string; 
  email: string; 
  password: string;
}
