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
  card: TCard;
}

export type TCloseModal = {
  closeModal: () => void, 
};

export type TChildren = {
  children: JSX.Element[] | JSX.Element
} ;

export type TModal = {
  readonly isModal: boolean; 
  readonly title?: string;
} & TCloseModal & TChildren;

