import UrlPattern from 'url-pattern';

import {
  BuiltRouteConfig,
  BuiltRoutesConfig,
  isLocalizedPaths,
  isPathString,
  Location
} from '../types';

export interface Match {
  name: string | null;
  path: string | null;
  urlPattern: UrlPattern | null;
  lang: string | null;
  config: BuiltRouteConfig | null;
  allConfigs: BuiltRouteConfig[];
  params: Record<string, any>;
}

export class Matcher {
  public builtRoutesConfig: BuiltRoutesConfig;
  // TODO: language
  public lang = 'en';

  constructor(builtRoutesConfig: BuiltRoutesConfig) {
    this.builtRoutesConfig = builtRoutesConfig;
  }

  public getPath(location: Location): string | null {
    if (typeof location === 'string') {
      return location;
    } else {
      const match = this.getMatchByName(location.name, location.params, location.lang || this.lang);
      if (!match.config || !match.urlPattern) {
        console.warn('Path was not found for:', location);
        return null;
      }
      try {
        return match.urlPattern.stringify(match.params);
      } catch (err) {
        console.warn('Invalid params provided for:', location, err);
        return null;
      }
    }
  }

  public getMatch(location: Location): Match {
    if (typeof location === 'string') {
      return this.getMatchByPath(location);
    } else {
      return this.getMatchByName(location.name, location.params, location.lang || this.lang);
    }
  }

  private getMatchByPath(path: string): Match {
    let matchedConfigs: Match['allConfigs'] = [];
    let matchedParams: Match['params'] = {};
    let matchedUrlPattern: Match['urlPattern'] = null;
    let matchedLang: Match['lang'] = null;
    const findMatch = (
      configs: BuiltRoutesConfig,
      prevConfigs: Match['allConfigs'] = []
    ): boolean => {
      for (const config of configs) {
        if (config.children) {
          const success = findMatch(config.children, [...prevConfigs, config]);
          if (success) return true;
        } else {
          if (config.urlPatterns instanceof UrlPattern) {
            const _matchedParams = config.urlPatterns.match(path);
            if (_matchedParams) {
              matchedConfigs = [...prevConfigs, config];
              matchedParams = _matchedParams;
              matchedUrlPattern = config.urlPatterns;
              return true;
            }
          } else {
            let _matchedParams: Match['params'] | null = null;
            for (const [lang, urlPattern] of Object.entries(config.urlPatterns)) {
              if ((_matchedParams = urlPattern.match(path))) {
                matchedConfigs = [...prevConfigs, config];
                matchedParams = _matchedParams;
                matchedLang = lang;
                matchedUrlPattern = urlPattern;
                return true;
              }
            }
          }
        }
      }
      return false;
    };
    findMatch(this.builtRoutesConfig);
    const config = matchedConfigs.length ? matchedConfigs[matchedConfigs.length - 1] : null;
    const name = config ? config.name : null;
    return {
      name,
      path,
      urlPattern: matchedUrlPattern,
      lang: matchedLang,
      config,
      allConfigs: matchedConfigs,
      params: matchedParams
    };
  }

  private getMatchByName(
    name: string,
    params: Record<string, any> = {},
    lang: string | null = null
  ): Match {
    let matchedConfigs: Match['allConfigs'] = [];
    const findMatch = (
      configs: BuiltRoutesConfig,
      prevConfigs: Match['allConfigs'] = []
    ): boolean => {
      for (const config of configs) {
        if (config.name === name) {
          matchedConfigs = [...prevConfigs, config];
          return true;
        } else if (config.children) {
          const success = findMatch(config.children, [...prevConfigs, config]);
          if (success) return true;
        }
      }
      return false;
    };
    findMatch(this.builtRoutesConfig);
    const config = matchedConfigs.length ? matchedConfigs[matchedConfigs.length - 1] : null;
    const _name = config ? config.name : null;
    const _lang =
      lang && config && isLocalizedPaths(config.concatPath) && lang in config.concatPath
        ? lang
        : null;
    const path = (() => {
      let _path: Match['path'] = null;
      if (config) {
        if (isPathString(config.path)) {
          _path = config.path;
        } else if (_lang && config.path[_lang]) {
          _path = config.path[_lang]!;
        }
      }
      return _path;
    })();
    const urlPattern = (() => {
      let _urlPattern: Match['urlPattern'] = null;
      if (config?.urlPatterns) {
        if (config.urlPatterns instanceof UrlPattern) {
          _urlPattern = config.urlPatterns;
        } else if (_lang && config.urlPatterns[_lang]) {
          _urlPattern = config.urlPatterns[_lang]!;
        }
      }
      return _urlPattern;
    })();
    return {
      name: _name,
      urlPattern,
      path,
      lang: _lang,
      config,
      allConfigs: matchedConfigs,
      params
    };
  }
}
