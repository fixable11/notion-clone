import { createContext } from 'react';
import { AppStateContextType } from './AppStateContext.tsx';

export const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);
