import Link from './components/Link';
import RouterProvider from './components/RouterProvider';
import RouterView from './components/RouterView';
import { addHistoryEvents, preloadComponents } from './utils';

addHistoryEvents();

export * from './hoc';
export * from './hooks';
export * from './types';
export { Link, preloadComponents, RouterProvider, RouterView };
