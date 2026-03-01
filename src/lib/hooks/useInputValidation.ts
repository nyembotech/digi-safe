import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

type ValidationRule<T> = (value: T) => string | null;

interface UseInputValidationOptions<T> {
  initialValue: T;
  rules?: ValidationRule<T>[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export function useInputValidation<T>({
  initialValue,
  rules = [],
  validateOnChange = true,
  validateOnBlur = true
}: UseInputValidationOptions<T>) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const debouncedValue = useDebounce(value);

  const validate = useCallback((valueToValidate: T): string | null => {
    for (const rule of rules) {
      const error = rule(valueToValidate);
      if (error) return error;
    }
    return null;
  }, [rules]);

  // Run validation when debounced value changes
  useEffect(() => {
    if (validateOnChange && touched) {
      setIsValidating(true);
      const error = validate(debouncedValue);
      setError(error);
      setIsValidating(false);
    }
  }, [debouncedValue, validate, validateOnChange, touched]);

  const handleChange = useCallback((newValue: T) => {
    setValue(newValue);
    if (!touched) setTouched(true);
  }, [touched]);

  const handleBlur = useCallback(() => {
    if (validateOnBlur) {
      setIsValidating(true);
      const error = validate(value);
      setError(error);
      setIsValidating(false);
    }
    if (!touched) setTouched(true);
  }, [value, validate, validateOnBlur, touched]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setTouched(false);
    setIsValidating(false);
  }, [initialValue]);

  return {
    value,
    error,
    touched,
    isValidating,
    handleChange,
    handleBlur,
    reset
  };
}