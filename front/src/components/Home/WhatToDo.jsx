import React from 'react';
import { useQuery } from 'react-query';
import { UserService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/WhatToDo.styled';
import LoadingWrapper from '../UI/LoadingWrapper';
import WhatToDoItem from './WhatToDoItem';

const WhatToDo = ({ onClick }) => {
  const { userData } = useAuthContext();
  const payload = {
    Id: userData.accountId,
  };

  const { data, isLoading } = useQuery(
    ['getDatesByMonth', payload],
    () => UserService.getWhatToDo(payload),
    {
      onError: (error) => {
        console.log('Get What To Do error: ' + error.message);
      },
      staleTime: 30000,
    },
  );

  const whatToDo = data?.data;

  return (
    <Styled.WhatToDo onClick={onClick}>
      <LoadingWrapper isLoading={isLoading}>
        {whatToDo?.topThree.length > 0 ? (
          <>
            <Styled.WhatToDoBlock>
              <h1>What To Do?</h1>
              {whatToDo?.topThree?.map((wtd, index) => (
                <WhatToDoItem key={index} data={wtd} hasType />
              ))}
            </Styled.WhatToDoBlock>
            <Styled.WhatToDoBlock>
              <h1>Good Habits</h1>
              {whatToDo?.topGhabits.length > 0 &&
                whatToDo?.topGhabits?.map((wtd, index) => <WhatToDoItem key={index} data={wtd} />)}
            </Styled.WhatToDoBlock>
            <Styled.WhatToDoBlock>
              <h1>Tasks</h1>
              {whatToDo?.topTasks.length > 0 &&
                whatToDo?.topTasks?.map((wtd, index) => <WhatToDoItem key={index} data={wtd} />)}
            </Styled.WhatToDoBlock>
            <Styled.WhatToDoBlock>
              <h1>Wishes</h1>
              {whatToDo?.topWishes.length > 0 &&
                whatToDo?.topWishes?.map((wtd, index) => <WhatToDoItem key={index} data={wtd} />)}
            </Styled.WhatToDoBlock>{' '}
          </>
        ) : (
          <Styled.WhatToDoBlock>
            <h1>You don`t have enough activities</h1>
          </Styled.WhatToDoBlock>
        )}
      </LoadingWrapper>
    </Styled.WhatToDo>
  );
};

export default WhatToDo;
