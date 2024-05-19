import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React from 'react';
import useModal from '../../hooks/use-modal';
import { useDeleteReflection } from '../../hooks/use-reflections';
import * as Styled from '../../styles/Reflections.styled';
import { Button, Confirmation, Modal } from '../UI';
import ReflectionEdit from './ReflectionEdit';

const ReflectionItem = ({ reflection }) => {
  const { isShowing: editIsShowing, toggle: toggleEdit } = useModal();
  const { isShowing: deleteIsShowing, toggle: toggleDelete } = useModal();
  const { mutateAsync: deleteAsync, isError, error } = useDeleteReflection();

  const handleDelete = (requestBody) => {
    deleteAsync(requestBody).then(toggleDelete());
  };

  const requestBody = {
    Id: reflection?.reflectionId,
  };
  return (
    reflection && (
      <Styled.ReflectionItem>
        <Styled.ReflectionHeader>
          <Styled.ReflectionDate>
            {dayjs(reflection.dateOf).format('DD/MM/YYYY')}
          </Styled.ReflectionDate>
          <Styled.ReflectionActions>
            <Button onClick={toggleEdit}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleDelete}>
              <FontAwesomeIcon icon='fa-solid fa-trash-can' fixedWidth />
            </Button>
          </Styled.ReflectionActions>
        </Styled.ReflectionHeader>
        <Styled.ReflectionMain>
          <Styled.ReflectionMainEmotion>
            <div>
              <FontAwesomeIcon icon='fa-regular fa-face-smile' fixedWidth />
              {reflection.emotion}
            </div>
            <div>
              <FontAwesomeIcon icon='fa-solid fa-person-digging' fixedWidth />
              {reflection.productivity}
            </div>
          </Styled.ReflectionMainEmotion>
          <Styled.ReflectionMainBlock>
            <p>Three Words</p>
            <div>{reflection.threeWords}</div>
          </Styled.ReflectionMainBlock>
          <Styled.ReflectionMainBlock>
            <p>User Goal</p>
            <div>{reflection.userGoal}</div>
          </Styled.ReflectionMainBlock>
        </Styled.ReflectionMain>
        <Modal isShowing={editIsShowing} hide={toggleEdit} className='task-modal' hasOverlay>
          <ReflectionEdit data={reflection} hide={toggleEdit} />
        </Modal>
        <Modal isShowing={deleteIsShowing} hide={toggleDelete} className='task-modal' hasOverlay>
          <Confirmation hide={toggleDelete} onDelete={() => handleDelete(requestBody)} />
        </Modal>
      </Styled.ReflectionItem>
    )
  );
};

export default ReflectionItem;
