import { createElement, FC } from 'react';

import { useRouter } from '../hooks';

export interface RouterViewProps {}

const RouterView: FC<RouterViewProps> = () => {
  const { matcher, path } = useRouter();
  const routeConfig = matcher.getRouteConfig(path);

  if (routeConfig) {
    return createElement(routeConfig.component);
  } else {
    return null;
  }
};

export default RouterView;
