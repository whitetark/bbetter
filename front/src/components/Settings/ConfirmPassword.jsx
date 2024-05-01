import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useConfirmationData } from '../../hooks/use-auth';
import * as Styled from '../../styles/Settings.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  password: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
});

const ConfirmPassword = ({ setIsConfirmed, username }) => {
  const { mutateAsync: checkCredentials, error: confirmationError } = useConfirmationData();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={(values, actions) => {
        const user = {
          username: 'whitetark',
          password: values.password,
        };
        checkCredentials(user).then(() => {
          setIsConfirmed(true);
        });
        actions.resetForm();
        actions.setSubmitting(false);
      }}>
      <Form>
        <TextInput type='password' name='password' placeholder='Current Password' />
        {confirmationError ? confirmationError.response.data : null}
        <Field>
          {(props) => (
            <Styled.ChangePasswordButton
              disabled={!props.form.isValid && !props.form.isTouched}
              type='submit'>
              Confirm Password
            </Styled.ChangePasswordButton>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

export default ConfirmPassword;
