export function getCurrentPath(base = '', path = location.pathname): string {
  return !path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || '/' : path;
}
