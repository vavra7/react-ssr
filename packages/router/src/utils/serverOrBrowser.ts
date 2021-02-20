function isServer(): boolean {
  return typeof window === 'undefined';
}

export const __SERVER__ = isServer() ? true : false;
export const __BROWSER__ = isServer() ? false : true;
