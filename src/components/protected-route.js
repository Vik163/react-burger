import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, onlyAuth, ...rest }) => {
  const { state } = useLocation();
  const { loggedIn } = useSelector((store) => ({
    loggedIn: store.authorizationInfo.loggedIn,
  }));

  if (!onlyAuth) {
    return (
      <Route {...rest}>
        {!loggedIn ? children : <Redirect to={state?.from || '/'} />}
      </Route>
    );
  } else {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
};
