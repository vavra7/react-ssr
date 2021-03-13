import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';

import { Color } from '../../types';

export interface ProgressLinearProps {
  color?: Color;
  active?: boolean;
  style?: Record<string, string | number>;
  className?: string;
}

const ProgressLinear: FC<ProgressLinearProps> = ({
  color = 'primary',
  active = true,
  style,
  className
}) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-valuemax={100}
          aria-valuemin={0}
          className={classNames('c-progress-linear', className)}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key="progress-linear"
          role="progressbar"
          style={style}
          transition={{ duration: 0.3 }}
        >
          <div className={`c-progress-linear__background ${color} transparent-2`} />
          <div className={`c-progress-linear__buffer ${color}`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgressLinear;
