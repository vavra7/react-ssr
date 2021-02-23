import { FC, useEffect, useState } from 'react';

import { RouteConfig } from '../types';

interface DynamicRouteProps {
  module?: RouteConfig['module'];
  component?: RouteConfig['component'];
}

const DynamicRoute: FC<DynamicRouteProps> = ({ component, module }) => {
  const [Component, setComponent] = useState<any>(component);

  useEffect(() => {
    if (component) {
      setComponent(component);
    } else {
      (async () => {
        setComponent((await module!()).default);
      })();
    }
  }, [component]);

  if (Component) {
    return Component;
  } else {
    return null;
  }
};

export default DynamicRoute;
