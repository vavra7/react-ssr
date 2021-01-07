import { Link } from '@react-ssr/router';
import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ul>
        <li>
          <Link>test1</Link>
        </li>
        <li>
          <Link>test2</Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
