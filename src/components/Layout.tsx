import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Layout: FC = ({ children }) => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
