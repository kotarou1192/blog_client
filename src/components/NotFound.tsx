import React from "react";
import "./NotFound.css";

export const NotFound: React.FC<{}> = () => {
  return (
    <div className="notfound">
      <h2 className="text ps2p_text">404 NOT FOUND</h2>
      <p className="text ps2p_text">This is not what you are searching for.</p>
    </div>
  );
};
