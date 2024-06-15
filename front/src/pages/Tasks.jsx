import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import * as variables from '../app/shared/colorVariables';
import PathConstants from '../app/shared/pathConstants';
import TaskDeadlineItem from '../components/Tasks/TaskDeadlineItem';
import LoadingWrapper from '../components/UI/LoadingWrapper';
import { Button, Modal } from '../components/UI/index';
import { TableCell, TaskAdd } from '../components/index';
import useModal from '../hooks/use-modal';
import { useRefetchTasks } from '../hooks/use-task';
import * as Styled from '../styles/Tasks.styled';

const TasksPage = () => {
  document.title = `bbetter - Tasks`;
  const { isShowing: addIsShowing, toggle: toggleAdd } = useModal();
  const navigate = useNavigate();

  const { tasks, closestTasks, stats, isLoading, error } = useRefetchTasks();
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
      <LoadingWrapper isLoading={isLoading}>
        {tasks.length > 0 ? (
          <Styled.TaskMain>
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
            <Styled.TaskStats>
              <Styled.TaskDeadlineListBlock>
                <h1>Closest Deadlines</h1>
                <Styled.TaskDeadlineList>
                  {closestTasks &&
                    closestTasks.map((task, index) => {
                      return <TaskDeadlineItem key={task.taskId} task={task} index={index} />;
                    })}
                </Styled.TaskDeadlineList>
              </Styled.TaskDeadlineListBlock>
              <Styled.TaskStatsBlock>
                <h1>Statistics</h1>
                <Styled.TaskStatsInfo>
                  <Styled.TaskStatsInfoHeaders>This Week</Styled.TaskStatsInfoHeaders>
                  <Styled.TaskStatsProgress>
                    <Styled.TaskStatsProgressHeader>
                      <div>
                        Done: <span>{stats.numOfCompletedThisWeek}</span>
                      </div>
                      <div>
                        Overall:{' '}
                        <span>
                          {stats.numOfNonCompletedThisWeek + stats.numOfCompletedThisWeek}
                        </span>
                      </div>
                    </Styled.TaskStatsProgressHeader>
                    <ProgressBar
                      completed={stats.numOfCompletedThisWeek}
                      maxCompleted={stats.numOfCompletedThisWeek + stats.numOfNonCompletedThisWeek}
                      bgColor={variables.GREEN}
                      baseBgColor={variables.WHITE}
                      isLabelVisible={false}
                      animateOnRender={true}
                    />
                  </Styled.TaskStatsProgress>
                  <div></div>
                  <div className='divider'></div>
                  <Styled.TaskStatsInfoHeaders>Overall</Styled.TaskStatsInfoHeaders>
                  <Styled.TaskStatsOverallData>
                    <div>
                      Overall Done: <span>{stats.numOfCompleted}</span>
                    </div>
                    <div>
                      Completion Rate: <span>{stats.percOfInTimeCompletion}%</span>
                    </div>
                  </Styled.TaskStatsOverallData>
                </Styled.TaskStatsInfo>
              </Styled.TaskStatsBlock>
            </Styled.TaskStats>
          </Styled.TaskMain>
        ) : (
          <Styled.TaskEmpty>Create your first task!</Styled.TaskEmpty>
        )}
      </LoadingWrapper>
      <Modal isShowing={addIsShowing} hide={toggleAdd} className='add-modal' hasOverlay>
        <TaskAdd hide={toggleAdd} />
      </Modal>
    </Styled.TaskContent>
  );
};

export default TasksPage;
