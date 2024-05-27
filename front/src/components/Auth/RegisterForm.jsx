import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PathConstants from '../../app/shared/pathConstants';
import { useRegister } from '../../hooks/use-auth';
import * as Styled from '../../styles/Login.styled';
import Button from '../UI/Button';

const initialValues = {
  login: '',
  password: '',
  repeatPassword: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  login: Yup.string().min(3, 'Too Short!').max(12, 'Too Long!').required('Required'),
  password: Yup.string()
    .min(3, 'Too Short!')
    .max(36, 'Must be 12 characters or less')
    .required('Required'),
  repeatPassword: Yup.string()
    .min(3, 'Too Short!')
    .max(36, 'Must be 12 characters or less')
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const textErrors = (meta) => ({
  error: meta.touched && Boolean(meta.error),
  helperText: meta.touched && meta.error ? meta.error : ' ',
});

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const { mutateAsync: register, error: registerError } = useRegister();
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

          await register(user).then(() => {
            navigate(PathConstants.BASE);
          });
          actions.resetForm();
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
          <Field name='password'>
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
          <Field name='repeatPassword'>
            {(props) => (
              <Styled.Field
                placeholder='Repeat Password'
                label='Repeat Password'
                type='password'
                fullWidth
                {...props.field}
                {...textErrors(props.meta)}
              />
            )}
          </Field>
          <Field>
            {(props) => (
              <Button disabled={!props.form.isValid && !props.form.isTouched} type='submit'>
                Sign up
              </Button>
            )}
          </Field>
          {registerError ? (
            registerError.response.data.length < 40 ? (
              <div>{registerError.response.data}</div>
            ) : (
              <div>Server error!</div>
            )
          ) : null}
        </Form>
      </Formik>
    </Styled.LoginForm>
  );
};

export default RegisterForm;
