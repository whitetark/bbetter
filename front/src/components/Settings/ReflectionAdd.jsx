import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useAuthContext } from '../../app/store/auth-context';
import * as Styled from '../../styles/Reflections.styled';
import { Button, TextInput } from '../UI';
import { NumberInput } from '../UI/Inputs';

const initialValues = {
  threeWords: '',
  userGoal: '',
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  threeWords: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
  userGoal: Yup.string().min(3, 'Too Short!').max(100, 'Too Long!'),
});

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ReflectionAdd = ({ onClick }) => {
  const [hover, setHover] = useState(-1);
  const [productivity, setProductivity] = useState(1);
  const [emotion, setEmotion] = useState(1);
  const { userData } = useAuthContext();
  return (
    <Styled.ReflectionAdd onClick={onClick}>
      <h1>Add Reflection</h1>
      <NumberInput min={1} max={10} />
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const reflection = {
            AccountId: userData.accountId,
            DateOf: new Date(),
            Emotion: values.emotion,
            Productivity: values.productivity,
            ThreeWords: values.threeWords,
            UserGoal: values.userGoal,
          };
          console.log(reflection);
        }}>
        <Styled.AddReflectForm>
          <TextInput name='threeWords' placeholder='Three Words' />
          <TextInput name='userGoal' placeholder='User Goal' />
          <Field>
            {(props) => (
              <Button disabled={!props.form.isValid && !props.form.isTouched} type='submit'>
                Add
              </Button>
            )}
          </Field>
        </Styled.AddReflectForm>
      </Formik>
    </Styled.ReflectionAdd>
  );
};

export default ReflectionAdd;
