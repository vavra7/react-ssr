import { Match } from './Matcher';

export class RouterCache {
  private static loadedRoutes: Map<string, boolean> = new Map();
  private static matchByPath: Map<string, Match | null> = new Map();

  public static setLoadedRoute(name: string): void {
    this.loadedRoutes.set(name, true);
  }

  public static isRouteLoaded(name: string): boolean {
    return !!this.loadedRoutes.get(name);
  }

  public static setMatchByPath(path: string, match: Match | null): void {
    this.matchByPath.set(path, match);
  }

  public static getMatchByPath(path: string): Match | null {
    return this.matchByPath.get(path) || null;
  }
}
