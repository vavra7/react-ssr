import { Link } from '@react-ssr/router';
import React, { FC } from 'react';

import { Route } from '../router/routes';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ul>
        <li>
          <Link to="/test1">test1</Link>
        </li>
        <li>
          <Link to={{ name: Route.Test2 }}>test2</Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
