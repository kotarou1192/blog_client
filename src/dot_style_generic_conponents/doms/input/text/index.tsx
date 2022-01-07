import React from "react";
import { ComponentBaseType } from "../../base_porps";

type TextProps = {
  domState?: AllowedStates;
  inputType?: AllowedInputTypes;
  placeholder?: string;
  darkmode?: boolean;
  onChange?: any;
};

type AllowedStates = "success" | "warning" | "error";
type AllowedInputTypes = "email" | "password";

export const Text: React.FC<ComponentBaseType & TextProps> = ({
  darkmode,
  domState,
  className,
  ...props
}) => {
  const additionalClassName = domState != null ? " is-" + domState : "";
  const mode = darkmode ? " is-dark" : "";
  const inputType = props.inputType == null ? "text" : props.inputType;
  return (
    <input
      type={inputType}
      className={className + " nes-input" + additionalClassName + mode}
      {...props}
    />
  );
};
