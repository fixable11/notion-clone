import { supabase } from '../supabaseClient.ts';
import { ReactNode, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { AuthSessionContext } from './authContext.ts';

export type AuthSessionContextValue = {
  session: Session | null;
  loading: boolean;
};

export type AuthSessionProviderProps = {
  children: ReactNode;
};
export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      setSession(data.session);
      setLoading(false);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    auth();
  }, []);

  return (
    <AuthSessionContext.Provider value={{ session, loading }}>
      {children}
    </AuthSessionContext.Provider>
  );
};
