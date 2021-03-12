import React, { FC } from 'react';

import Button from './Button';

export default {
  component: Button,
  title: 'Inputs And Controls/Button'
};

export const basic: FC = () => <Button>Basic</Button>;

export const primary: FC = () => <Button color="primary">Primary</Button>;

export const secondary: FC = () => <Button color="secondary">Secondary</Button>;
