import React from "react";
import { ComponentBaseType } from "../base_porps";

type TextProps = {
  placeholder?: string;
};

export const TextArea: React.FC<ComponentBaseType & TextProps> = ({
  ...props
}) => {
  return <textarea className={"nes-input"} {...props} />;
};
