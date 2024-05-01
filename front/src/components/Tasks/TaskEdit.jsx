import { Field, Formik } from 'formik';
import React from 'react';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { TaskService } from '../../app/services/api';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Tasks.styled';
import DatePicker from '../UI/DatePicker';
import { Checkbox, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(48, 'Too Long!').required('Required'),
  isUrgent: Yup.boolean(),
  isImportant: Yup.boolean(),
  deadline: Yup.date().required('Required'),
});

const TaskEdit = ({ onClick, data }) => {
  const { userData } = useAuthContext();

  const initialValues = {
    content: data.content,
    isUrgent: data.isUrgent,
    isImportant: data.isImportant,
    deadline: new Date(data.deadline),
  };

  const mutation = useMutation('editTask', (payload) => TaskService.update(payload), {
    onSuccess: () => {},
    onError: (error) => {
      console.log('Task update error:' + error);
    },
  });

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
          mutation.mutateAsync(task);
        }}>
        <Styled.AddTaskForm>
          <TextInput name='content' placeholder='Your Task' />
          <hr />
          <Checkbox name='isUrgent'>Is Urgent?</Checkbox>
          <Checkbox name='isImportant'>Is Important?</Checkbox>
          <hr />
          <DatePicker name='deadline' label='Deadline' />
          <Field>
            {(props) => (
              <Styled.AddTaskButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddTaskButton>
            )}
          </Field>
          {mutation.isError ? <div>An error occurred: {mutation.error.message}</div> : null}
        </Styled.AddTaskForm>
      </Formik>
    </Styled.EditTask>
  );
};

export default TaskEdit;
