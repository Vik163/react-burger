import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';

import AppHeader from '../app-header/app-header.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.js';

import { url } from '../../utils/data';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`Ошибка: ${res.statusText}`);
        }
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {data[0] && (
        <main className={appStyles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      )}
    </div>
  );
}

export default App;
