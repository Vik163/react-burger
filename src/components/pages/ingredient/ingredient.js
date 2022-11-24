import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import stylesIngredient from './ingredient.module.css';

export const Ingredient = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const closeByEscape = (e) => {
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
