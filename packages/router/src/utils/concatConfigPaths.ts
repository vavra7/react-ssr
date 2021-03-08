import { ConfigPath, isLocalizedPaths, isPathString, LocalizedPaths, PathString } from '../types';

export function concatConfigPaths(prevConfigPath: ConfigPath, configPath: ConfigPath): ConfigPath {
  const concatPath = (prevPath: PathString, path: PathString): PathString =>
    (prevPath.replace(/\/$/, '') + path) as PathString;

  if (isPathString(prevConfigPath) && isPathString(configPath)) {
    return concatPath(prevConfigPath, configPath);
  } else if (isPathString(prevConfigPath) && isLocalizedPaths(configPath)) {
    return {
      ...(() => {
        const localizedPaths: LocalizedPaths = {};
        let lang: keyof typeof configPath;
        for (lang in configPath) {
          localizedPaths[lang] = concatPath(
            prevConfigPath,
            configPath[lang] || Object.values(configPath)[0] || '/'
          );
        }
        return localizedPaths;
      })()
    };
  } else if (isLocalizedPaths(prevConfigPath) && isPathString(configPath)) {
    return {
      ...(() => {
        const localizedPaths: LocalizedPaths = {};
        let lang: keyof typeof prevConfigPath;
        for (lang in prevConfigPath) {
          localizedPaths[lang] = concatPath(
            prevConfigPath[lang] || Object.values(prevConfigPath)[0] || '/',
            configPath
          );
        }
        return localizedPaths;
      })()
    };
  } else if (isLocalizedPaths(prevConfigPath) && isLocalizedPaths(configPath)) {
    return {
      ...(() => {
        const localizedPaths: LocalizedPaths = {};
        const langs = [...Object.keys(prevConfigPath), ...Object.keys(configPath)].filter(
          (lang, index, arr) => arr.indexOf(lang) === index
        );
        langs.forEach(lang => {
          localizedPaths[lang] = concatPath(
            prevConfigPath[lang] || Object.values(prevConfigPath)[0] || '/',
            configPath[lang] || Object.values(configPath)[0] || '/'
          );
        });
        return localizedPaths;
      })()
    };
  } else {
    return '/';
  }
}
