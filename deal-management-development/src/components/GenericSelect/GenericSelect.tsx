import { SelectProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete, { AutocompleteProps } from "@material-ui/lab/Autocomplete";
import React, { useMemo, isValidElement } from "react";
import { useField, UseFieldConfig } from "react-final-form";
import { QueryResult } from "react-query";
import { UseAutocompleteSingleProps } from "@material-ui/lab/useAutocomplete";

export interface Option extends Record<string, any> {
  disabled?: boolean;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

type AutoCompleteProps2<T> = AutocompleteProps<T> &
  UseAutocompleteSingleProps<T>;
interface GenericSelectProps<T extends Option>
  extends UseFieldConfig<string>,
    Partial<Pick<AutoCompleteProps2<T>, "loadingText" | "noOptionsText">>,
    Partial<
      Pick<SelectProps, "label" | "fullWidth" | "autoFocus" | "placeholder">
    > {
  /**
   * name for final form field
   */
  name: string;
  labelParam: string & keyof T;
  valueParam: string & keyof T;
  renderOption: AutocompleteProps<T>["renderOption"];
  data: any;
  status: any;
  error: any;
}

export default function GenericSelect<T extends Option>(
  props: GenericSelectProps<T>
) {
  const {
    labelParam,
    valueParam,
    name,
    label,
    fullWidth,
    autoFocus,
    placeholder,
    data,
    renderOption,
    noOptionsText,
    loadingText,
    error,
    status,
    ...config
  } = props;
  const fieldProps = { label, fullWidth, autoFocus, placeholder };
  const classes = useStyles();

  const {
    input: { multiple, value: v, onChange, ...input },
    meta,
  } = useField(name, {
    initialValue: "",
    validate: isValidElement,
    validateFields: [],
    ...config,
  });
  const value = useMemo(() => {
    if (!Array.isArray(data)) return null;
    if (!v) return null;
    return data.find((u) => u[valueParam] === v) || null;
  }, [v, data, valueParam]);
  const errorMsg = (meta.touched && meta.error) || meta.submitError;
  return (
    <>
      {data && (
        <Autocomplete<T>
          id="org-user-select"
          disableClearable
          options={data || []}
          loading={status === "loading"}
          value={value}
          onChange={(_: any, val) => onChange(val?.[valueParam] || "")}
          classes={{ option: classes.option }}
          multiple={false}
          autoHighlight
          style={{ width: "100%" }}
          getOptionLabel={(option) => option[labelParam]}
          getOptionSelected={(opt, val) =>
            opt?.[valueParam] === val?.[valueParam]
          }
          getOptionDisabled={(opt) => !!opt.disabled}
          renderOption={renderOption}
          noOptionsText={noOptionsText}
          loadingText={loadingText}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              {...input}
              {...fieldProps}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
              error={!!errorMsg}
              helperText={errorMsg}
              size="small"
              fullWidth
            />
          )}
        />
      )}
    </>
  );
}
