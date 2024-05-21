import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddWish } from '../../hooks/use-wish';
import { ReflectRating } from '../../styles/Reflections.styled';
import * as Styled from '../../styles/Wishes.styled';
import { NumberInput, TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!').required('Required'),
});

const WishAdd = ({ onClick, hide }) => {
  const [priority, setPriority] = useState(1);

  const { mutateAsync, isError, error } = useAddWish();
  const { userData } = useAuthContext();

  return (
    <Styled.AddWish onClick={onClick}>
      <h1>Add Wish</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const wish = {
            WishId: 0,
            AccountId: userData.accountId,
            Content: values.content,
            isCompleted: false,
            priorityOf: priority,
            completeDate: dayjs().format(),
          };
          actions.resetForm();
          mutateAsync(wish).then(hide());
        }}>
        <Styled.AddWishForm>
          <TextInput name='content' placeholder='Your wish' component='textarea' rows='4' />
          <ReflectRating>
            <p>Rate priority (1 max 9 min)</p>
            <NumberInput
              value={priority}
              min={1}
              max={9}
              onChange={(event, val) => setPriority(val)}
              readOnly
            />
          </ReflectRating>
          <Field>
            {(props) => (
              <Styled.AddWishButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.AddWishButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddWishForm>
      </Formik>
    </Styled.AddWish>
  );
};

export default WishAdd;
