import classNames from 'classnames';
import React, { FC, ReactNode } from 'react';

type Cols =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export interface ColProps {
  xs?: Cols;
  sm?: Cols;
  md?: Cols;
  lg?: Cols;
  xl?: Cols;
  className?: string;
  id?: string;
  children: ReactNode;
  style?: object;
}

const Col: FC<ColProps> = ({ className, id, style, children, xs, sm, md, lg, xl }) => {
  return (
    <div
      className={classNames('col', className, {
        [`col-xs-${xs}`]: xs,
        [`col-sm-${sm}`]: sm,
        [`col-md-${md}`]: md,
        [`col-lg-${lg}`]: lg,
        [`col-xl-${xl}`]: xl
      })}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
};

export default Col;
