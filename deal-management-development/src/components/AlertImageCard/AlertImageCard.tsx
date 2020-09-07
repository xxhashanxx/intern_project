import React from "react";
import "./AlertImageCard.scss";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export interface AlertImageCardProps {
  message: string;
  cardImgClass: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
  secondaryMessage: string;
  onBtnClick?: () => void;
  btnText?: string;
}
const AlertImageCard = (props: AlertImageCardProps) => {
  return (
    <>
      <div className="alert-image-card">
        <div className="alert-img">
          <div className={`cover-img ${props.cardImgClass}`}></div>
        </div>
        <div className="alert-msg">
          <div className="alert-msg-txt">{props.message}</div>

          {/* <Typography variant="h6">{props.secondaryMessage}</Typography> */}
        </div>
      </div>
      {props.btnText && props.btnText != "" && (
        <div className="btn-row flex-center mt-4">
          <div className="btn-grid">
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={props.onBtnClick}
              color="primary"
            >
              {props.btnText}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertImageCard;
