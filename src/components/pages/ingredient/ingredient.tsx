import { useEffect, FC } from 'react';
import { useHistory } from 'react-router-dom';

import stylesIngredient from './ingredient.module.css';

import { TChildren } from '../../../utils/types'

export const Ingredient: FC<TChildren> = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (e: { key: string; }) => {
      if (e.key === 'Escape') {
        history.push('/');
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  const closeModal = () => {
    history.push('/');
  };

  return (
    <div className={stylesIngredient.container} onClick={closeModal}>
      <div className={stylesIngredient.title}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
      </div>
      {children}
    </div>
  );
};
