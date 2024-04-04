import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useLogin } from '../../hooks/use-auth';
import * as Styled from '../../styles/Login.styled';
import Button from '../UI/Button';

const initialValues = {
  login: '',
  password: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  login: Yup.string().min(3, 'Too Short!').max(12, 'Too Long!').required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(12, 'Must be 12 characters or less')
    .required('Required'),
});

const textErrors = (meta) => ({
  error: meta.touched && Boolean(meta.error),
  helperText: meta.touched && meta.error ? meta.error : ' ',
});

const LoginForm = (props) => {
  const { mutateAsync: login, error: loginError } = useLogin();
  return (
    <Styled.LoginForm>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const user = {
            username: values.login,
            password: values.password,
          };

          await login(user).then(() => {
            props.onHide();
            actions.resetForm();
          });
          actions.setSubmitting(false);
        }}>
        <Form>
          <Field name='login'>
            {(props) => (
              <Styled.Field
                placeholder='Username'
                label='Username'
                fullWidth
                {...props.field}
                {...textErrors(props.meta)}
              />
            )}
          </Field>
          <Field type='password' name='password'>
            {(props) => (
              <Styled.Field
                placeholder='Password'
                label='Password'
                type='password'
                fullWidth
                {...props.field}
                {...textErrors(props.meta)}
              />
            )}
          </Field>
          <Field>
            {(props) => (
              <Button disabled={!props.form.isValid} onClick={props.form.submitForm} type='submit'>
                Submit
              </Button>
            )}
          </Field>
        </Form>
      </Formik>
    </Styled.LoginForm>
  );
};

export default LoginForm;
