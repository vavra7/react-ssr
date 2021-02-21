import React, { FC, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { useRouter } from '../hooks';
import { RawLocation } from '../types';

export interface LinkProps {
  children: ReactNode;
  to: RawLocation;
}

const Link: FC<LinkProps> = ({ children, to }) => {
  const router = useRouter();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>): void => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.button !== 0)
        return;
      event.preventDefault();
      router.navigate(to);
    },
    [router, to]
  );

  const href = useMemo<string | undefined>(() => {
    const path = router.matcher.getPath(to);
    if (path) return path;
    else return undefined;
  }, [to]);

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
