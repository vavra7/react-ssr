import React, { FC, MouseEvent, ReactNode, useCallback } from 'react';

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
      console.log(router);
    },
    [router]
  );

  return (
    <>
      <a href={'TODO'} onClick={handleClick}>
        {children} {router.path}
      </a>
    </>
  );
};

export default Link;
