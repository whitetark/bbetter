import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useEditQuote } from '../../hooks/use-quote';
import * as Styled from '../../styles/Quotes.styled';
import { TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(240, 'Too Long!').required('Required'),
  author: Yup.string().min(1, 'Too Short!').max(60, 'Too Long!'),
});

const QuoteEdit = ({ onClick, data, hide }) => {
  const initialValues = {
    content: data.quote,
    author: data.author,
    type: data.typeOf || 'motivational',
  };
  const { mutateAsync, error, isError } = useEditQuote();
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
            TypeOf: values.type,
            Author: values.author == '' ? 'Me' : values.author,
          };
          mutateAsync(quote).then(hide());
          actions.resetForm();
        }}>
        <Styled.AddQuoteForm>
          <TextInput name='content' placeholder='Your Quote' component='textarea' rows='4' />
          <TextInput name='author' placeholder='Author' />
          <Field as='select' name='type'>
            <option value='motivational'>Motivational</option>
            <option value='life'>Life</option>
            <option value='inspirational'>Inspirational</option>
            <option value='funny'>Funny</option>
            <option value='positive'>Positive</option>
            <option value='music'>Music</option>
            <option value='attitude'>Attitude</option>
            <option value='beauty'>Beauty</option>
            <option value='dreams'>Dreams</option>
            <option value='friendship'>Friendship</option>
            <option value='other'>Other</option>
          </Field>
          <Field>
            {(props) => (
              <Styled.AddQuoteButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Edit
              </Styled.AddQuoteButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddQuoteForm>
      </Formik>
    </Styled.AddQuote>
  );
};

export default QuoteEdit;
