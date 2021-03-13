import { Link } from '@react-ssr/router';
import React, { FC } from 'react';

import { Route } from '../router/routes';
import LangSwitcher from './LangSwitcher';

const Layout: FC = ({ children }) => {
  return (
    <>
      <div>
        <LangSwitcher />
      </div>
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
            <li>
              <Link to={{ name: Route.AppNewListing }}>new listing</Link>
            </li>
            <li>
              <Link to={{ name: Route.AppListing, params: { id: 45 } }}>listing 45</Link>
            </li>
            <li>
              <Link to={{ name: Route.AppListing, params: { id: 46 } }}>listing 46</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
