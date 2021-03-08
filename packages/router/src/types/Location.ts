export type Location =
  | string
  | { name: string; params?: Record<string, string | number>; lang?: string };
