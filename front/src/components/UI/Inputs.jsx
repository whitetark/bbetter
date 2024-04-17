import { ErrorMessage, Field } from 'formik';
import TextError from '../../app/shared/TextError';

export const TextInput = ({ label, name, ...props }) => {
  return (
    <>
      {label ? <label htmlFor={name}>label</label> : undefined}
      <Field type='text' name={name} {...props} />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export const Checkbox = ({ children, name, ...props }) => {
  return (
    <label className='checkbox'>
      {children}
      <Field type='checkbox' name={name} {...props} />
    </label>
  );
};
