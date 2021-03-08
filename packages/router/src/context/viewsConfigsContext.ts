import { createContext } from 'react';

import { PreloadedRouteConfig } from '../types';

export type ViewsConfigs = PreloadedRouteConfig[];

export const ViewsConfigsContext = createContext<ViewsConfigs>([]);
