import { Field, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAddQuote } from '../../hooks/use-quote';
import * as Styled from '../../styles/Quotes.styled';
import { TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
  author: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(240, 'Too Long!').required('Required'),
  author: Yup.string().min(1, 'Too Short!').max(60, 'Too Long!'),
});

const QuoteAdd = ({ onClick, hide }) => {
  const { mutateAsync, error, isError } = useAddQuote();

  return (
    <Styled.AddQuote onClick={onClick}>
      <h1>Add Quote</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const quote = {
            AccountId: 1,
            Quote: values.content,
            Author: values.author == '' ? 'Me' : values.author,
          };
          mutateAsync(quote).then(hide());
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
                Add
              </Styled.AddQuoteButton>
            )}
          </Field>
          {isError ? <div className='serverError'>An error occurred: {error.message}</div> : null}
        </Styled.AddQuoteForm>
      </Formik>
    </Styled.AddQuote>
  );
};

export default QuoteAdd;
