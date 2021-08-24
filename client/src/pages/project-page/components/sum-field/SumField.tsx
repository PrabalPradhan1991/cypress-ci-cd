import React from "react";
import "./SumField.scss";
export interface SumFieldProps {
  capaSum: number;
}

export const SumField: React.FC<SumFieldProps> = (props) => {
  return (
    <div className="sumFieldBorder">
      <div className="sumField">{props.capaSum} PT</div>
    </div>
  );
};
