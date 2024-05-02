import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useQuoteContext } from '../../app/store/quote-context';
import * as Styled from '../../styles/Quotes.styled';
import { TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(240, 'Too Long!').required('Required'),
  author: Yup.string().min(3, 'Too Short!').max(60, 'Too Long!'),
});

const QuoteEdit = ({ onClick, data, hide }) => {
  const initialValues = {
    content: data.quote,
    author: data.author,
  };
  const { editQuote } = useQuoteContext();
  return (
    <Styled.AddQuote onClick={onClick}>
      <h1>Edit Quote</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const quote = {
            UserQuoteId: data.userQuoteId,
            AccountId: data.accountId,
            Quote: values.content,
            Author: values.author == '' ? 'Me' : values.author,
          };
          editQuote.mutateAsync(quote).then(hide());
          actions.resetForm();
        }}>
        <Styled.AddQuoteForm>
          <TextInput name='content' placeholder='Your Quote' component='textarea' rows='4' />
          <TextInput name='author' placeholder='Author' />
          <Field>
            {(props) => (
              <Styled.AddQuoteButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddQuoteButton>
            )}
          </Field>
          {editQuote.isError ? <div>An error occurred: {editQuote.error.message}</div> : null}
        </Styled.AddQuoteForm>
      </Formik>
    </Styled.AddQuote>
  );
};

export default QuoteEdit;
