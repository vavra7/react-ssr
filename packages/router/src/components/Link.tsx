import React, { FC, ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
}

const Link: FC<LinkProps> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default Link;
