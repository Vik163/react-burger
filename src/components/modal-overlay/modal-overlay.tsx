import { FC } from 'react';

import './modal-overlay.css';

import { TCloseOverlay } from '../../utils/types'

export const ModalOverlay: FC<TCloseOverlay> = ({ closeOverlay }) => {

  return <div className='overlay' id='overlay' onClick={closeOverlay} />;
}


