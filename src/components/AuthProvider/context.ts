import type { AuthContextType } from '#types/component';
import { createContext } from 'react';

export const AuthContext = createContext({} as AuthContextType);
