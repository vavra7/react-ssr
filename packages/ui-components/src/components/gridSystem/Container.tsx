import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

export interface ContainerProps {
  fluid?: boolean;
  className?: string;
  id?: string;
  children: ReactNode;
  style?: object;
}

const Container: FC<ContainerProps> = ({ id, fluid = false, className, children, style }) => {
  return (
    <div
      className={classNames(className, { container: !fluid, 'container-fluid': fluid })}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
