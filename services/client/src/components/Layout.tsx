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
          <ul>
            <li>
              <Link to={{ name: Route.AppHome }}>home</Link>
            </li>
            <li>
              <Link to={{ name: Route.AppProfile }}>profile</Link>
              <ul>
                <li>
                  <Link to={{ name: Route.AppProfileAddress }}>address</Link>
                </li>
                <li>
                  <Link to={{ name: Route.AppProfilePersonalInfo }}>personal info</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={{ name: Route.AppAbout }}>about</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
