import { Router } from '@react-ssr/router';

import { Lang } from '../enums';
import { routes } from './routes';

const router = new Router<Lang>(routes);
router.defaultLang = Lang.En;

export { router };
