import dayjs from 'dayjs';
import { Field, Formik } from 'formik';
import React from 'react';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Settings.styled';

const ChangeHomeQuote = ({ onClick, hide }) => {
  const { userData, useUpdateUser } = useAuthContext();
  const { mutateAsync, error, isError } = useUpdateUser;
  let value = userData?.isUserQuote?.toString();

  const initialValues = {
    isUserQuote: value || 'false',
  };

  return (
    <Styled.ChangeHomeQuote onClick={onClick}>
      <h1>Change Source of Quote</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const stringToCompare = 'true';
          const result = values.isUserQuote === stringToCompare;

          if (userData.isUserQuote == result) {
            return;
          }

          const quoteExpire = dayjs().subtract(1, 'day').format();

          const newAccount = {
            ...userData,
            isUserQuote: result,
            quoteExpires: quoteExpire,
          };
          actions.resetForm();
          mutateAsync(newAccount).then(hide());
        }}>
        <Styled.ChangeQuoteForm>
          <Field as='select' name='isUserQuote'>
            <option value='true'>User</option>
            <option value='false'>Service</option>
          </Field>
          <Field>
            {(props) => (
              <Styled.ChangeQuoteButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Change
              </Styled.ChangeQuoteButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.ChangeQuoteForm>
      </Formik>
    </Styled.ChangeHomeQuote>
  );
};

export default ChangeHomeQuote;
