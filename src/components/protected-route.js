import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  // Не пускает зарегистрированного пользователя на страницы регистрации и авторизации
  if (
    props.computedMatch.url === '/sign-up' ||
    props.computedMatch.url === '/sign-in'
  ) {
    return (
      <Route {...props}>{!loggedIn ? children : <Redirect to='/' />}</Route>
    );
  }
  // ----------------------------------------------------------------------------------

  return (
    <Route {...props}>{loggedIn ? children : <Redirect to='/sign-in' />}</Route>
  );
};
