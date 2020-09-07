import React from "react";
import "./ContentImageCard.scss";
import { Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

export interface ContentImageCardProps {
  title: string;
  message: string;
  cardImgClass: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
  secondaryMessage: string;
  onBtnClick?: () => void;
  btnText?: string;
}
const ContentImageCard = (props: ContentImageCardProps) => {
  return (
    <>
      <div className="content-image-card">
        <div className="content-head">
          <div className="content-main-txt">{props.title}</div>
        </div>
        <div className="content-img">
          <div className={`cover-img ${props.cardImgClass}`}></div>
        </div>
        <div className="content-msg">
          <div className="content-msg-txt">{props.message}</div>
        </div>
      </div>
      {props.btnText !== "" && (
        <div className="btn-row flex-center my-4">
          <div className="btn-grid">
            <Button
              endIcon={<NavigateNextIcon />}
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

export default ContentImageCard;
