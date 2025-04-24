import { createContext, useState, useEffect } from 'react';
import { getAccessToken, getUserLogged, putAccessToken } from '../utils/network-data';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLogged = async () => {
      if (getAccessToken()) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthUser(data);
        }
      }
      setIsLoading(false);
    };

    fetchUserLogged();
  }, []);

  const onLoginSuccess = async accessToken => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthUser(data);
  };

  const onLogout = () => {
    setAuthUser(null);
    putAccessToken('');
  };

  return (
    <AuthContext.Provider value={{ authUser, isLoading, onLoginSuccess, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
