import { Service } from 'typedi';

@Service()
export class Location {
  public getCurrentPathname(base = '', pathname = '/'): string {
    return !pathname.toLowerCase().indexOf(base.toLowerCase())
      ? pathname.slice(base.length) || '/'
      : pathname;
  }
}
