import React, { FC, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { useRouter } from '../context/routerDispatchContext';
import { Location } from '../types';

export interface LinkProps {
  children: ReactNode;
  to: Location;
}

const Link: FC<LinkProps> = ({ children, to }) => {
  const { matcher, push } = useRouter();

  const href = useMemo<string | undefined>(() => {
    const path = matcher.getPath(to);
    if (path) return path;
    else return undefined;
  }, [to, matcher]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0)
        return;
      event.preventDefault();
      if (href) push(href);
    },
    [push, href]
  );

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
