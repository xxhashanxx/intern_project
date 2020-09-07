import { ERROR_REQUIRED } from "./form_constants";
import { string as str } from "yup";
const requiredString = str().trim().required(ERROR_REQUIRED);
export const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce(
    (error: any, validator: any) => error || validator(value),
    undefined
  );

export const required = (value: any) => (value ? undefined : "Required");

export const mustBeNumber = ((value: any) =>{
  if(value !== undefined && isNaN(value))
   return "Must be a number";
})


export const minValue = (min: any) => (value: any) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const isEmail = (value: any) =>
  value && value.search(/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
    ? "This must be in a valid email format"
    : "";
