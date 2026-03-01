import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

interface UseFormStateOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => Promise<void>;
}

export function useFormState<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormStateOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false
  });

  const debouncedValues = useDebounce(state.values);

  // Run validation when values change
  useEffect(() => {
    if (validate) {
      const errors = validate(debouncedValues);
      setState(prev => ({ ...prev, errors }));
    }
  }, [debouncedValues, validate]);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: isTouched }
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      if (validate) {
        const errors = validate(state.values);
        if (Object.keys(errors).length > 0) {
          setState(prev => ({ ...prev, errors, isSubmitting: false }));
          return;
        }
      }

      if (onSubmit) {
        await onSubmit(state.values);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [state.values, validate, onSubmit]);

  const reset = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    reset
  };
}