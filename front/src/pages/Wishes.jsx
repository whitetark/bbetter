import React from 'react';
import Button from '../components/UI/Button';
import WishItem from '../components/Wish/WishItem';
import * as Styled from '../styles/Wishes.styled';

const WishesPage = () => {
  return (
    <Styled.WishContent>
      <h1>Wish List</h1>
      <Styled.WishList>
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
        <WishItem />
      </Styled.WishList>
      <Styled.WishActions>
        <Button>Show Wish List</Button>
        <Button className='active'>Add New Wish</Button>
      </Styled.WishActions>
    </Styled.WishContent>
  );
};

export default WishesPage;
