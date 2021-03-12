import React, { FC, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<ButtonProps> = ({ children, type = 'button' }) => {
  return (
    <button className="test" type={type}>
      {children}
    </button>
  );
};

export default Button;
