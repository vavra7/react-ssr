import React, { FC } from 'react';

import ProgressLinear from './ProgressLinear';

export default {
  component: ProgressLinear,
  title: 'Progress/Progress Linear'
};

export const basic: FC = () => <ProgressLinear />;

export const colorSecondary: FC = () => <ProgressLinear color="secondary" />;
