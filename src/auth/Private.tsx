import { ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthSessionContext } from './authContext.ts';

type PrivateProps = {
  component: ReactElement;
};

export const Private = ({ component }: PrivateProps) => {
  const { session, loading } = useContext(AuthSessionContext);

  if (loading) {
    return <>Authenticating...</>;
  }

  return session ? component : <Navigate to="/auth" />;
};
