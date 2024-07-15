import type { User } from '@utils/service';

const LOCAL_STORAGE_USER = 'app-user';

export const setStorageUser = (user: User) =>
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));

export const getStorageUser = () => {
  const value = localStorage.getItem(LOCAL_STORAGE_USER);
  if (value) {
    try {
      const user = JSON.parse(value) as User;
      return user;
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export const removeStorageUser = () =>
  localStorage.removeItem(LOCAL_STORAGE_USER);
