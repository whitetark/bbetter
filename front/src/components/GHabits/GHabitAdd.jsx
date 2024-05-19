import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddGHabit } from '../../hooks/use-ghabits';
import * as Styled from '../../styles/GHabits.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const GHabitAdd = ({ onClick, hide }) => {
  const { mutateAsync, isError, error } = useAddGHabit();
  const { userData } = useAuthContext();
  return (
    <Styled.AddGHabit onClick={onClick}>
      <h1>Add New Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const ghabit = {
            GHabitId: 0,
            AccountId: userData.accountId,
            Content: values.content,
          };
          actions.resetForm();
          mutateAsync(ghabit).then(hide());
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
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddGHabitForm>
      </Formik>
    </Styled.AddGHabit>
  );
};

export default GHabitAdd;
