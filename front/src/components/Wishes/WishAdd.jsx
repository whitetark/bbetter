import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import * as Styled from '../../styles/Wishes.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const WishAdd = ({ onClick }) => {
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
          <TextInput name='content' placeholder='Your wish' />
          <Field>
            {(props) => (
              <Styled.AddWishButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.AddWishButton>
            )}
          </Field>
        </Styled.AddWishForm>
      </Formik>
    </Styled.AddWish>
  );
};

export default WishAdd;
