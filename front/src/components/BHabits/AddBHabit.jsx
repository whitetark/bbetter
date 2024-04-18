import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/BHabits.styled';
import DatePicker from '../UI/DatePicker';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
  issueDate: new Date(),
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
  issueDate: Yup.date(),
});

const AddBHabit = ({ onClick }) => {
  return (
    <Styled.AddBHabit onClick={onClick}>
      <h1>Add Bad Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const bhabit = {
            AccountId: 1,
            Content: values.content,
            IssueDate: values.issueDate,
          };
          actions.resetForm();
          console.log(bhabit);
        }}>
        <Styled.AddBHabitForm>
          <TextInput name='content' placeholder='Your new habit' />
          <DatePicker name='issueDate' label='When happened?' />
          <Field>
            {(props) => (
              <Styled.AddBHabitButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.AddBHabitButton>
            )}
          </Field>
        </Styled.AddBHabitForm>
      </Formik>
    </Styled.AddBHabit>
  );
};

export default AddBHabit;
