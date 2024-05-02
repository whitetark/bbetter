import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useWishContext } from '../../app/store/wish-context';
import * as Styled from '../../styles/Wishes.styled';
import { Checkbox, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
  isCompleted: Yup.boolean(),
});

const WishEdit = ({ onClick, hide, data }) => {
  const initialValues = {
    content: data.content,
    isCompleted: data.isCompleted,
  };

  const { editWish } = useWishContext();
  const { userData } = useAuthContext();
  return (
    <Styled.AddWish onClick={onClick}>
      <h1>Edit Wish</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const wish = {
            WishId: data.wishId,
            AccountId: userData.accountId,
            Content: values.content,
            isCompleted: values.isCompleted,
          };
          actions.resetForm();
          console.log(wish);
          editWish.mutateAsync(wish).then(hide());
        }}>
        <Styled.AddWishForm>
          <TextInput name='content' placeholder='Your wish' component='textarea' rows='4' />
          <hr />
          <Checkbox name='isCompleted'>Is Completed?</Checkbox>
          <Field>
            {(props) => (
              <Styled.AddWishButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddWishButton>
            )}
          </Field>
          {editWish.isError ? <div>An error occurred: {editWish.error.message}</div> : null}
        </Styled.AddWishForm>
      </Formik>
    </Styled.AddWish>
  );
};

export default WishEdit;
