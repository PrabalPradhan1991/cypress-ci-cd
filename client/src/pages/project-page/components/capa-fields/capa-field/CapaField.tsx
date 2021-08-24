import Icon from "@atlaskit/icon";
import * as React from "react";
import { capafield } from "types/capafield";

import "./CapaField.scss";
import {
  halfCapacity,
  zeroCapacity,
  fullCapacity,
  blockedCapacity,
} from "assets/icons/icons";

enum Capacity {
  Zero,
  Half,
  Full,
  Blocked,
}

export interface CapaFieldProps {
  capafield: capafield;
  changeCapacity: Function;
}

export interface CapaFieldStates {}

const capaIcons: any[] = [
  <Icon glyph={zeroCapacity} label="Custom icon" size="small" />,
  <Icon glyph={halfCapacity} label="Custom icon" size="small" />,
  <Icon glyph={fullCapacity} label="Custom icon" size="small" />,
  <Icon glyph={blockedCapacity} label="Custom icon" size="small" />,
];

const CapaField: React.FC<CapaFieldProps> = (props) => {
  const { capafield, changeCapacity } = props;

  const getClasses = (): string => {
    let classes: string = "capaField ";
    switch (capafield.capacity) {
      case Capacity.Zero:
        classes += "capaFieldRed";
        break;
      case Capacity.Half:
        classes += "capaFieldYellow";
        break;
      case Capacity.Full:
        classes += "capaFieldGreen";
        break;
      case Capacity.Blocked:
        classes += "capaFieldGray";
        break;
      default:
        break;
    }
    return classes;
  };

  return (
    <div className="capaBorder">
      <div
        className={getClasses()}
        onClick={() => {
          changeCapacity(capafield);
        }}
      >
        {capaIcons[capafield.capacity]}
      </div>
    </div>
  );
};

export default CapaField;
