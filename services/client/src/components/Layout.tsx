import { Link } from '@react-ssr/router';
import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ul>
        <li>
          <Link location="test/1">test1</Link>
        </li>
        <li>
          <Link location="test/2">test2</Link>
        </li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
