import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BHabitService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchBHabits = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { data, error, isLoading } = useQuery(
    ['getBHabits', requestBody],
    () => BHabitService.getByAccount(requestBody),
    {
      onError: (error) => {
        console.log('Get BHabits error: ' + error.message);
      },
      staleTime: 1000 * 60 * 15,
    },
  );

  let bhabits, quote, workOnHabit, bestHabit;
  if (!data) {
    bhabits = [];
    quote = [];
  } else {
    bhabits = data.data.bHabits;
    quote = data.data.quote;
    workOnHabit = data.data.worstBHabit;
    bestHabit = data.data.bestBHabit;
  }

  return { bhabits, quote, workOnHabit, bestHabit, error, isLoading };
};

export const useAddBHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('addBHabit', (payload) => BHabitService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getBHabits');
    },
    onError: (error) => {
      console.log('BHabit add error:' + error);
    },
  });
};

export const useEditBHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('editBHabit', (payload) => BHabitService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getBHabits');
    },
    onError: (error) => {
      console.log('BHabit update error:' + error);
    },
  });
};

export const useDeleteBHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteBHabit', (payload) => BHabitService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getBHabits');
    },
    onError: (error) => {
      console.log('BHabit delete error:' + error);
    },
  });
};

export const useAddBHabitDate = () => {
  const queryClient = useQueryClient();
  return useMutation('addBHabitDate', (payload) => BHabitService.createDate(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getBDatesByMonth');
      queryClient.invalidateQueries('getBHabits');
    },
    onError: (error) => {
      console.log('BHabit date add error:' + error);
    },
  });
};
export const useDeleteBHabitDate = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteBHabitDate', (payload) => BHabitService.deleteDate(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getBDatesByMonth');
      queryClient.invalidateQueries('getBHabits');
    },
    onError: (error) => {
      console.log('BHabit date delete error:' + error);
    },
  });
};
