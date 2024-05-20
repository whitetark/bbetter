import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useQuery } from 'react-query';
import { WishService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddWish } from '../../hooks/use-wish';
import * as Styled from '../../styles/Home.styled';
import { Button } from '../UI';
import LoadingWrapper from '../UI/LoadingWrapper';

const NewWish = ({ onClick, hide }) => {
  const { data, isLoading } = useQuery(['getNewActivity'], () => WishService.getNewWish(), {
    onError: (error) => {
      console.log('Get New Activity error: ' + error.message);
    },
    staleTime: 0,
    refetchOnMount: true,
  });

  const { userData } = useAuthContext();
  const { mutateAsync, isError, error } = useAddWish();

  const result = data?.data;

  const toggleAdd = () => {
    const newWish = {
      WishId: 0,
      Content: result.activity,
      AccountId: userData.accountId,
      isCompleted: false,
    };

    mutateAsync(newWish).then(hide());
  };

  return (
    <Styled.NewWish onClick={onClick}>
      <LoadingWrapper isLoading={isLoading}>
        <Styled.NewWishHeader>
          <h1>New Activity</h1>
          <Button onClick={toggleAdd}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.NewWishHeader>
        <Styled.NewWishMain>
          <p>{result?.activity}</p>
          <Styled.NewWishInfo>
            <p>
              Type: <span className='type'>{result?.type}</span>
            </p>
            {result?.link.length > 0 && (
              <p>
                <a href={result?.link}>More Info</a>
              </p>
            )}
          </Styled.NewWishInfo>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.NewWishMain>
      </LoadingWrapper>
    </Styled.NewWish>
  );
};

export default NewWish;
