import React, { FC, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { Router } from '../context';
import { withRouter } from '../hoc';
import { RawLocation, RouteConfig } from '../types';

export interface LinkProps {
  children: ReactNode;
  to: RawLocation;
  router: Router;
}

const Link: FC<LinkProps> = ({ children, to, router }) => {
  const routeConfig: RouteConfig | null = useMemo(() => {
    return router.getRouteConfig(to);
  }, [to, router]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0)
        return;
      event.preventDefault();
      router.navigate();
    },
    [router]
  );

  return (
    <>
      <a href={routeConfig?.path} onClick={handleClick}>
        {children}
      </a>
    </>
  );
};

export default withRouter(Link);
