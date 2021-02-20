import React, { ComponentType, FC } from 'react';

import { RouterContext } from '../context';
import { Router } from '../types';

interface InjectedProps {
  router: Router;
}

function withRouter<P extends InjectedProps>(
  Component: ComponentType<P>
): FC<Omit<P, keyof InjectedProps>> {
  const wrappedComponent: FC<Omit<P, keyof InjectedProps>> = props => {
    return (
      <RouterContext.Consumer>
        {router => {
          if (!router) {
            throw new Error('Router needs to be used inside "RouterProvider".');
          }
          return <Component router={router} {...(props as any)} />;
        }}
      </RouterContext.Consumer>
    );
  };
  return wrappedComponent;
}

export default withRouter;
