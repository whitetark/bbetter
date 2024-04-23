import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/GHabits.styled';
import { TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const GHabitEdit = ({ onClick }) => {
  const initialValues = {
    content: '',
  };
  return (
    <Styled.AddGHabit onClick={onClick}>
      <h1>Edit Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const ghabit = {
            GHabitId: 1,
            AccountId: 1,
            Content: values.content,
            isCompleted: false,
          };
          actions.resetForm();
          console.log(ghabit);
        }}>
        <Styled.AddGHabitForm>
          <TextInput name='content' placeholder='Your habit' />
          <Field>
            {(props) => (
              <Styled.AddGHabitButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddGHabitButton>
            )}
          </Field>
        </Styled.AddGHabitForm>
      </Formik>
    </Styled.AddGHabit>
  );
};

export default GHabitEdit;
