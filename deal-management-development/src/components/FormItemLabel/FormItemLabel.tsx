import React from "react";
import "./FormItemLabel.scss";
export interface FormItemLabeProps {
  className?: string;
  text: string;
  isLine?: Boolean;
}
const FormItemLabel = (props: FormItemLabeProps) => {
  return (
    <div className={`form-component-label ${props.className}`}>
      <div className="text">{props.text}</div>
      {props.isLine && <div className="line"></div>}
    </div>
  );
};

export default FormItemLabel;
