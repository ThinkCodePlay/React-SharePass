import { useState } from "react";

const useInput = (validateValueFunction: any, initValue: string) => {
  const [enterdValue, setEnterdValue] = useState(initValue);
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValueFunction(enterdValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: any) => {
    setEnterdValue(event.currentTarget.value);
    setIsTouched(true);
    console.log(enterdValue);
  };
  const inputBlurHandler = (event: any) => {
    setIsTouched(false);
  };

  return {
    value: enterdValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
