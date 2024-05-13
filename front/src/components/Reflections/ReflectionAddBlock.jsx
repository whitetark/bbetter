import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import useModal from '../../hooks/use-modal';
import * as Styled from '../../styles/Reflections.styled';
import { Modal } from '../UI';
import ReflectionAdd from './ReflectionAdd';
import ReflectionItem from './ReflectionItem';

dayjs.extend(updateLocale);
dayjs.extend(utc);

dayjs.updateLocale('en', {
  weekStart: 1,
});

const ReflectionItemBlock = ({ reflection, value }) => {
  const { isShowing, toggle } = useModal();

  const findValuesSunday = (day) => dayjs.utc(day).startOf('week').add(6, 'day');

  const valuesSunday = findValuesSunday(value);
  console.log(valuesSunday);
  return (
    <>
      <Styled.ReflectionAddBlock>
        {reflection ? (
          <ReflectionItem reflection={reflection} />
        ) : (
          <Styled.ReflectionButtonBlock>
            <Styled.ReflectionAddButton onClick={toggle}>Add</Styled.ReflectionAddButton>
          </Styled.ReflectionButtonBlock>
        )}
      </Styled.ReflectionAddBlock>
      <Modal isShowing={isShowing} hide={toggle} className='task-modal' hasOverlay>
        <ReflectionAdd hide={toggle} date={valuesSunday} />
      </Modal>
    </>
  );
};

export default ReflectionItemBlock;
