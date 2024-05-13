import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import { useEditReflection } from '../../hooks/use-reflections';
import * as Styled from '../../styles/Reflections.styled';
import { NumberInput, TextInput } from '../UI/Inputs';

const DisplayingErrorMessagesSchema = Yup.object().shape({
  threeWords: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
  userGoal: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
});

const ReflectionEdit = ({ onClick, hide, data }) => {
  const initialValues = {
    threeWords: data.threeWords,
    userGoal: data.userGoal,
  };
  const [productivity, setProductivity] = useState(data.productivity);
  const [emotion, setEmotion] = useState(data.emotion);

  const { mutateAsync, error, isError } = useEditReflection();
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
            ReflectionId: data.reflectionId,
            AccountId: userData.accountId,
            DateOf: data.dateOf,
            Emotion: emotion,
            Productivity: productivity,
            ThreeWords: values.threeWords || data.threeWords,
            UserGoal: values.userGoal || data.userGoal,
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
                Edit
              </Styled.ReflectButton>
            )}
          </Field>
          {isError ? <div>An error occurred: {error.message}</div> : null}
        </Styled.AddReflectForm>
      </Formik>
    </Styled.ReflectionAdd>
  );
};

export default ReflectionEdit;
