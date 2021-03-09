import { useRoute } from '@react-ssr/router';
import React, { FC } from 'react';

const RouteLoader: FC = () => {
  const { loading } = useRoute();

  const loader = <div style={{ height: '20px', width: '20px', background: 'red' }} />;

  return <>{loading && loader}</>;
};

export default RouteLoader;
