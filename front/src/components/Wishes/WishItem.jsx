import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useEditWish } from '../../hooks/use-wish';
import * as Styled from '../../styles/Wishes.styled';

const WishItem = ({ data }) => {
  const [isChecked, setIsChecked] = useState(data.isCompleted);
  const [initialRender, setInitialRender] = useState(false);
  const { mutateAsync } = useEditWish();

  useEffect(() => {
    if (!initialRender) {
      setInitialRender(true);
      return;
    }

    const timer = setTimeout(() => {
      const task = {
        ...data,
        isCompleted: isChecked,
        completeDate: dayjs(new Date()).format(),
      };

      if (data.isCompleted == isChecked) {
        return;
      }

      mutateAsync(task);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isChecked]);

  return (
    <Styled.WishItem className={isChecked ? 'checked' : ''}>
      <Styled.Input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      <div className='content'>{data.content}</div>
    </Styled.WishItem>
  );
};

export default WishItem;
