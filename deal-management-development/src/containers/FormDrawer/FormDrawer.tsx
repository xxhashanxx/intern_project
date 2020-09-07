import React from "react";
import { Card, CardHeader, Drawer, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
export interface FormDrawerProps {
  children: JSX.Element;
  closeDrawer: any;
  title: string;
  desc: string;
}
const FormDrawer = (props: FormDrawerProps) => {
  return (
    <Drawer
      disableBackdropClick
      className="form-drawer"
      anchor={"right"}
      open={true}
      onClose={props.closeDrawer}
    >
      <div className="form-cont">
        <div className="form-wrap">
          <Card elevation={0}>
            <CardHeader
              title={props.title}
              //subheader={props.desc}
              action={
                <div className="btn-grid">
                  <IconButton onClick={props.closeDrawer} aria-label="delete">
                    <CloseIcon />
                  </IconButton>
                </div>
              }
            />
            <Divider />
            <div className="card-content">{props.children}</div>
          </Card>
        </div>
      </div>
    </Drawer>
  );
};

export default FormDrawer;
