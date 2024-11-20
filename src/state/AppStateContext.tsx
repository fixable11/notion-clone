import { usePageState } from './usePageState.ts';
import { ReactNode, useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { Page } from '../utils/types.ts';
import { supabase } from '../supabaseClient.ts';
import styles from '../utils.module.css';
import { Loader } from '../components/Loader.tsx';
import startPageScaffold from './startPageScaffold.json';
import { AppStateContext } from './appContext.ts';

export type AppStateContextType = ReturnType<typeof usePageState>;

type AppStateProviderProps = {
  children: ReactNode;
  // initialState: Page;
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const match = useMatch('/:slug');
  const pageSlug = match ? match.params.slug : 'start';
  const [initialState, setInitialState] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  const defaultPage: Page = {
    id: '#',
    slug: 'start',
    cover: '',
    nodes: [],
    title: 'test'
  };

  async function fetchInitialState() {
    try {
      setIsLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        throw new Error('User is not logged in');
      }
      const { data } = await supabase
        .from('pages')
        .select('title, id, cover, nodes, slug')
        .match({ slug: pageSlug, created_by: user.id })
        .limit(1);

      const serverState: Page | undefined = data?.[0];

      if (!serverState && pageSlug === 'start') {
        const result = await supabase
          .from('pages')
          .insert({
            ...startPageScaffold,
            created_by: user.id
          })
          .single();
        setInitialState(result.data!);
      } else {
        setInitialState(serverState || defaultPage);
        console.log('serverState', serverState);
        console.log('initialState', initialState);
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialState();
  }, [pageSlug]);

  console.log('RENDER', initialState);

  const pageStateHandlers = usePageState(initialState || defaultPage);

  setTimeout(() => console.log('pageStateHandlers', pageStateHandlers.page, 3000), 3000);

  if (isLoading) {
    return (
      <div className={styles.centeredFlex}>
        <Loader></Loader>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!initialState) {
    return <div className={styles.centeredFlex}>Page not found</div>;
  }

  return <AppStateContext.Provider value={pageStateHandlers}>{children}</AppStateContext.Provider>;
};
