import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { useTaskContext } from '../app/store/task-context';
import { Button, Modal } from '../components/UI/index';
import { TaskAdd, TaskItem } from '../components/index';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/TaskList.styled';

const TaskListPage = () => {
  document.title = `bbetter - All Tasks`;

  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { tasks, setTasks } = useTaskContext();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(PathConstants.TASK);
  };

  const sortedTasks = tasks.sort((taskA, taskB) => {
    if (taskA.isImportant === taskB.isImportant) {
      return taskA.isUrgent ? -1 : 1;
    }

    return taskA.isImportant ? -1 : 1;
  });

  return (
    <Styled.TaskList>
      <Styled.TaskListHeader>
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
      </Styled.TaskListHeader>
      <Styled.TaskListMain>
        <Styled.TaskHeader>
          <div>Content</div>
          <div>Urgent?</div>
          <div>Important?</div>
          <div className='deadline'>Deadline</div>
        </Styled.TaskHeader>
        {sortedTasks.length > 0 &&
          sortedTasks.map((task, index) => <TaskItem key={index} isEdit={isEdit} data={task} />)}
      </Styled.TaskListMain>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd hide={toggleAdd} />
      </Modal>
    </Styled.TaskList>
  );
};

export default TaskListPage;
