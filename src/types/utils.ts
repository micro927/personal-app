export type SetState<T> = (callback: ((prev: T) => T) | T) => void;

export type BasicObject = Record<string, string | string[] | number | number[]>;

export type Timeout = ReturnType<typeof setTimeout>;

export type ClickOrTouchHandler<T extends Element> = (
  e: React.MouseEvent<T> | React.TouchEvent<T>
) => void;
