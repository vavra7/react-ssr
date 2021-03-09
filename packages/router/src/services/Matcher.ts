import UrlPattern from 'url-pattern';

import { BuiltRouteConfig, BuiltRoutesConfig, Location } from '../types';
import { RouterCache } from './RouterCache';

export interface Match {
  name: string;
  path: string;
  urlPattern: UrlPattern;
  lang: string | null;
  config: BuiltRouteConfig;
  allConfigs: BuiltRouteConfig[];
  params: Record<string, any>;
}

interface ExtractedConfig {
  urlPattern: Match['urlPattern'];
  path: Match['path'];
  params: Match['params'];
  lang: Match['lang'];
}

export class Matcher<Lang extends string = string> {
  public builtRoutesConfig: BuiltRoutesConfig;
  public lang: Lang | null = null;

  constructor(builtRoutesConfig: BuiltRoutesConfig) {
    this.builtRoutesConfig = builtRoutesConfig;
  }

  public getPath(location: Location): string | null {
    if (typeof location === 'string') {
      return location;
    } else {
      const match = this.getMatchByName(location.name, location.params, location.lang || this.lang);
      return match ? match.path : null;
    }
  }

  public getMatch(location: Location): Match | null {
    if (typeof location === 'string') {
      let match: Match | null;
      match = RouterCache.getMatchByPath(location);
      if (match) {
        return match;
      } else {
        match = this.getMatchByPath(location);
        RouterCache.setMatchByPath(location, match);
        return match;
      }
    } else {
      return this.getMatchByName(location.name, location.params, location.lang || this.lang);
    }
  }

  private getMatchByPath(path: string): Match | null {
    let matchedConfigs: Match['allConfigs'] = [];
    let matchedParams: Match['params'] = {};
    let matchedUrlPattern: Match['urlPattern'] | null = null;
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
    if (!matchedConfigs.length) {
      console.warn(`No config was found for path ${path}`);
      return null;
    }
    const config = matchedConfigs[matchedConfigs.length - 1];
    if (!matchedUrlPattern) {
      console.warn(`No urlPattern was found for path ${path}`);
      return null;
    }
    const name = config.name;
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
  ): Match | null {
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
    if (!matchedConfigs.length) {
      console.warn(`No config was found for location ${name}`);
      return null;
    }
    const config = matchedConfigs[matchedConfigs.length - 1];
    const extractedConfig = this.extractConfig(config, params, lang);
    if (!extractedConfig) {
      console.warn(`Failed process config ${config.name}`);
      return null;
    }
    return {
      name,
      urlPattern: extractedConfig.urlPattern,
      path: extractedConfig.path,
      lang: extractedConfig.lang,
      config,
      allConfigs: matchedConfigs,
      params
    };
  }

  private extractConfig(
    config: BuiltRouteConfig,
    params: Record<string, string>,
    lang: string | null = null
  ): ExtractedConfig | null {
    let matchedLang: Match['lang'] = lang;
    let matchedUrlPattern: Match['urlPattern'];
    let matchedPath: Match['path'];
    if (config.urlPatterns instanceof UrlPattern) {
      matchedUrlPattern = config.urlPatterns;
    } else if (matchedLang && config.urlPatterns[matchedLang]) {
      matchedUrlPattern = config.urlPatterns[matchedLang];
    } else if (matchedLang && !config.urlPatterns[matchedLang]) {
      return null;
    } else {
      const [_lang, _urlPattern] = Object.entries(config.urlPatterns)[0];
      matchedLang = _lang;
      matchedUrlPattern = _urlPattern;
    }
    try {
      matchedPath = matchedUrlPattern.stringify(params);
    } catch (err) {
      console.warn(`Invalid params provided for config ${config.name}`);
      return null;
    }
    return {
      path: matchedPath,
      params,
      urlPattern: matchedUrlPattern,
      lang
    };
  }
}
