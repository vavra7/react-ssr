export type Navigate = (to: string, options?: { replace?: boolean }) => void;

export type LocationHook = (options?: {
  base?: string;
  staticPath?: string;
}) => [path: string, navigate: Navigate];
