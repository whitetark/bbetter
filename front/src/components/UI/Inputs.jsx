import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { ErrorMessage, Field } from 'formik';
import { forwardRef } from 'react';
import * as Styled from '../../styles/Reflections.styled';
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
  return (
    <BaseNumberInput
      slots={{
        root: Styled.InputRoot,
        input: Styled.Input,
        incrementButton: Styled.Button,
        decrementButton: Styled.Button,
      }}
      slotProps={{
        incrementButton: {
          children: '+',
          className: 'increment',
        },
        decrementButton: {
          children: '-',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});
