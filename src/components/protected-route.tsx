import { FC } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from '../utils/hooks';

import { TProtected, TLocation } from '../utils/types';

export const ProtectedRoute: FC<TProtected> = ({
  children,
  onlyAuth,
  ...rest
}) => {
  const { state } = useLocation();
  const { loggedIn } = useSelector((store) => ({
    loggedIn: store.authorizationInfo.loggedIn,
  }));

  if (!onlyAuth) {
    return (
      <Route {...rest}>
        {!loggedIn ? (
          children
        ) : (
          <Redirect to={(state as TLocation)?.from || '/'} />
        )}
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
