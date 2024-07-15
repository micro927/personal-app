import type { PropsWithChildren } from 'react';
import { AuthContext } from './context';
import useController from './controller';

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { context } = useController();
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
