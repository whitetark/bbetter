import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PathConstants from '../app/shared/pathConstants';
import { Button, Modal } from '../components/UI/index';
import { TableCell, TaskAdd } from '../components/index';
import useModal from '../hooks/use-modal';
import { useRefetchTasks } from '../hooks/use-task';
import * as Styled from '../styles/Tasks.styled';

const TasksPage = () => {
  document.title = `bbetter - Tasks`;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const navigate = useNavigate();

  const { tasks, isLoading, error } = useRefetchTasks();
  const handleClick = () => {
    navigate(PathConstants.TASK_LIST);
  };

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);

  const urgentImportantTasks = incompleteTasks.filter((task) => task.isUrgent && task.isImportant);
  const importantNotUrgentTasks = incompleteTasks.filter(
    (task) => !task.isUrgent && task.isImportant,
  );
  const urgentNotImportantTasks = incompleteTasks.filter(
    (task) => task.isUrgent && !task.isImportant,
  );
  const notUrgentNotImportantTasks = incompleteTasks.filter(
    (task) => !task.isUrgent && !task.isImportant,
  );

  return (
    <Styled.TaskContent>
      <Styled.TaskHeader>
        <h1>Task List</h1>
        <Styled.TaskActions>
          <Button onClick={handleClick}>
            <FontAwesomeIcon icon='fa-solid fa-list' fixedWidth />
          </Button>
          <Button onClick={toggleAdd}>
            <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
          </Button>
        </Styled.TaskActions>
      </Styled.TaskHeader>
      {tasks.length > 0 ? (
        <Styled.TaskTable>
          <div></div>
          <Styled.TableText>Urgent</Styled.TableText>
          <Styled.TableText>Non urgent</Styled.TableText>
          <Styled.TableText className='text vertical-text'>Important</Styled.TableText>
          <TableCell array={urgentImportantTasks} type={'Do'} />
          <TableCell array={importantNotUrgentTasks} type={'Decide'} />
          <Styled.TableText className='text vertical-text'>Not important</Styled.TableText>
          <TableCell array={urgentNotImportantTasks} type={'Delegate'} />
          <TableCell array={notUrgentNotImportantTasks} type={'Delete'} />
        </Styled.TaskTable>
      ) : (
        <Styled.TaskEmpty>Create your first task!</Styled.TaskEmpty>
      )}
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd hide={toggleAdd} />
      </Modal>
    </Styled.TaskContent>
  );
};

export default TasksPage;
