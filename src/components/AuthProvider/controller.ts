import type { AuthContextType } from '#types/component';
import { ServiceContext } from '@components/ServiceProvider/context';
import { getStorageUser, removeStorageUser, setStorageUser } from '@utils/auth';
import type { User, UserFormValues } from '@services';
import { useContext, useState } from 'react';

function useController() {
  const storageUser = getStorageUser() ?? ({} as User);

  const [isLoggedIn, setIsLoggedIn] = useState(storageUser?.id !== undefined);
  const [user, setUser] = useState<User>(storageUser);
  const { usersService } = useContext(ServiceContext);

  const login = async ({ username }: UserFormValues) => {
    return usersService
      .getUserByUsername(username)
      .then(({ error, data }) => {
        if (error || data.length < 1) {
          setIsLoggedIn(false);
          throw 'not found';
        } else {
          const user = data[0];
          setIsLoggedIn(true);
          setUser(user);
          setStorageUser(user);
          return;
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        throw 'failed';
      });
  };

  const logout = () => {
    removeStorageUser();
    setIsLoggedIn(false);
  };

  const context: AuthContextType = {
    isLoggedIn,
    login,
    logout,
    user,
  };
  return { context };
}

export default useController;
