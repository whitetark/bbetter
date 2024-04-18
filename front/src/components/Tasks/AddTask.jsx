import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import * as Styled from '../../styles/Tasks.styled';
import DatePicker from '../UI/DatePicker';
import { Checkbox, TextInput } from '../UI/Inputs';

const initialValues = {
  content: '',
  isUrgent: false,
  isImportant: false,
  deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  content: Yup.string().min(3, 'Too Short!').max(48, 'Too Long!').required('Required'),
  isUrgent: Yup.boolean(),
  isImportant: Yup.boolean(),
  deadline: Yup.date(),
});

const AddTask = ({ onClick }) => {
  return (
    <Styled.AddTask onClick={onClick}>
      <h1>Add Task</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={DisplayingErrorMessagesSchema}
        onSubmit={async (values, actions) => {
          const wish = {
            AccountId: 1,
            Content: values.content,
            IsUrgent: values.isUrgent,
            IsImportant: values.isImportant,
            Deadline: values.deadline,
            IsCompleted: false,
          };
          actions.resetForm();
          console.log(wish);
        }}>
        <Styled.AddTaskForm>
          <TextInput name='content' placeholder='Your Task' />
          <hr />
          <Checkbox name='isUrgent'>Is Urgent?</Checkbox>
          <Checkbox name='isImportant'>Is Important?</Checkbox>
          <hr />
          <DatePicker name='deadline' label='Deadline' />
          <Field>
            {(props) => (
              <Styled.AddTaskButton
                disabled={!props.form.isValid && !props.form.isTouched}
                type='submit'>
                Add
              </Styled.AddTaskButton>
            )}
          </Field>
        </Styled.AddTaskForm>
      </Formik>
    </Styled.AddTask>
  );
};

export default AddTask;
