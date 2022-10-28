import React from 'react';
import appStyles from './App.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';

import { data } from '../../utils/data';

function App() {
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
