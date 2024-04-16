import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/Wishes.styled';
import Button from '../UI/Button';

const initialValues = {
  content: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const AddWish = ({ onClick }) => {
  return (
    <Styled.AddWish onClick={onClick}>
      <h1>Add Wish</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const wish = {
            AccountId: 1,
            Content: values.content,
            isCompleted: false,
          };
          actions.resetForm();
          console.log(wish);
        }}>
        <Styled.AddWishForm>
          <Field name='content' placeholder='Your Wish' type='text' />
          <ErrorMessage name='content'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
          <Field>
            {(props) => (
              <Button disabled={!props.form.isValid && !props.form.isTouched} type='submit'>
                Add
              </Button>
            )}
          </Field>
        </Styled.AddWishForm>
      </Formik>
    </Styled.AddWish>
  );
};

export default AddWish;
