import { useState } from 'react';

const useEdit = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggle = () => {
    setIsEditMode(!isEditMode);
  };
  return {
    isEditMode,
    toggle,
  };
};

export default useEdit;
