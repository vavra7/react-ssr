import UrlPattern from 'url-pattern';

import { ConfigPath, isPathString, UrlPatterns } from '../types';

export function buildUrlPatterns(configPath: ConfigPath): UrlPatterns {
  if (isPathString(configPath)) {
    return new UrlPattern(configPath);
  } else {
    const urlPatterns: UrlPatterns = {};
    Object.entries(configPath).forEach(([lang, path]) => {
      urlPatterns[lang] = new UrlPattern(path!);
    });
    return urlPatterns;
  }
}
