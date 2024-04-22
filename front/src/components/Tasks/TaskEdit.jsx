import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/Tasks.styled';
import DatePicker from '../UI/DatePicker';
import { Checkbox, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(48, 'Too Long!').required('Required'),
  isUrgent: Yup.boolean(),
  isImportant: Yup.boolean(),
  deadline: Yup.date().required('Required'),
});

const TaskEdit = ({ onClick }) => {
  const initialValues = {
    content: '',
    isUrgent: false,
    isImportant: false,
    deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  };

  return (
    <Styled.EditTask onClick={onClick}>
      <h1>Edit Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const task = {
            TaskId: 1,
            AccountId: 1,
            Content: values.content,
            IsUrgent: values.isUrgent,
            IsImportant: values.isImportant,
            Deadline: values.deadline,
            IsCompleted: false,
          };
          actions.resetForm();
          console.log(task);
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
        </Styled.AddTaskForm>
      </Formik>
    </Styled.EditTask>
  );
};

export default TaskEdit;
