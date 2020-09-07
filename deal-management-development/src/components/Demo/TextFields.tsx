import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Title from "./Title";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

export default function TextFields() {
  const classes = useStyles();

  return (
    <>
      <Title>
        <div>Input fields</div>
      </Title>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            fullWidth
            label="Text Fields 1"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Text Fields 2"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            label="Text Fields 3"
            variant="outlined"
          />
        </div>
      </form>
    </>
  );
}
