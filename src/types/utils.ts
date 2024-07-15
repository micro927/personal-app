export type SetState<T> = (callback: ((prev: T) => T) | T) => void;

export type BasicObject = Record<string, string>;
