import { motion } from 'framer-motion';
import React, { FC, ReactNode } from 'react';

import { Color } from '../../types';

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: Color;
  style?: Record<string, string | number>;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  color = 'neutral',
  style,
  className
}) => {
  return (
    <motion.button
      className={`c-btn ${color} ${className}`}
      style={style}
      type={type}
      whileTap={{ scale: 0.9 }}
    >
      <span className="c-btn__content">{children}</span>
    </motion.button>
  );
};

export default Button;
