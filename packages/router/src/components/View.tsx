import { createElement, FC, memo } from 'react';

import { BuiltRouteConfig } from '../types';

export interface ViewProps {
  config: BuiltRouteConfig;
}

const View: FC<ViewProps> = ({ config }) => {
  console.log('rendering... (View)');
  return createElement(config.component!);
};

export default memo(View);
