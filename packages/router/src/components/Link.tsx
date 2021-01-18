import React, { FC, ReactNode } from 'react';
import { Router } from '../context';
import { withRouter } from '../hoc';
import { RawLocation } from '../types';

export interface LinkProps {
  children: ReactNode;
  location: RawLocation;
  router: Router;
}

const Link: FC<LinkProps> = ({ children, location, router }) => {
  console.log(router);
  return (
    <>
      <pre>{JSON.stringify(location, null, 4)}</pre>
      <a>{children}</a>
    </>
  );
};

export default withRouter(Link);
