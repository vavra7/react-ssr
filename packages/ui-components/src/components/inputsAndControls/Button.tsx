import { motion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';

import { Color } from '../../types';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: Color;
  style?: Record<string, string | number>;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  color = 'neutral',
  style,
  className,
  onClick
}) => {
  return (
    <motion.button
      className={`c-btn ${color} ${className}`}
      onClick={onClick}
      style={style}
      type={type}
      whileTap={{ scale: 0.95 }}
    >
      <span className="c-btn__content">{children}</span>
    </motion.button>
  );
};

export default Button;
