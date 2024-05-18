import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddBHabit } from '../../hooks/use-bhabits';
import * as Styled from '../../styles/BHabits.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
  issueDate: dayjs(),
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
  issueDate: Yup.date(),
});

const BHabitAdd = ({ onClick, hide }) => {
  const { mutateAsync, isError, error } = useAddBHabit();
  const { userData } = useAuthContext();

  return (
    <Styled.AddBHabit onClick={onClick}>
      <h1>Add Bad Habit</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const bhabit = {
            AccountId: userData.accountId,
            Content: values.content,
            IssueDate: values.issueDate.format(),
          };
          actions.resetForm();
          mutateAsync(bhabit).then(hide());
        }}>
        {({ errors, handleSubmit, touched, values, setFieldValue }) => (
          <Styled.AddBHabitForm>
            <TextInput name='content' placeholder='Your new habit' />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <p>When it happened?</p>
              <DatePicker
                onChange={(value) => setFieldValue('issueDate', value, true)}
                value={values.issueDate}
                disableFuture
                renderInput={(params) => (
                  <TextInput
                    error={Boolean(touched.issueDate && errors.issueDate)}
                    helperText={touched.issueDate && errors.issueDate}
                    {...params}
                  />
                )}
              />
              <TimePicker
                onChange={(value) => setFieldValue('issueDate', value, true)}
                value={values.issueDate}
                disableFuture
                renderInput={(params) => (
                  <TextInput
                    error={Boolean(touched.issueDate && errors.issueDate)}
                    helperText={touched.issueDate && errors.issueDate}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            <Field>
              {(props) => (
                <Styled.AddBHabitButton
                  disabled={!props.form.isValid && !props.form.isTouched}
                  type='submit'>
                  Add
                </Styled.AddBHabitButton>
              )}
            </Field>
            {isError ? <div>An error occurred: {error.message}</div> : null}
          </Styled.AddBHabitForm>
        )}
      </Formik>
    </Styled.AddBHabit>
  );
};

export default BHabitAdd;
