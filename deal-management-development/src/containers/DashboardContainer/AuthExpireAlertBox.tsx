import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";
interface AuthExpireAlertBoxProps {
  handleClose: () => void;
  open: boolean;
}

export default function AuthExpireAlertBox({
  handleClose,
  open,
}: AuthExpireAlertBoxProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="user expire validation"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
    >
      <DialogTitle id="user expire validation">
        Session has expired.
      </DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ width: "300px", paddingTop: 10 }}>Please try again</div>
        </DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
