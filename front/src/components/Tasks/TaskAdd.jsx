import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddTask } from '../../hooks/use-task';
import * as Styled from '../../styles/Tasks.styled';
import { Checkbox, TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
  isUrgent: false,
  isImportant: false,
  deadline: dayjs(new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)),
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(48, 'Too Long!').required('Required'),
  isUrgent: Yup.boolean(),
  isImportant: Yup.boolean(),
  deadline: Yup.date(),
});

const TaskAdd = ({ onClick, hide }) => {
  const { userData } = useAuthContext();

  const { mutateAsync, isError, error } = useAddTask();
  return (
    <Styled.AddTask onClick={onClick}>
      <h1>Add Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const task = {
            TaskId: 0,
            AccountId: userData.accountId,
            Content: values.content,
            IsUrgent: values.isUrgent,
            IsImportant: values.isImportant,
            Deadline: values.deadline.format(),
            IsCompleted: false,
          };
          actions.resetForm();
          mutateAsync(task).then(hide());
        }}>
        {({ errors, handleSubmit, touched, values, setFieldValue }) => (
          <Styled.AddTaskForm>
            <TextInput name='content' placeholder='Your Task' />
            <hr />
            <Checkbox name='isUrgent'>Is Urgent?</Checkbox>
            <Checkbox name='isImportant'>Is Important?</Checkbox>
            <hr />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <p>Deadline</p>
              <DatePicker
                onChange={(value) => setFieldValue('deadline', value, true)}
                value={values.deadline}
                disablePast
                renderInput={(params) => (
                  <TextInput
                    error={Boolean(touched.deadline && errors.deadline)}
                    helperText={touched.deadline && errors.deadline}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <Field>
              {(props) => (
                <Styled.AddTaskButton
                  disabled={!props.form.isValid && !props.form.isTouched}
                  type='submit'>
                  Add
                </Styled.AddTaskButton>
              )}
            </Field>
            {isError ? <div>An error occurred: {error.message}</div> : null}
          </Styled.AddTaskForm>
        )}
      </Formik>
    </Styled.AddTask>
  );
};

export default TaskAdd;
