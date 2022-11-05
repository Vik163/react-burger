import React, { useEffect, useState } from 'react';
import appStyles from './App.module.css';

import { AppHeader } from '../app-header/app-header.js';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.js';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.js';
import { ErrorsPage } from '../errors-page/errors-page';
import { burgerApi } from '../../utils/burger-api';

import { BurgerConstructorContext } from '../../contexts/burgerConstructorContext';

function App() {
  const [data, setData] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);
  const [resultOrder, setResultOrder] = useState({});
  const [error, setError] = useState({
    status: '',
    message: '',
  });

  useEffect(() => {
    burgerApi
      .getIngredients()
      .then((data) => {
        setData(data.data);
        setDataOrder(data.data); // Временно
      })
      .catch((err) => {
        err === 404
          ? setError({ status: err, message: 'Запрашиваемые файлы не найдены' })
          : setError({ status: err, message: 'Внутренняя ошибка сервера' });
      });
  }, []);

  function sendOrder() {
    if (dataOrder) {
      const bun = dataOrder.filter((item) => item.type === 'bun')[0];
      const ingredients = dataOrder
        .filter((item) => !(item.type === 'bun'))
        .map((item) => item._id);
      const order = {
        ingredients: [bun._id, ...ingredients, bun._id],
      };

      burgerApi
        .sendOrder(order)
        .then((result) => {
          setResultOrder(result);
        })
        .catch((err) => {
          err === 400
            ? setError({
                status: err,
                message: 'Переданы некорректные данные',
              })
            : setError({ status: err, message: 'Внутренняя ошибка сервера' });
        });
    }
  }

  return (
    <div className={appStyles.page} id='page'>
      <AppHeader />
      {data.length > 0 && (
        <main className={appStyles.main}>
          <BurgerIngredients data={data} />
          <BurgerConstructorContext.Provider value={dataOrder}>
            <BurgerConstructor
              sendOrder={sendOrder}
              numberOrder={resultOrder.order && resultOrder.order.number}
            />
          </BurgerConstructorContext.Provider>
        </main>
      )}
      <ErrorsPage error={error} />
    </div>
  );
}

export default App;
