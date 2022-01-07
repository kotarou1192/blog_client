import React from "react";
import { ComponentBaseType } from "../base_porps";
import "./index.css";

type ContainerProps = {
  mode?: AllowedMode;
  title?: string;
  titlePosition?: AllowedPositions;
  isRounded?: boolean;
  children?: React.ReactNode;
};

type AllowedMode = "dark";
type AllowedPositions = "center";

export const Container: React.FC<ComponentBaseType & ContainerProps> = ({
  mode,
  title,
  titlePosition,
  children,
  isRounded,
  className,
  ...props
}) => {
  const modeClassName = mode === "dark" ? " is-dark" : "";
  const titlePositionClassName =
    titlePosition === "center" ? " is-centered" : "";
  const roundClassName = isRounded === true ? " is-rounded" : "";
  return (
    <div
      className={
        className +
        " nes-container" +
        modeClassName +
        titlePositionClassName +
        roundClassName +
        (title != null ? " with-title" : "")
      }
      {...props}
    >
      {title != null ? <p className="title">{title}</p> : <p hidden={true}></p>}
      {children instanceof Array
        ? React.Children.map(children, (child) => {
            switch (typeof child) {
              case "string":
                return child;
              case "object":
                return React.cloneElement(
                  child as React.DetailedReactHTMLElement<any, HTMLElement>,
                  props
                );
              default:
                return null;
            }
          })
        : children}
    </div>
  );
};
