import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import LoadingWrapper from '../components/UI/LoadingWrapper';
import Pagination from '../components/UI/Paginations';
import { Button, Modal } from '../components/UI/index';
import { TaskAdd, TaskItem } from '../components/index';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import { useRefetchTasks } from '../hooks/use-task';
import * as Styled from '../styles/TaskList.styled';
import { TaskEmpty } from '../styles/Tasks.styled';

const TaskListPage = () => {
  document.title = `bbetter - All Tasks`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 10;

  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { tasks, isLoading, error } = useRefetchTasks();
  const navigate = useNavigate();

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    tasks && setTotalPages(Math.ceil(tasks.length / postsPerPage));
  }, [tasks]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  const handleGoBack = () => {
    navigate(PathConstants.TASK);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = tasks && tasks.slice(firstPostIndex, lastPostIndex);
  return (
    <Styled.TaskList>
      <Styled.TaskListHeader>
        <Styled.TaskListHeaderBlock>
          <Button onClick={handleGoBack}>
            <FontAwesomeIcon icon='fa-solid fa-arrow-left' fixedWidth />
          </Button>
          <Styled.TaskListActions>
            <Button onClick={toggleEdit} className={isEdit && 'active'}>
              <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
            </Button>
            <Button onClick={toggleAdd}>
              <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
            </Button>
          </Styled.TaskListActions>
        </Styled.TaskListHeaderBlock>
        {tasks && tasks.length > 0 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : undefined}
      </Styled.TaskListHeader>
      <LoadingWrapper isLoading={isLoading}>
        <Styled.TaskListMain>
          {currentPosts?.length > 0 ? (
            <>
              <Styled.TaskHeader>
                <div>Done?</div>
                <div>Content</div>
                <div>Urgent?</div>
                <div>Important?</div>
                <div className='deadline'>Deadline</div>
              </Styled.TaskHeader>
              {currentPosts?.map((task) => (
                <TaskItem key={task.taskId} isEdit={isEdit} data={task} />
              ))}
            </>
          ) : (
            <TaskEmpty>Create your first task!</TaskEmpty>
          )}
        </Styled.TaskListMain>
      </LoadingWrapper>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd hide={toggleAdd} />
      </Modal>
    </Styled.TaskList>
  );
};

export default TaskListPage;
