import React from "react";
import { ComponentBaseType } from "../../base_porps";
import "./index.css";

type ButtonProps = {
  domState?: AllowedStates;
};

type AllowedStates = "dark";

export const CheckBox: React.FC<ComponentBaseType & ButtonProps> = ({
  domState,
  ...props
}) => {
  const additionalClassName = domState != null ? "is-dark" : "";
  return (
    <input
      type="checkbox"
      className={"nes-checkbox " + additionalClassName}
      {...props}
    />
  );
};
