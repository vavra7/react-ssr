import { useRoute } from '@react-ssr/router';
import { ProgressLinear } from '@react-ssr/ui-components';
import React, { FC } from 'react';

const RouteLoader: FC = () => {
  const { loading } = useRoute();

  return (
    <ProgressLinear
      active={loading}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}
    />
  );
};

export default RouteLoader;
