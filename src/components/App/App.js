import React from 'react';
import './App.css';

import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';

import { data } from '../../utils/data';

function App() {
  return (
    <div className='page'>
      <AppHeader />
      <main className='main'>
        <BurgerIngredients />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
