import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useEditBHabit } from '../../hooks/use-bhabits';
import * as Styled from '../../styles/BHabits.styled';
import { TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const BHabitEdit = ({ onClick, data, hide }) => {
  const initialValues = {
    content: data.content,
  };
  const { userData } = useAuthContext();
  const { mutateAsync, error, isError } = useEditBHabit();

  return (
    <Styled.AddBHabit onClick={onClick}>
      <h1>Edit Bad Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const bhabit = {
            BHabitId: data.bHabitId,
            AccountId: userData.accountId,
            Content: values.content,
            IssueDate: data.issueDate,
          };
          actions.resetForm();
          mutateAsync(bhabit).then(hide());
        }}>
        <Styled.AddBHabitForm>
          <TextInput name='content' placeholder='Your new habit' />
          <Field>
            {(props) => (
              <Styled.AddBHabitButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddBHabitButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddBHabitForm>
      </Formik>
    </Styled.AddBHabit>
  );
};

export default BHabitEdit;
