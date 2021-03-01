import { Link } from '@react-ssr/router';
import React, { FC } from 'react';

import { Route } from '../router/routes';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ul>
        <li>
          <Link to={{ name: Route.SignUp }}>sign up</Link>
        </li>
        <li>
          <Link to={{ name: Route.SignIn }}>sign in</Link>
        </li>
        <li>
          <Link to={{ name: Route.App }}>app</Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
