import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useEditWish } from '../../hooks/use-wish';
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

  const { mutateAsync, isError, error } = useEditWish();
  const { userData } = useAuthContext();
  return (
    <Styled.AddWish onClick={onClick}>
      <h1>Edit Wish</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          let completeDate = dayjs(new Date()).format();
          if (values.isCompleted == data.isCompleted) {
            completeDate = data.completeDate;
          }

          const wish = {
            WishId: data.wishId,
            AccountId: userData.accountId,
            Content: values.content,
            isCompleted: values.isCompleted,
            CompleteDate: completeDate,
          };
          actions.resetForm();
          mutateAsync(wish).then(hide());
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
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddWishForm>
      </Formik>
    </Styled.AddWish>
  );
};

export default WishEdit;
