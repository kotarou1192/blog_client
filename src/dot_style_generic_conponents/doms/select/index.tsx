import React from "react";
import { ComponentBaseType } from "../base_porps";

type RadioProps = {
  checked?: boolean;
  domState?: AllowedStates;
  mode?: AllowedMode;
};

type AllowedMode = "dark";
type AllowedStates = "primary" | "success" | "warning" | "error";

export const Select: React.FC<ComponentBaseType & RadioProps> = ({
  mode,
  domState,
  ...props
}) => {
  const additionalClassName = domState != null ? " is-" + domState : "";
  const additionalModeName = mode != null ? " is-" + mode : "";
  return (
    <div className={"nes-select" + additionalClassName + additionalModeName}>
      <select className={""} {...props}></select>
    </div>
  );
};

type OptionProps = {
  value: string;
  optionName: string;
};

export const Option: React.FC<ComponentBaseType & OptionProps> = ({
  optionName,
  value,
  ...props
}) => {
  return (
    <option value={value} {...props}>
      {optionName}
    </option>
  );
};
