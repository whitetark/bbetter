import { useMutation, useQuery, useQueryClient } from 'react-query';
import { GHabitService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';

export const useRefetchGHabits = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { data, error, isLoading } = useQuery(
    ['getGHabits', requestBody],
    () => GHabitService.getWithDates(requestBody),
    {
      onError: (error) => {
        console.log('Get GHabits error: ' + error.message);
      },
      staleTime: 1000 * 60 * 15,
    },
  );

  let ghabits;
  if (!data) {
    ghabits = [];
  } else {
    ghabits = data.data;
  }

  ghabits = ghabits.sort((wishA, wishB) => {
    return wishA.priorityOf - wishB.priorityOf;
  });

  return { ghabits, error, isLoading };
};

export const useAddGHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('addGHabit', (payload) => GHabitService.create(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGHabits');
    },
    onError: (error) => {
      console.log('GHabit add error:' + error);
    },
  });
};

export const useEditGHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('editGHabit', (payload) => GHabitService.update(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGHabits');
    },
    onError: (error) => {
      console.log('GHabit update error:' + error);
    },
  });
};

export const useDeleteGHabit = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteGHabit', (payload) => GHabitService.deleteById(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGHabits');
    },
    onError: (error) => {
      console.log('GHabit delete error:' + error);
    },
  });
};

export const useAddGHabitDate = () => {
  const queryClient = useQueryClient();
  return useMutation('addGHabitDate', (payload) => GHabitService.createDate(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGHabits');
      queryClient.invalidateQueries('getDatesByMonth');
    },
    onError: (error) => {
      console.log('GHabit date add error:' + error);
    },
  });
};
export const useDeleteGHabitDate = () => {
  const queryClient = useQueryClient();
  return useMutation('deleteGHabitDate', (payload) => GHabitService.deleteDate(payload), {
    onSuccess: () => {
      queryClient.invalidateQueries('getGHabits');
      queryClient.invalidateQueries('getDatesByMonth');
    },
    onError: (error) => {
      console.log('GHabit date delete error:' + error);
    },
  });
};
