import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

export interface RowProps {
  className?: string;
  id?: string;
  children: ReactNode;
  style?: object;
}

const Row: FC<RowProps> = ({ id, className, style, children }) => {
  return (
    <div className={classNames('row', className)} id={id} style={style}>
      {children}
    </div>
  );
};

export default Row;
