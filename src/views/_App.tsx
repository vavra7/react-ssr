import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { routes } from '../routes';
import Home from './Home';

const App: FC = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  );
};

export default App;
