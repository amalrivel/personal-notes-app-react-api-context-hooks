import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNotes } from './useNotes';

export default function useResetErrorOnRouteChange() {
  const location = useLocation();
  const { resetError } = useNotes();

  useEffect(() => {
    resetError();
  }, [location.pathname, resetError]);
}
