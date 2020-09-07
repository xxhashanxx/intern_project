import React from "react";

import Typography from "@material-ui/core/Typography";
export interface TitleProps {
  children: JSX.Element;
}
export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
