export type PickRequired<Type, Keys extends keyof Type> = Type & Required<Pick<Type, Keys>>;
