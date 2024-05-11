import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { ErrorMessage, Field } from 'formik';
import { forwardRef } from 'react';
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

export const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
  const incrementDisable = props.max == props.value;
  const decrementDisable = props.min == props.value;
  return (
    <BaseNumberInput
      slotProps={{
        root: {
          className: 'baseNumberInput-root',
        },
        input: {
          className: 'baseNumberInput-input',
        },
        incrementButton: {
          children: '+',
          className: 'baseNumberInput-button increment',
          disabled: incrementDisable,
        },
        decrementButton: {
          children: '-',
          className: 'baseNumberInput-button',
          disabled: decrementDisable,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});
