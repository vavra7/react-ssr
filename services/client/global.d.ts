declare const __BROWSER__: boolean;
declare const __SERVER__: boolean;

declare module '*.png' {
  const value: any;
  export = value;
}
