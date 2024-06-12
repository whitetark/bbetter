import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useAddReflection } from '../../hooks/use-reflections';
import * as Styled from '../../styles/Reflections.styled';
import { TextInput } from '../UI';
import { NumberInput } from '../UI/Inputs';

const initialValues = {
  threeWords: '',
  userGoal: '',
};

dayjs.extend(utc);

const DisplayingErrorMessagesSchema = Yup.object().shape({
  threeWords: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
  userGoal: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
});

const ReflectionAdd = ({ onClick, hide, date }) => {
  const [productivity, setProductivity] = useState(1);
  const [emotion, setEmotion] = useState(1);

  const dateOf = date || dayjs(new Date());

  const { mutateAsync, error, isError } = useAddReflection();
  const { userData } = useAuthContext();
  return (
    <Styled.ReflectionAdd onClick={onClick}>
      <h1>Add Reflection</h1>
      <Styled.ReflectRating>
        <p>Rate your emotionality</p>
        <NumberInput
          value={emotion}
          min={1}
          max={10}
          onChange={(event, val) => setEmotion(val)}
          readOnly
        />
      </Styled.ReflectRating>
      <Styled.ReflectRating>
        <p>Rate your productivity</p>
        <NumberInput
          value={productivity}
          min={1}
          max={10}
          onChange={(event, val) => setProductivity(val)}
          readOnly
        />
      </Styled.ReflectRating>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const reflection = {
            AccountId: userData.accountId,
            DateOf: dateOf,
            Emotion: emotion,
            Productivity: productivity,
            ThreeWords: values.threeWords || '',
            UserGoal: values.userGoal || '',
          };
          actions.resetForm();
          mutateAsync(reflection).then(hide());
        }}>
        <Styled.AddReflectForm>
          <Styled.ReflectRating>
            <p>Describe past week in 3 words</p>
            <TextInput name='threeWords' placeholder='Three Words' />
          </Styled.ReflectRating>
          <Styled.ReflectRating>
            <p>Set some goals for next week</p>
            <TextInput name='userGoal' placeholder='User Goal' />
          </Styled.ReflectRating>
          <Field>
            {(props) => (
              <Styled.ReflectButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.ReflectButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddReflectForm>
      </Formik>
    </Styled.ReflectionAdd>
  );
};

export default ReflectionAdd;
