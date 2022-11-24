import stylesIngredient from './ingredient.module.css';

export const Ingredient = ({ children }) => {
  return (
    <div className={stylesIngredient.container}>
      <div className={stylesIngredient.title}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
      </div>
      {children}
    </div>
  );
};
