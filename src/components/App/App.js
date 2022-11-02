import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';

import { AppHeader } from '../app-header/app-header.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { ErrorsPage } from '../errors-page/errors-page';
import { burgerApi } from '../../utils/burger-api';

function App() {
  const [data, setData] = useState({});
  const [error, setError] = useState({
    status: '',
    message: '',
  });

  useEffect(() => {
    burgerApi
      .getIngredients()
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        err === 404
          ? setError({ status: err, message: 'Запрашиваемые файлы не найдены' })
          : setError({ status: err, message: 'Внутренняя ошибка сервера' });
      });
  }, []);

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {data.length > 0 && (
        <main className={appStyles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data} />
        </main>
      )}
      <ErrorsPage error={error} />
    </div>
  );
}

export default App;
