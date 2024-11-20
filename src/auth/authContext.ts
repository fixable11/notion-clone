import { createContext } from 'react';
import { AuthSessionContextValue } from './AuthSessionContext.tsx';

export const AuthSessionContext = createContext<AuthSessionContextValue>(
  {} as AuthSessionContextValue
);
