import type { userType } from '../types';
import { createContext } from 'react';

type authContextType = {
  user: userType | null;
  signin: (newUser: userType, cb: () => void) => void;
};

export const AuthContext = createContext<authContextType | null>(null);
