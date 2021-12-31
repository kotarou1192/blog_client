import React from "react";
import { ComponentBaseType } from "../base_porps";
import "./index.css";

type ButtonProps = {
  domState?: AllowedStates;
};

type AllowedStates = "primary" | "success" | "warning" | "error" | "disabled";

export const Button: React.FC<ComponentBaseType & ButtonProps> = ({
  domState,
  value,
  ...props
}) => {
  const additionalClassName = domState != null ? " is-" + domState : "";
  return (
    <button
      type="button"
      className={"ps2p_text nes-btn " + additionalClassName}
      {...props}
    >
      {value}
    </button>
  );
};
