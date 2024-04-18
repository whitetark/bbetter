import { ErrorMessage, Field } from 'formik';
import TextError from './TextError';

export const TextInput = ({ label, name, ...props }) => {
  return (
    <div>
      {label ? <label htmlFor={name}>label</label> : undefined}
      <Field type='text' name={name} {...props} />
      <ErrorMessage name={name} component={TextError} />
    </div>
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
