import { v4 as uuidv4 } from 'uuid';

import { CARD_ORDER } from './constants';

export function setCardOrder(item) {
  return {
    type: CARD_ORDER,
    cardOrder: { ...item, uuid: uuidv4() },
  };
}
