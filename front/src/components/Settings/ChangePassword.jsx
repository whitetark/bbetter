import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useChangePassword } from '../../hooks/use-auth';
import Button from '../UI/Button';

const ChangePassword = ({ setIsSuccess, username }) => {
  const { mutateAsync: changePassword, error: changingPasswordError } = useChangePassword();

  return (
    <Formik
      initialValues={{ newPassword: '', newRepeatPassword: '' }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string()
          .min(3, 'Too Short!')
          .max(12, 'Must be 12 characters or less')
          .required('Required'),
        newRepeatPassword: Yup.string()
          .min(3, 'Too Short!')
          .max(12, 'Must be 12 characters or less')
          .required('Required')
          .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
      })}
      onSubmit={async (values, actions) => {
        const user = {
          username: 'whitetark',
          password: values.newPassword,
        };

        await changePassword(user).then(() => {
          setIsSuccess(true);
        });
        actions.resetForm();
        actions.setSubmitting(false);
      }}>
      {({ errors, touched, isValid, isSubmitting }) => (
        <Form>
          <Field
            type='password'
            name='newPassword'
            placeholder='New Password'
            className={errors.newPassword && touched.newPassword ? 'error' : undefined}
          />
          <ErrorMessage name='newPassword' />
          <Field
            type='password'
            name='newRepeatPassword'
            placeholder='Repeat New Password'
            className={errors.newRepeatPassword && touched.newRepeatPassword ? 'error' : undefined}
          />
          <ErrorMessage name='newRepeatPassword' />
          {changingPasswordError ? changingPasswordError.response.data : null}
          {isSubmitting ? (
            <div>Loading</div>
          ) : (
            <Button type='submit' disabled={!isValid}>
              Change Password
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
