import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
  const { loggedIn } = useSelector((store) => ({
    loggedIn: store.authorizationInfo.loggedIn,
  }));

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
};
