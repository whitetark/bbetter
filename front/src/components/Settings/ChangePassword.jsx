import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useChangePassword } from '../../hooks/use-auth';
import * as Styled from '../../styles/Settings.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  newPassword: '',
  newRepeatPassword: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
  newRepeatPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Must be 12 characters or less')
    .required('Required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const ChangePassword = ({ setIsSuccess }) => {
  const { mutateAsync: changePassword, error: changingPasswordError } = useChangePassword();
  const { userData } = useAuthContext();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, actions) => {
        const user = {
          username: userData.username,
          password: values.newPassword,
        };

        await changePassword(user).then(() => {
          setIsSuccess(true);
        });
        actions.resetForm();
        actions.setSubmitting(false);
      }}>
      <Styled.ChangePasswordForm>
        <TextInput type='password' name='newPassword' placeholder='New Password' />
        <TextInput type='password' name='newRepeatPassword' placeholder='Repeat New Password' />
        {changingPasswordError ? changingPasswordError.response.data : null}
        <Field>
          {(props) => (
            <Styled.ChangePasswordButton
              disabled={!props.form.isValid && !props.form.isTouched}
              type='submit'>
              Change Password
            </Styled.ChangePasswordButton>
          )}
        </Field>
      </Styled.ChangePasswordForm>
    </Formik>
  );
};

export default ChangePassword;
