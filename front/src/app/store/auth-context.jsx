import { createContext, useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserService } from '../services/api';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    if (localStorage.getItem('token')) {
      let token = JSON.parse(localStorage.getItem('token'));
      return token;
    }
    return null;
  });
  const [userData, setUserData] = useState(null);
  const [serverIsOn, setServerIsOn] = useState(false);
  const queryClient = useQueryClient();

  useQuery('user data', () => UserService.fetchUserData(), {
    onSuccess: ({ data }) => {
      setUserData(data);
    },
    onError: (error) => {
      console.log('Fetching Data error', error.message);
      setUserData(null);
    },
  });

  useQuery('get status', () => UserService.getStatus(), {
    onSuccess: () => {
      setServerIsOn(true);
    },
    onError: () => {
      setServerIsOn(false);
    },
  });

  const useUpdateUser = useMutation('updateUser', (payload) => UserService.updateUser(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('user data');
      queryClient.invalidateQueries('getQuoteOfTheDay');
    },
    onError: (error) => {
      console.log('Update user error:' + error);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userData,
        serverIsOn,
        setUserData,
        setUserToken,
        setServerIsOn,
        useUpdateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a ThemeContextProvider');
  }
  return context;
};
export default AuthContext;
