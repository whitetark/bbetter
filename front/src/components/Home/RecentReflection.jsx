import React from 'react';
import { useQuery } from 'react-query';
import { UserService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Home.styled';
import ReflectionItem from '../Reflections/ReflectionItem';
import LoadingWrapper from '../UI/LoadingWrapper';

const RecentReflection = () => {
  const { userData } = useAuthContext();
  const requestBody = {
    Id: userData.accountId,
  };

  const { data, isLoading } = useQuery(
    ['getRecentReflection', requestBody],
    () => UserService.getRecentReflection(requestBody),
    {
      onError: (error) => {
        console.log('Get Recent Reflection error: ' + error.message);
      },
      staleTime: 500000,
    },
  );

  const reflection = data?.data;
  return (
    <Styled.RecentReflection>
      <LoadingWrapper isLoading={isLoading}>
        {reflection ? (
          <ReflectionItem reflection={reflection} />
        ) : (
          <p>You don`t have reflections yet</p>
        )}
      </LoadingWrapper>
    </Styled.RecentReflection>
  );
};

export default RecentReflection;
