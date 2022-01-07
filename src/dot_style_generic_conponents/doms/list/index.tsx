import React from "react";
import { ComponentBaseType } from "../base_porps";

type ListProps = {
  listStyle?: "disc" | "circle";
  listValues?: string[];
};

export const List: React.FC<ComponentBaseType & ListProps> = ({
  listStyle,
  listValues
}) => {
  const ulClass = listStyle ? " is-" + listStyle : " is-disc";
  return (
    <div className="lists">
      <ul className={"nes-list" + ulClass}>
        {listValues?.map((val, index) => (
          <li key={index}>{val}</li>
        ))}
      </ul>
    </div>
  );
};
