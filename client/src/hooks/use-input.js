import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = isTouched && validateValue(enteredValue);
  const valueInputHasError = isTouched && !enteredValueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const valueInputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const clearValueInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError: valueInputHasError,
    valueChangeHandler: valueChangeHandler,
    valueInputBlurHandler: valueInputBlurHandler,
    clearValueInput: clearValueInput,
  };
};

export default useInput;
