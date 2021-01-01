import React, { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <ul>
        <li>link</li>
        <li>link</li>
        <li>link</li>
      </ul>
      <div>{children}</div>
    </>
  );
};

export default Layout;
