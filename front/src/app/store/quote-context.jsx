import { createContext, useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { QuoteService } from '../services/api';
import { useAuthContext } from './auth-context';

const QuoteContext = createContext();

export const QuoteContextProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { refetch: refetchQuotes } = useQuery(
    ['getQuotes', requestBody],
    () => QuoteService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Quotes error: ' + error.message);
      },
      onSuccess: (data) => {
        setQuotes(data.data);
      },
    },
  );

  const addQuote = useMutation('addQuote', (payload) => QuoteService.create(payload), {
    onSuccess: () => {
      refetchQuotes();
    },
    onError: (error) => {
      console.log('Quote add error:' + error);
    },
  });

  const editQuote = useMutation('editQuote', (payload) => QuoteService.update(payload), {
    onSuccess: () => {
      refetchQuotes();
    },
    onError: (error) => {
      console.log('Quote update error:' + error);
    },
  });

  const deleteQuote = useMutation('deleteQuote', (payload) => QuoteService.deleteById(payload), {
    onSuccess: () => {
      refetchQuotes();
    },
    onError: (error) => {
      console.log('Quote delete error:' + error);
    },
  });

  return (
    <QuoteContext.Provider
      value={{ quotes, setQuotes, refetchQuotes, addQuote, editQuote, deleteQuote }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteContext must be used within a ThemeContextProvider');
  }
  return context;
};
export default QuoteContext;
