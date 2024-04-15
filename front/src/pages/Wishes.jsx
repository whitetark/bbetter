import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from '../components/UI/Button';
import WishItem from '../components/Wishes/WishItem';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  return (
    <Styled.WishContent>
      <Styled.WishHeader>
        <h1>Wish List</h1>
        <Styled.WishActions>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.WishActions>
      </Styled.WishHeader>
      <Styled.WishList>
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
      </Styled.WishList>
    </Styled.WishContent>
  );
};

export default WishesPage;
