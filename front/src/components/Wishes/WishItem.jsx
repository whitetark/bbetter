import React from 'react';
import { useWishContext } from '../../app/store/wish-context';
import * as Styled from '../../styles/Wishes.styled';

const WishItem = ({ data }) => {
  const isChecked = data.isCompleted;
  const { editWish } = useWishContext();

  const handleChange = (event) => {
    const wish = {
      ...data,
      isCompleted: event.target.checked,
    };
    editWish.mutateAsync(wish);
  };

  return (
    <Styled.WishItem className={isChecked ? 'checked' : ''}>
      <Styled.Input type='checkbox' checked={isChecked} onChange={handleChange} />
      <div className='content'>{data.content}</div>
    </Styled.WishItem>
  );
};

export default WishItem;
