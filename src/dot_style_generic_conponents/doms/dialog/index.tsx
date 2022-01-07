import React, { useRef } from "react";
import { ComponentBaseType } from "../base_porps";
import "./index.css";

type DialogProps = {
  dialogOpenButtonText?: string;
  buttonStyle?: AllowedStates;
  dialogColorStyle?: AllowedColorStyles;
  dialogBoarderStyle?: AllowedBorderStyle;
  dialogSubmitButtonText?: string;
  dialogCancelButtonText?: string;
  dialogTitleText?: string;
  dialogInfoText?: string;
  handleCancel?: HandleFunction;
  handleSubmit?: HandleFunction;
};

// eslint-disable-next-line no-unused-vars
type HandleFunction = (a: any) => any;

type AllowedColorStyles = "dark";
type AllowedStates = "primary" | "success" | "warning" | "error" | "disabled";
type AllowedBorderStyle = "rounded";

export const Dialog: React.FC<ComponentBaseType & DialogProps> = ({
  buttonStyle,
  dialogColorStyle,
  dialogBoarderStyle,
  dialogSubmitButtonText,
  dialogCancelButtonText,
  dialogTitleText,
  dialogInfoText,
  dialogOpenButtonText,
  handleCancel,
  handleSubmit
}) => {
  const additionalButtonClassName =
    buttonStyle != null ? " is-" + buttonStyle : "";

  let additionalDialogClassName = "";

  if (dialogColorStyle)
    additionalDialogClassName = additionalDialogClassName.concat(
      " is-" + dialogColorStyle
    );

  if (dialogBoarderStyle)
    additionalDialogClassName = additionalDialogClassName.concat(
      " is-" + dialogBoarderStyle
    );

  const ref = useRef(null);

  const handleBind = () => {
    if (ref.current) (ref.current as any).showModal();
  };

  return (
    <section>
      <button
        type="button"
        className={"nes-btn" + additionalButtonClassName}
        onClick={handleBind}
      >
        {dialogOpenButtonText ? dialogOpenButtonText : ""}
      </button>
      <dialog ref={ref} className={"nes-dialog" + additionalDialogClassName}>
        <form method="dialog">
          <div className="text_align_center">
            <h2 className="title">
              {dialogTitleText ? dialogTitleText : "title"}
            </h2>
            <p>{dialogInfoText ? dialogInfoText : "info"}</p>
          </div>
          <menu className="dialog-menu menu">
            <button className="ps2p_text nes-btn" onClick={handleCancel}>
              {dialogCancelButtonText ? dialogCancelButtonText : "Cancel"}
            </button>
            <button
              className={"ps2p_text nes-btn" + additionalButtonClassName}
              onClick={handleSubmit}
            >
              {dialogSubmitButtonText ? dialogSubmitButtonText : "Confirm"}
            </button>
          </menu>
        </form>
      </dialog>
    </section>
  );
};
