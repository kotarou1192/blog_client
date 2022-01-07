import React from "react";
import { ComponentBaseType } from "../base_porps";
import "./index.css";

type ButtonProps = {
  domState?: AllowedStates;
};

type AllowedStates = "dark";

export const Div: React.FC<ComponentBaseType & ButtonProps> = ({
  domState,
  ...props
}) => {
  const additionalClassName = domState != null ? " dark" : "";
  return <div className={"" + additionalClassName} {...props}></div>;
};
