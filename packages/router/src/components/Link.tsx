import React, { FC, ReactNode } from 'react';
import { RawLocation } from '../types';

export interface LinkProps {
  children: ReactNode;
  location: RawLocation;
}

const Link: FC<LinkProps> = ({ children, location }) => {
  return (
    <>
      <pre>{JSON.stringify(location, null, 4)}</pre>
      <a>{children}</a>
    </>
  );
};

export default Link;
