import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QuoteService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchQuotes = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { data, error, isLoading } = useQuery(
    ['getQuotes', requestBody],
    () => QuoteService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get Quotes error: ' + error.message);
      },
    },
  );

  let quotes;
  if (!data) {
    quotes = [];
  } else {
    quotes = data.data;
  }
  return { quotes, error, isLoading };
};

export const useAddQuote = () => {
  const queryClient = useQueryClient();
  return useMutation('addQuote', (payload) => QuoteService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getQuotes');
    },
    onError: (error) => {
      console.log('Quote add error:' + error);
    },
  });
};

export const useEditQuote = () => {
  const queryClient = useQueryClient();
  return useMutation('editQuote', (payload) => QuoteService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getQuotes');
    },
    onError: (error) => {
      console.log('Quote update error:' + error);
    },
  });
};

export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteQuote', (payload) => QuoteService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getQuotes');
    },
    onError: (error) => {
      console.log('Quote delete error:' + error);
    },
  });
};
