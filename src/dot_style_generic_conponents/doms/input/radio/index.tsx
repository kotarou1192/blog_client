import React from "react";
import { ComponentBaseType } from "../../base_porps";

type RadioProps = {
  checked?: boolean;
  domState?: AllowedState;
  onChange?: any;
};

type AllowedState = "dark";

export const Radio: React.FC<ComponentBaseType & RadioProps> = ({
  domState,
  ...props
}) => {
  const additionalClassName = domState != null ? " is-" + domState : "";
  return (
    <input
      type="radio"
      className={"ps2p_text nes-radio " + additionalClassName}
      {...props}
    ></input>
  );
};
