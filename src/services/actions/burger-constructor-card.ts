import { v4 as uuidv4 } from 'uuid';

import { CARD_ORDER } from './constants';

import { TCard } from '../../utils/types';

export type TCardOder = {
  readonly type: typeof CARD_ORDER;
  readonly cardOrder: TCard | null;
};

export function setCardOrder(item: TCard | null) {
  if (item) {
    return {
      type: CARD_ORDER,
      cardOrder: { ...item, uuid: uuidv4() },
    };
  } else {
    return {
      type: CARD_ORDER,
      cardOrder: null,
    };
  }
}
