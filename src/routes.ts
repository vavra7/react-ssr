import Home from './views/Home';
import About from './views/About';
import { RouteProps } from 'react-router-dom';

export const routes: RouteProps[] = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    component: About
  }
]