import type { BasicObject } from '#types/utils';

export const useLocalStorageItem = <
  T extends unknown[] | BasicObject = [] | BasicObject
>(
  localStorageKey: string
) => {
  const get = () => {
    const item = localStorage.getItem(localStorageKey);
    if (!item) {
      localStorage.setItem(localStorageKey, '');
      return null;
    }
    return JSON.parse(item) as T;
  };

  const set = (item: T) =>
    localStorage.setItem(localStorageKey, JSON.stringify(item));
  const remove = () => localStorage.removeItem(localStorageKey);

  return {
    get,
    set,
    remove,
  };
};
