import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useEditGHabit } from '../../hooks/use-ghabits';
import * as Styled from '../../styles/GHabits.styled';
import { ReflectRating } from '../../styles/Reflections.styled';
import { NumberInput, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const GHabitEdit = ({ onClick, data, hide }) => {
  const [priority, setPriority] = useState(data.priorityOf);
  const initialValues = {
    content: data.content,
  };
  const { userData } = useAuthContext();
  const { mutateAsync, error, isError } = useEditGHabit();
  return (
    <Styled.AddGHabit onClick={onClick}>
      <h1>Edit Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const ghabit = {
            GHabitId: data.gHabitId,
            AccountId: userData.accountId,
            Content: values.content,
            priorityOf: priority,
          };
          actions.resetForm();
          mutateAsync(ghabit).then(hide());
        }}>
        <Styled.AddGHabitForm>
          <TextInput name='content' placeholder='Your habit' />
          <ReflectRating>
            <p>Rate priority (1 max 9 min)</p>
            <NumberInput
              value={priority}
              min={1}
              max={9}
              onChange={(event, val) => {
                setPriority(val);
              }}
              readOnly
            />
          </ReflectRating>
          <Field>
            {(props) => (
              <Styled.AddGHabitButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddGHabitButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddGHabitForm>
      </Formik>
    </Styled.AddGHabit>
  );
};

export default GHabitEdit;
