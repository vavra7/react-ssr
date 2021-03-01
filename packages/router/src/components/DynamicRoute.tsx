import { FC, useEffect, useState } from 'react';

import { RouteConfig } from '../types';

interface DynamicRouteProps {
  loadComponent?: RouteConfig['loadComponent'];
  component?: RouteConfig['component'];
}

const DynamicRoute: FC<DynamicRouteProps> = ({ component, loadComponent }) => {
  const [Component, setComponent] = useState<any>(component);

  useEffect(() => {
    if (component) {
      setComponent(component);
    } else {
      (async () => {
        setComponent((await loadComponent!()).default);
      })();
    }
  }, [component, loadComponent]);

  if (Component) {
    return Component;
  } else {
    return null;
  }
};

export default DynamicRoute;
