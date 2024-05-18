import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useEditTask } from '../../hooks/use-task';
import * as Styled from '../../styles/Tasks.styled';
import { Checkbox, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(48, 'Too Long!').required('Required'),
  isUrgent: Yup.boolean(),
  isImportant: Yup.boolean(),
  deadline: Yup.date().required('Required'),
});

const TaskEdit = ({ onClick, data, hide }) => {
  const { userData } = useAuthContext();
  const { mutateAsync, isError, error } = useEditTask();

  const initialValues = {
    content: data.content,
    isUrgent: data.isUrgent,
    isImportant: data.isImportant,
    deadline: dayjs(data.deadline),
  };

  return (
    <Styled.EditTask onClick={onClick}>
      <h1>Edit Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const task = {
            TaskId: data.taskId,
            AccountId: userData.accountId,
            Content: values.content,
            IsUrgent: values.isUrgent,
            IsImportant: values.isImportant,
            Deadline: values.deadline,
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
                  Edit
                </Styled.AddTaskButton>
              )}
            </Field>
            {isError ? <div>An error occurred: {error.message}</div> : null}
          </Styled.AddTaskForm>
        )}
      </Formik>
    </Styled.EditTask>
  );
};

export default TaskEdit;
