import React, { FC } from 'react';

import { ViewsConfigsContext } from '../context/viewsConfigsContext';
import View from './View';

export interface RouterViewProps {}

const RouterView: FC<RouterViewProps> = () => {
  console.log('rendering... (RouterView)');
  return (
    <ViewsConfigsContext.Consumer>
      {configs => (
        <ViewsConfigsContext.Provider value={configs.slice(1)}>
          {configs[0] && <View config={configs[0]} />}
        </ViewsConfigsContext.Provider>
      )}
    </ViewsConfigsContext.Consumer>
  );
};

export default RouterView;
