import React from "react";
import "./CapaFieldLegende.scss";
import {
  halfCapacity,
  fullCapacity,
  zeroCapacity,
  blockedCapacity,
} from "assets/icons/icons";
import Icon from "@atlaskit/icon";
import { useSelector } from "react-redux";

const CapaFieldLegende: React.FC = () => {
  const locale = useSelector((state: any) => state?.locale);

  return (
    <div className="legende">
      <h4>{locale?.strings?.field_types}</h4>
      <ul>
        <li>
          {" "}
          <Icon glyph={fullCapacity} label="Custom icon" size="medium" />
          <p>{locale?.strings?.full_available}</p>
        </li>
        <li>
          {" "}
          <Icon glyph={halfCapacity} label="Custom icon" size="medium" />
          <p>{locale?.strings?.half_available}</p>
        </li>
        <li>
          {" "}
          <Icon glyph={zeroCapacity} label="Custom icon" size="medium" />
          <p>{locale?.strings?.not_available}</p>
        </li>
        <li>
          {" "}
          <Icon glyph={blockedCapacity} label="Custom icon" size="medium" />
          <p>{locale?.strings?.no_working_day}</p>
        </li>
      </ul>
    </div>
  );
};

export default CapaFieldLegende;
