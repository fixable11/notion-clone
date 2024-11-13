import { usePageState } from './usePageState.ts';
import { createContext, useContext, ReactNode } from 'react';
import { Page } from '../utils/types.ts';

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>({} as AppStateContextType);

type AppStateProviderProps = {
  children: ReactNode;
  initialState: Page;
};

export const AppStateProvider = ({ children, initialState }: AppStateProviderProps) => {
  const pageStateHandlers = usePageState(initialState);

  return <AppStateContext.Provider value={pageStateHandlers}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
