import { useState } from "react";

const useInput = (validateValueFunction: any) => {
  const [enterdValue, setEnterdValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValueFunction(enterdValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: any) => {
    setEnterdValue(event.currentTarget.value);
    setIsTouched(true);
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