import "date-fns";
import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DatePickerInput(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        inputVariant="outlined"
        format="yyyy/MM/dd"
        label={props.label}
        value={props.selectedDate}
        onChange={props.handleDateChange}
        fullWidth={true}
        size="small"
        variant="inline"
        InputProps={{ readOnly: true }} // if error happended remove this
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
