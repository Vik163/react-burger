import { FC } from 'react';

import containerStyles from './scroll-container.module.css';

import { TChildren } from '../../utils/types';

export const ScrollContainer: FC<TChildren> = ({ children }) => {
  return <ul className={containerStyles.container}>{children}</ul>;
};
