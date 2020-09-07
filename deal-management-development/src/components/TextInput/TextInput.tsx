import { OutlinedTextFieldProps, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useField, UseFieldConfig } from "react-final-form";

interface TextInputProps
  extends UseFieldConfig<string>,
    Pick<OutlinedTextFieldProps, "label">,
    Partial<
      Pick<
        OutlinedTextFieldProps,
        | "fullWidth"
        | "autoFocus"
        | "placeholder"
        | "multiline"
        | "rows"
        | "required"
        | "autoComplete"
        | "disabled"
      >
    > {
  name: string;
  trim?: boolean;
  formatOnBlur?: boolean;
  format?: any;
}
export const trimProps: Partial<UseFieldConfig<string>> = {
  format(value = "") {
    return value.trim();
  },
  formatOnBlur: true,
  allowNull: true,
};
export function TextInput(props: TextInputProps) {
  const {
    name,
    label,
    fullWidth,
    disabled,
    autoFocus,
    placeholder,
    multiline,
    rows,
    required,
    autoComplete = "off",
    trim = true,
    formatOnBlur,
    format,
    ...config
  } = props;
  const {
    input: { value, ...input },
    meta,
  } = useField<string>(name, {
    validateFields: [],
    ...(trim && trimProps),
    ...config,
    formatOnBlur,
    format: format,
  });
  const fieldProps = {
    label,
    fullWidth,
    autoFocus,
    placeholder,
    multiline,
    rows,
    required,
    autoComplete,
    disabled,
  };
  const error = (meta.touched && meta.error) || meta.submitError;
  return (
    <TextField
      size="small"
      {...fieldProps}
      {...input}
      value={value || ""}
      variant="outlined"
      error={!!error}
      helperText={error}
    />
  );
}

export function TextInputUpper(props: TextInputProps) {
  const {
    name,
    label,
    fullWidth,
    disabled,
    autoFocus,
    placeholder,
    multiline,
    rows,
    required,
    autoComplete = "off",
    trim = true,
    ...config
  } = props;
  const {
    input: { value, ...input },
    meta,
  } = useField<string>(name, {
    validateFields: [],
    ...(trim && trimProps),
    ...config,
  });
  const fieldProps = {
    label,
    fullWidth,
    autoFocus,
    placeholder,
    multiline,
    rows,
    required,
    autoComplete,
    disabled,
  };
  const error = (meta.touched && meta.error) || meta.submitError;
  return (
    <TextField
      size="small"
      {...fieldProps}
      {...input}
      value={value.toUpperCase() || ""}
      variant="outlined"
      error={!!error}
      helperText={error}
    />
  );
}
