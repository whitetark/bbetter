import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/GHabits.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const AddGHabit = ({ onClick }) => {
  return (
    <Styled.AddGHabit onClick={onClick}>
      <h1>Add New Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const ghabit = {
            AccountId: 1,
            Content: values.content,
            isCompleted: false,
          };
          actions.resetForm();
          console.log(ghabit);
        }}>
        <Styled.AddGHabitForm>
          <TextInput name='content' placeholder='Your new habit' />
          <Field>
            {(props) => (
              <Styled.AddGHabitButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.AddGHabitButton>
            )}
          </Field>
        </Styled.AddGHabitForm>
      </Formik>
    </Styled.AddGHabit>
  );
};

export default AddGHabit;
